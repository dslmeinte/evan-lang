import {isObject} from "lodash";
import {isArrayLike} from "mobx";

import {IContext} from "../core/context";
import {makeIssue} from "../core/issues";
import {ISemanticsTyped} from "../core/base-semantics-types";
import {forEachProperty} from "../core/util";
import {isSemanticsTyped} from "../meta/meta-model";


export type PolyMap = { [sType: string]: (object: ISemanticsTyped, context: IContext) => any };

export type Interpreter = (json: any, context: IContext) => any;

export function makeMapper(action: string, polyMap: PolyMap): Interpreter {

	function mapInternal(json: any, context: IContext): any {
		if (isArrayLike(json)) {
			return (json as any[]).map(item => mapInternal(item, context));
		}
		if (isObject(json)) {
			if (isSemanticsTyped(json)) {
				const object = json as ISemanticsTyped;

				const mapper = polyMap[object.$sType];
				return mapper
					? mapper(object, context)
					: makeIssue(`Cannot ${action} object with sType="${object.$sType}".`, object);

			}
			const result = {};
			forEachProperty(json, (name, value) => { result[name] = mapInternal(value, context); });
			return result;
		}
		return json;	// TODO  find out: why undefined -> null?
	}

	return mapInternal;

}
