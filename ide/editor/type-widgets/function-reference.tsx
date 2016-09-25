import {observer} from "mobx-react";
import * as React from "react";

import {editorState} from "../state";
import {IFunctionReference} from "../../../core/semantics-types_gen";


@observer
export class FunctionReference<T> extends React.Component<{ functionReference: IFunctionReference; }, {}> {

	render() {
		const {functionReference} = this.props;
		return (
			<span onClick={editorState.actionSelectItem(this)} className={editorState.cssClassForSelection(this)}>
				<em>{functionReference.name}</em>
			</span>
		);
	}

}
