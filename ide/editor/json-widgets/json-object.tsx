import {observer} from "mobx-react";
import * as React from "react";

import {forEachProperty} from "../../../shared/util";
import {JsonProperty} from "./json-property";

import {makePropertyAccessor} from "../utils/accessor";
import {BaseEditWidget} from "../base-widgets";


@observer
export class JsonObject<T extends Object> extends BaseEditWidget<T> {

	render() {
		const object = this.props.accessor.value;
		const propertyNames = [];
		forEachProperty(object, (name, value) => { propertyNames.push(name); });
		return (
			<div onClick={this.handleFocusClick.bind(this)} className={this.genericClassName()}>
				<span>{"{"}</span>
					<div className="indent">
						{propertyNames.map(name => <JsonProperty name={name} key={name} accessor={makePropertyAccessor(object, name)} />)}
					</div>
				<span>{"}"}</span>
			</div>
		);
	}

}
