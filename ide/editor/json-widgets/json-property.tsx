import {observer} from "mobx-react";
import * as React from "react";

import {dispatch} from "../dispatcher";

import {BaseWidget} from "../base-widget";


@observer
export class JsonProperty<T> extends BaseWidget<{ name: string; value: T; }> {

	render() {
		const {name, value} = this.props;
		return (
			<div onClick={this.handleClick.bind(this)} className={this.genericClassName()}>
				<span>{name}</span> <span>:</span> {dispatch(value)}
			</div>
		);
	}

}
