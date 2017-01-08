import {util} from "./util";

/*
 * The following type definitions _must_ match `./meta-model.json`.
 */

interface IMetaModel {
	[typeName: string]: IMetaType;
}

interface IMetaType {
	properties: { [propertyName: string]: IPropertyDescription };
	description: any;
	initialValue: Object;
}

type IType = "string" | "Object" | "any";

interface IPropertyDescription {
	type: IType;
	stringMap?: boolean;
	optional?: boolean;
	ownType?: boolean;
}


const TYPE_KEY_NAME = "$sType";

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

