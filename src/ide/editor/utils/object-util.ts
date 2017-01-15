import {isObject} from "lodash";
import {IObservableArray, isArrayLike} from "mobx";

import {ISemanticsTyped} from "../../../latest";
import {isSemanticsTyped} from "../../../meta-model";


export type ArrayLike<T> = Array<T> | IObservableArray<T>;

export function type(json: any) {
	if (isArrayLike(json)) {
		return "json-array";
	}

	if (isObject(json)) {
		if (isSemanticsTyped(json)) {
			const object = json as ISemanticsTyped;
			return object.$sType;
		}
		return "json-object";
	}

	return "json-simple-value";
}


export function mapMap<V, R>(map: { [key: string]: V; }, func: (key: string, value: V) => R): R[] {
	return Object.keys(map).map(key => func(key, map[key]));
}

/**
 * @returns the given JSON in pretty-printed form (undefined-safe).
 */
export function prettyJson(json: any) {
	return json === undefined ? "undefined" : JSON.stringify(json, null, 2);
}
