import {isArray, isObject, isString} from "lodash";
import {isObservableArray} from "mobx";


const TYPE_KEY_NAME = "$sType";

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

export function createOfSType(sType: string) {
	return {
		[TYPE_KEY_NAME]: sType
	};
}


export function isMyArray(json: any) {
	return isArray(json) || isObservableArray(json);
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


export function prettyJson(json: any) {
	return json === undefined ? "undefined" : JSON.stringify(json, null, 2);
}

