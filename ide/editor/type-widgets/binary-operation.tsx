/// <reference path="../../../typings/tsd.d.ts" />

import {observer} from "mobx-react";
import * as React from "react";

import {dispatch} from "../dispatcher";
import {IBinaryOperation} from "../../../shared/semantics-types";


@observer
export class BinaryOperation<T> extends React.Component<{ binaryOperation: IBinaryOperation; }, {}> {

	render() {
		const {binaryOperation} = this.props;
		return (
			<div>
				{dispatch(binaryOperation.left)}
				<span>{binaryOperation.operator}</span>
				{dispatch(binaryOperation.right)}
			</div>
		);
	}

}
