import {observer} from "mobx-react";
import * as React from "react";

import {dispatch} from "./dispatcher";
import {editorState} from "./state";

const styles = require("./styles.scss");


@observer
export class EditorView extends React.Component<{}, {}> {

	render() {
		const {jsonData} = editorState;
		return (
			<div className={styles.editorPane}>
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
