import {observer} from "mobx-react";
import * as React from "react";

import {forEachProperty} from "../../../shared/util";
import {JsonProperty} from "./json-property";

import {BaseWidget} from "../base-widget";


@observer
export class JsonObject<T extends Object> extends BaseWidget<{ object: T; }> {

	render() {
		const {object} = this.props;
		const propertyNames = [];
		forEachProperty(object, (name, value) => { propertyNames.push(name); });
		return (
			<div onClick={this.handleClick.bind(this)} className={this.genericClassName()}>
				<span>{"{"}</span>
					<div className="indent">
						{propertyNames.map(name => <JsonProperty name={name} value={object[name]} key={name} />)}
					</div>
				<span>{"}"}</span>
			</div>
		);
	}

}
