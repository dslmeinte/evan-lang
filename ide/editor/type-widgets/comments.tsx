import {observer} from "mobx-react";
import * as React from "react";

import {editorState} from "../state";
import {IComments} from "../../../shared/semantics-types";
import {mapMap, toFirstUpper} from "../../../shared/util";


@observer
export class Comments<T> extends React.Component<{ comments: IComments; }, {}> {

	render() {
		const {comments} = this.props;
		return (
			<div onClick={editorState.actionSelectItem(this)} className={"indent " + editorState.cssClassForSelection(this)}>
				{mapMap(comments.sections, (name, text) => (
					<div key={name}>
						<h5>{toFirstUpper(name)}</h5>
						<p>{text}</p>
					</div>
				))}
			</div>
		);
	}

}
