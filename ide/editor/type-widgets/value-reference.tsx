import {observer} from "mobx-react";
import * as React from "react";

import {editorState} from "../state";
import {IValueReference} from "../../../shared/semantics-types";


@observer
export class ValueReference<T> extends React.Component<{ valueReference: IValueReference; }, {}> {

	render() {
		const {valueReference} = this.props;
		return (
			<span onClick={editorState.actionSelectItem(this)} className={editorState.cssClassForSelection(this)}>
				<em>{valueReference.name}</em>
			</span>
		);
	}

}
