import {isArray, isObject, isString} from "lodash";
import {isObservableArray} from "mobx";


export const TYPE_KEY_NAME = "$sType";

export function isSemanticsTyped(json: any) {
	if (isObject(json)) {
		const sTypeValue = json[TYPE_KEY_NAME];
		return sTypeValue && isString(sTypeValue);
	}
	return false;
}

export function sType(json: Object) {
	return json[TYPE_KEY_NAME];
}


export function isArray(json: any) {
	return isArray(json) || isObservableArray(json);
}

export function prettyJson(json: any) {
	return JSON.stringify(json, null, 2);
}


export function mapMap<V, R>(map: { [key: string]: V; }, func: (key: string, value: V) => R): R[] {
	return Object.keys(map).map(key => func(key, map[key]));
}

export function forEachProperty(object: Object, action: (name: string, value: any) => void) {
	for (let propertyName in object) {
		if (object.hasOwnProperty(propertyName)) {
			action(propertyName, object[propertyName]);
		}
	}
}


export function toFirstUpper(str: string) {
	return str.charAt(0).toUpperCase() + str.substring(1);
}


export function logError(err: Error) {
	console.error(`${err instanceof SyntaxError ? "Could not parse stdin as JSON" : "Something went wrong"}: ${err}`);
	console.error(err.stack);
}


export const encodingOptions = { encoding: "utf8" };

