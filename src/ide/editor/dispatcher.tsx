import {util} from "../../util";
import * as React from "react";

import {JsonArray} from "./json-widgets/json-array";
import {JsonObject} from "./json-widgets/json-object";
import {JsonSimpleValue} from "./json-widgets/json-simple-value";
import {IAccessor} from "./utils/accessor";
import {polyDispatch} from "./polymorphic-dispatcher";
import {prettyJson} from "./utils/object-util";
import {isSemanticsTyped, sType} from "../../meta-model";

const styles = require("./styles.scss");


export function dispatch(accessor: IAccessor<any>, key?: string) {
	const json: any = accessor.value;
	if (util.isArrayLike(json)) {
		return <JsonArray accessor={accessor} key={key} />;
	}
	if (util.isObject(json)) {
		if (isSemanticsTyped(json)) {
			const component = polyDispatch(sType(json), accessor, key);
			if (component) {
				return component;
			}
			return (
				<div className={styles.indent} key={key}>
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

