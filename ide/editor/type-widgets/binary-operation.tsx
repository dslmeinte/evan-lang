import {observer} from "mobx-react";
import * as React from "react";

import {dispatch} from "../dispatcher";
import {editorState} from "../state";
import {IBinaryOperation} from "../../../shared/semantics-types";


@observer
export class BinaryOperation<T> extends React.Component<{ binaryOperation: IBinaryOperation; }, {}> {

	render() {
		const {binaryOperation} = this.props;
		return (
			<div onClick={editorState.actionSelectItem(this)} className={editorState.cssClassForSelection(this)}>
				{dispatch(binaryOperation.left)}
				<span>{binaryOperation.operator}</span>
				{dispatch(binaryOperation.right)}
			</div>
		);
	}

}
