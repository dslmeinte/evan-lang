import {observer} from "mobx-react";
import * as React from "react";

import {dispatch} from "../dispatcher";
import {MyArray, makeArrayAccessor} from "../utils/accessor";

import {AddValue} from "../add-value";
import {BaseEditWidget} from "../base-widgets";


@observer
export class JsonArray<T> extends BaseEditWidget<MyArray<T>> {

	render() {
		const array = this.props.accessor.value;
		return (
			<div onClick={this.handleFocusClick.bind(this)} className={this.genericClassName()}>
				<span>[</span>
					<div className="indent">
						{array.map((item, index) => dispatch(makeArrayAccessor(array, index), "" + array.indexOf(item)))}
						<AddValue addCallback={this.addItem.bind(this)} />
					</div>
				<span>]</span>
			</div>
		);
	}

	addItem(newValue: any) {
		this.props.accessor.value.push(newValue);
	}

}
