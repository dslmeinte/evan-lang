/// <reference path="../../typings/tsd.d.ts" />

import {observer} from "mobx-react";
import * as React from "react";

import {evaluate} from "../../evaluation/evaluator";
import {dispatch} from "./dispatcher";
import {editorState} from "./state";
import {prettyJson} from "../../shared/util";


@observer
export class EditorView extends React.Component<{}, {}> {

	render() {
		const {jsonData, itemSelected} = editorState;
		const evaluation = evaluate(jsonData);
		return jsonData === null ? null : (
			<div>
				<span>Content:</span>
				{dispatch(jsonData, itemSelected)}
				<span>Evaluation result:</span>
				<pre>
					{prettyJson(evaluation)}
				</pre>
			</div>
		);
	}

}
