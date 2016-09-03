import {IObservableArray} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";

import {dispatch} from "../dispatcher";

import {AddValue} from "../add-value";
import {BaseWidget} from "../base-widget";


@observer
export class JsonArray<T> extends BaseWidget<{ array: Array<T> | IObservableArray<T>; }> {

	render() {
		const {array} = this.props;
		return (
			<div onClick={this.handleClick.bind(this)} className={this.genericClassName()}>
				<span>[</span>
					<div className="indent">
						{array.map(item => dispatch(item, "" + array.indexOf(item)))}
						<AddValue addCallback={this.addItem.bind(this)} />
					</div>
				<span>]</span>
			</div>
		);
	}

	addItem(newValue: any) {
		this.props.array.push(newValue);
	}

}
