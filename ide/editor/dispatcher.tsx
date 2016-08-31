import {isObject} from "lodash";
import * as React from "react";

import {JsonArray} from "./json-widgets/json-array";
import {JsonObject} from "./json-widgets/json-object";
import {polyDispatch} from "./polymorphic-dispatcher";
import {isArray, isSemanticsTyped, prettyJson, sType} from "../../shared/util";


export function dispatch(json: any, key?: string) {
	if (isArray(json)) {
		return <JsonArray array={json} />;
	}
	if (isObject(json)) {
		if (isSemanticsTyped(json)) {
			const component = polyDispatch(sType(json), json, key);
			return component === null
				? (
					<div className="indent">
						<span><em>Cannot visualize object with semantics type "{sType(json)}" (yet?).</em></span>
						<pre>{prettyJson(json)}</pre>
					</div>
				)
				: component;
		} else {
			return <JsonObject object={json} />;
		}
	}
	return <pre>{prettyJson(json)}</pre>;
}

