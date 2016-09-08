import {observer} from "mobx-react";
import * as React from "react";

import {makePropertyAccessor} from "../utils/accessor";
import {dispatch} from "../dispatcher";
import {editorState} from "../state";
import {IBinaryOperation} from "../../../shared/semantics-types_gen";


@observer
export class BinaryOperation<T> extends React.Component<{ binaryOperation: IBinaryOperation; }, {}> {

	render() {
		const {binaryOperation} = this.props;
		return (
			<div onClick={editorState.actionSelectItem(this)} className={editorState.cssClassForSelection(this)}>
				{dispatch(makePropertyAccessor(binaryOperation, "left"))}
				<span>{binaryOperation.operator}</span>
				{dispatch(makePropertyAccessor(binaryOperation, "right"))}
			</div>
		);
	}

}
