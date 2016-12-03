import {isObject} from "lodash";
import {IObservableArray, isArrayLike} from "mobx";

import {ISemanticsTyped} from "../../../core/base-semantics-types";
import {isSemanticsTyped} from "../../../meta/meta-model";


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

