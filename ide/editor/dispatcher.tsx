import {isObject} from "lodash";
import * as React from "react";

import {JsonArray} from "./json-widgets/json-array";
import {JsonObject} from "./json-widgets/json-object";
import {JsonSimpleValue} from "./json-widgets/json-simple-value";
import {IAccessor} from "./utils/accessor";
import {polyDispatch} from "./polymorphic-dispatcher_gen";
import {isArray, isSemanticsTyped, prettyJson, sType} from "../../shared/util";


export function dispatch(accessor: IAccessor<any>, key?: string) {
	const json: any = accessor.value;
	if (isArray(json)) {
		return <JsonArray accessor={accessor} key={key} />;
	}
	if (isObject(json)) {
		if (isSemanticsTyped(json)) {
			const component = polyDispatch(sType(json), json, key);
			if (component) {
				return component;
			}
			return (
				<div className="indent" key={key}>
					<span><em>Cannot evaluate object with semantics type "{sType(json)}" (yet?).</em></span>
					<pre>{prettyJson(json)}</pre>
				</div>
			);
		} else {
			return <JsonObject accessor={accessor} key={key} />;
		}
	}
	return <JsonSimpleValue accessor={accessor} key={key} />;
}

