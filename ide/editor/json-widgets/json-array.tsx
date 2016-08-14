/// <reference path="../../../typings/tsd.d.ts" />

import {IObservableArray} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";

import {dispatch} from "../dispatcher";

@observer
export class JsonArray<T> extends React.Component<{ array: Array<T> | IObservableArray<T>; }, {}> {

	render() {
		const {array} = this.props;
		return (
			<div>
				<span>[</span>
					{array.map(item => dispatch(item, "" + array.indexOf(item)))}
				<span>]</span>
			</div>
		);
	}

}
