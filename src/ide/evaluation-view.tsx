import {observer} from "mobx-react";
import * as React from "react";

import {evaluate} from "../evan";
import {editorState} from "./editor/state";
import {prettyJson} from "./editor/utils/object-util";
import {browser} from "./external-objects/browser";
import {testObject} from "./external-objects/test-object";

const styles = require("./editor/styles.scss");


@observer
export class EvaluationView extends React.Component<{}, {}> {

	render() {
		const {jsonData} = editorState;
		const externalObjects = { browser, testObject };
		const evaluation = evaluate(jsonData, externalObjects);
		return (
			<div className={styles.evaluationPane}>
				<span>Evaluation:</span>
				<pre>
					{prettyJson(evaluation)}
				</pre>
			</div>
		);
	}

}
