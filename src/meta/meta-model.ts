import {isObject, isString, indexOf, keys} from "lodash";


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

export class MetaModel {

	constructor(private metaModel: IMetaModel) {}

	sTypes(): string[] {
		return keys(this.metaModel);
	}

	createOfSType(sType: string) {
		if (indexOf(this.sTypes(), sType) < 0) {
			throw new Error(`Cannot create instance of: ${sType}`);
		}
		return {
			[TYPE_KEY_NAME]: sType,
			...this.metaModel[sType].initialValue
		};
	}

}

const metaModelJson = require("./meta-model.json");
export default new MetaModel(metaModelJson);


export function isSemanticsTyped(json: any) {
	if (isObject(json)) {
		const sTypeValue = json[TYPE_KEY_NAME];
		return sTypeValue && isString(sTypeValue);
	}
	return false;
}

export function	sType(json: Object) {
	return json[TYPE_KEY_NAME];
}

