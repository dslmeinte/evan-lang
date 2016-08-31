import {observer} from "mobx-react";
import * as React from "react";

import {dispatch} from "../dispatcher";
import {editorState} from "../state";
import {IIfThenElse} from "../../../shared/semantics-types";


@observer
export class IfThenElse<T> extends React.Component<{ ifThenElse: IIfThenElse; }, {}> {

	render() {
		const {ifThenElse} = this.props;
		return (
			<div onClick={editorState.actionSelectItem(this)} className={editorState.cssClassForSelection(this)}>
				<span><b>if</b>: </span><div className="indent">{dispatch(ifThenElse.condition)}</div>
				<span><b>then</b>: </span><div className="indent">{dispatch(ifThenElse.trueBranch)}</div>
				<span><b>else</b>: </span><div className="indent">{dispatch(ifThenElse.falseBranch)}</div>
			</div>
		);
	}

}
