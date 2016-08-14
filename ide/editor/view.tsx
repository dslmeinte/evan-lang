/// <reference path="../../typings/tsd.d.ts" />

import {observer} from "mobx-react";
import * as React from "react";

import {evaluate} from "../../evaluation/evaluator";
import {dispatch} from "./dispatcher";
import {EditorState} from "./state";
import {prettyJson} from "../../shared/util";


@observer
export class EditorView extends React.Component<{ editorState: EditorState }, {}> {

	render() {
		const {jsonData} = this.props.editorState;
		const evaluation = evaluate(jsonData);
		return jsonData === null ? null : (
			<div>
				<span>Content:</span>
				{dispatch(jsonData)}
				<span>Evaluation result:</span>
				<pre>
					{prettyJson(evaluation)}
				</pre>
			</div>
		);
	}

}
