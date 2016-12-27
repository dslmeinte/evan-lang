import {observer} from "mobx-react";
import * as React from "react";

import {dispatch} from "./dispatcher";
import {editorState} from "./state";


@observer
export class EditorView extends React.Component<{}, {}> {

	render() {
		const {jsonData} = editorState;
		return (
			<div className="editor-pane">
				<span>Program:</span>
				{dispatch(
					{
						value: jsonData,
						set: newValue => { editorState.jsonData = newValue; },
						"delete": () => { /* do nothing */ }
					},
					undefined
				)}
			</div>
		);
	}

}
