import {observer} from "mobx-react";
import * as React from "react";

import {evaluate} from "../core/evaluator";
import {editorState} from "./editor/state";
import {prettyJson} from "../core/util";


@observer
export class EvaluationView extends React.Component<{}, {}> {

	render() {
		const {jsonData} = editorState;
		const evaluation = evaluate(jsonData);
		return (
			<div className="evaluation-pane">
				<span>Evaluation:</span>
				<pre>
					{prettyJson(evaluation)}
				</pre>
			</div>
		);
	}

}
