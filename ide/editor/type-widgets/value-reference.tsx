/// <reference path="../../../typings/tsd.d.ts" />

import {observer} from "mobx-react";
import * as React from "react";

import {IValueReference} from "../../../shared/semantics-types";


@observer
export class ValueReference<T> extends React.Component<{ valueReference: IValueReference; }, {}> {

	render() {
		const {valueReference} = this.props;
		return (<span><em>{valueReference.name}</em></span>);
	}

}
