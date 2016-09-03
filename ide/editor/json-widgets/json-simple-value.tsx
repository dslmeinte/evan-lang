import {observer} from "mobx-react";
import * as React from "react";
import {isString, isNumber, isBoolean} from "lodash";

import {BaseWidget} from "../base-widget";


type SimpleValue = string | number | boolean | void;

@observer
export class JsonSimpleValue extends BaseWidget<{ value: SimpleValue; }> {

	render() {
		const {value} = this.props;
		return (
			<div onClick={this.handleClick.bind(this)} className={this.genericClassName()}>
				{this.renderValue(value)}
			</div>
		);
	}

	renderValue(value: SimpleValue) {
		if (value === undefined || value === null) {
			const toString = ( value === undefined ? "undefined" : "null" );
			return <span className="json-nothing">{toString}</span>;
		}

		if (isString(value)) {
			return <span className="json-string">{"{" + value + "}"}</span>;
		}
		if (isNumber(value)) {
			return <span className="json-number">{"" + value}</span>;
		}
		if (isBoolean(value)) {
			return <span className="json-boolean">{"" + value}</span>;
		}
	}

}
