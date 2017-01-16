import {observer} from "mobx-react";
import * as React from "react";

import {dispatch} from "../dispatcher";
import {ArrayLike} from "../utils/object-util";
import {makeArrayAccessor} from "../utils/accessor";

import {AddValue} from "../add-value";
import {BaseEditWidget} from "../base-edit-widget";

const styles = require("../styles.scss");


@observer
export class JsonArray<T> extends BaseEditWidget<ArrayLike<T>> {

	renderContents(array: ArrayLike<T>) {
		return (
			<div>
				<span>[</span>
				<div className={styles.indent}>
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
