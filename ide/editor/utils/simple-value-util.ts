import {isString, isNumber, isBoolean} from "lodash";


export type SimpleValue = string | number | boolean | void;

export enum SimpleType {
	string, number, boolean, nothing
}

export interface ISimpleValueInfo {
	type: SimpleType;
	displayText: string;
}

export function toInfo(value: SimpleValue): ISimpleValueInfo {
	if (value === undefined || value === null) {
		return { type: SimpleType.nothing, displayText: ( value === undefined ? "undefined" : "null" ) };
	}
	if (isString(value)) {
		return { type: SimpleType.string, displayText: "\"" + value + "\"" };
	}
	if (isNumber(value)) {
		return { type: SimpleType.number, displayText: "" + value };
	}
	if (isBoolean(value)) {
		return { type: SimpleType.boolean, displayText: "" + value };
	}
	throw new Error(`Simple value not handled in #toInfo: ${value} (typeof=${typeof value})`);
}


export function coerce(value: SimpleValue, dstType: SimpleType): SimpleValue {
	switch (dstType) {
		case SimpleType.boolean: return (!! value);
		case SimpleType.nothing: return (value === "null" ? null : undefined);
		case SimpleType.number: return (!!value ? 1 : 0);
		case SimpleType.string: return ("" + value);
		default: throw new Error(`unhandled simple type for destination type in #coerce: ${dstType}`);
	}
}


export function fromString(valueAsString: string, type: SimpleType): SimpleValue {
	switch (type) {
		case SimpleType.boolean: return (valueAsString === "true");
		case SimpleType.number: return parseInt(valueAsString, 10);
		case SimpleType.nothing: return (valueAsString === "null" ? null : undefined);
		case SimpleType.string: return valueAsString;
		default: throw new Error(`unhandled simple type in #fromString: ${type}`);
	}
}

