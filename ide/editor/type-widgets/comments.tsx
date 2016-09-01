import {observer} from "mobx-react";
import * as React from "react";

import {editorState} from "../state";
import {IComments} from "../../../shared/semantics-types_gen";


@observer
export class Comments<T> extends React.Component<{ comments: IComments; }, {}> {

	render() {
		const {comments} = this.props;
		return (
			<div onClick={editorState.actionSelectItem(this)} className={editorState.cssClassForSelection(this)}>
				<p className="comments">{comments.text}</p>
			</div>
		);
	}

}
