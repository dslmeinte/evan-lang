import {util} from "./util";
const isInteger = require("is-integer");
const indentString = require("indent-string");

export function buildMetaModel(model: IMetaModel): MetaModel {
	return new MetaModel(model);
}

export function buildSemantics(models: any[]) {
	return new SemanticsNode(models);
}

/*
 * The following type definitions _must_ match with the metamodel json.
 */

export const TYPE_KEY_NAME = "$sType";

export interface IMetaModel {
	[typeName: string]: IMetaType;
}

export interface IMetaType {
	properties: { [propertyName: string]: IPropertyDescription };
	description: any;
	initialValue: Object;
}

export type IType = "string" | "Object" | "any";

export interface IPropertyDescription {
	type: IType;
	stringMap?: boolean;
	optional?: boolean;
	ownType?: boolean;
}

/**
 * The default instance, exported from this file,
 * of this class encapsulates the meta model,
 * i.e. a formal description of all sTypes.
 */
export class MetaModel {
	private _model: IMetaModel;

	constructor(model: IMetaModel) {
		this._model = model;
	}

	sTypes(): string[] {
		return Object.keys(this._model);
	}

	createOfSType(sType: string) {
		if (this.sTypes().indexOf(sType) < 0) {
			throw new Error(`Cannot create instance of: ${sType}`);
		}

		return {
			[TYPE_KEY_NAME]: sType,
			...this._model[sType].initialValue
		};
	}
}

/**
 * @returns whether the given JSON value is a semantically-typed object.
 */
export function isSemanticsTyped(json: any) {
	if (util.isObject(json)) {
		const sTypeValue = json[TYPE_KEY_NAME];
		return sTypeValue && util.isString(sTypeValue);
	}
	return false;
}

/**
 * @returns the semantics type from the given object.
 */
export function	sType(object: Object) {
	return object[TYPE_KEY_NAME];
}

export class PropertyNode {
	type: string = "";
	name: string = "";
	typeName: string = "";
	ownType: boolean = false;
	stringMap: boolean = false;
	optional: boolean = false;

	template: any = templateFor("Property");

	constructor(opts: any) {
		this.ownType = !!opts.ownType;
		this.stringMap = !!opts.stringMap;
		this.optional = !!opts.optional;
		this.type = opts.type;
		this.name = opts.name;
		this.typeName = !this.ownType ? opts.type : template.capitalize(opts.type);
	}

	getTemplateArguments() {
		return [
			this.name + (this.optional ? "?" : ""),
			this.stringMap
				? `{ [name: string]: ${this.typeName} }`
				: this.ownType
					? `I${this.typeName}`
					: this.typeName
		];
	}

	print() {
		return this.template(...this.getTemplateArguments());
	}
}

export class InterfaceNode {
	name: string = "";
	type: string = "";
	properties: any[] = [];
	description: any[] = [];

	template: any = templateFor("Interface");

	constructor(opts: any) {
		this.name = template.capitalize(opts.type);
		this.type = opts.type;
		this.properties = opts.properties;
		this.description = opts.description;
	}

	getTemplateArguments() {
		return {
			name: this.name,
			type: this.type,
			properties: Object.keys(this.properties).map(key => {
				const p = this.properties[key];
				return template.indent((new PropertyNode({ name: key, ...p})).print());
			}).join("\n")
		};
	}

	print() {
		return this.template(this.getTemplateArguments());
	}
}

export class SemanticsNode {
	model: any;

	template: any = templateFor("Semantics");

	constructor(model: any) {
		this.model = model;
	}

	getTemplateArguments() {
		return [
			Object.keys(this.model).map(key => {
				const model = { type: key, ...this.model[key] };
				return new InterfaceNode(model).print();
			}).join("\n"),
			Object.keys(this.model).map(key => {
				return "I" + template.capitalize(key);
			}).join(" | ")
		];
	}

	print() {
		return this.template(...this.getTemplateArguments()) + "\n";
	}
}

export namespace template {

	export function tag(strings: any, ...keys: any[]) {
		return (function(...values: any[]) {
			const dict = values[values.length - 1] || {};
			const result = [strings[0]];

			keys.forEach((key, i) => {
				const value = isInteger(key) ? values[key] : dict[key];
				result.push(value, strings[i + 1]);
			});

			return result.join("");
		});
	}

	export function indent(s: string, n = 2, p = " ") {
		return indentString(String(s), n, p);
	}

	export function capitalize(s: string) {
		return s
			.replace(/-/g, " ")
			.replace(/\w\S*/g, res => {
				return res.charAt(0).toUpperCase() + res.substr(1).toLowerCase();
			})
			.replace(/[\s\xa0]+/g, "");
	}

} /* template */

const tag = template.tag;

const templates = {

Property: tag `${0}: ${1}`,

Semantics: tag
`export interface ISemanticsTyped {
  $sType: string
}

${0}

export type SemanticsTyped =
  ${1}
`,

Interface: tag
`export interface I${"name"} extends ISemanticsTyped {
  $sType: "${"type"}"
${"properties"}
}
`

};

export function templateFor($type: string) {
	if (templates.hasOwnProperty($type)) {
		return templates[$type];
	}
}
