/// <reference path="../../../typings/tsd.d.ts" />

import {IObservableArray} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";

import {dispatch} from "../dispatcher";
import {editorState} from "../state";


@observer
export class JsonArray<T> extends React.Component<{ array: Array<T> | IObservableArray<T>; }, {}> {

	render() {
		const {array} = this.props;
		return (
			<div onClick={editorState.actionSelectItem(this)} className={editorState.cssClassForSelection(this)}>
				<span>[</span>
					{array.map(item => dispatch(item, "" + array.indexOf(item)))}
				<span>]</span>
			</div>
		);
	}

}
