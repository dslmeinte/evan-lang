import {observer} from "mobx-react";
import * as React from "react";

import {dispatch} from "../dispatcher";

import {FocusWidget} from "../base-widgets";
import {IWithAccessor} from "../utils/accessor";


interface IWithAccessorAndName<T> extends IWithAccessor<T> {
	name: string;
}

@observer
export class JsonProperty<T> extends FocusWidget<IWithAccessorAndName<T>> {

	render() {
		const {name, accessor} = this.props;
		return (
			<div onClick={this.handleFocusClick.bind(this)} className={this.genericClassName()}>
				<span>{name}</span> <span>:</span> {dispatch(accessor)}
			</div>
		);
	}

}
