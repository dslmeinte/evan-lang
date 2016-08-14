/// <reference path="../../../typings/tsd.d.ts" />

import {observer} from "mobx-react";
import * as React from "react";

import {dispatch} from "../dispatcher";


@observer
export class JsonProperty<T> extends React.Component<{ name: string; value: any; }, {}> {

	render() {
		const {name, value} = this.props;
		return (
			<div>
				<span>{name}</span> <span>:</span> {dispatch(value)}
			</div>
		);
	}

}
