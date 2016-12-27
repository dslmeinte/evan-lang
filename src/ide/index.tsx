import * as React from "react";
import * as ReactDOM from "react-dom";

import {editorState} from "./editor/state";
import {EditorView} from "./editor/view";
import {EvaluationView} from "./evaluation-view";

import {exampleRepository} from "../external-objects/example-repository";
import {RepositoryView} from "./repository-view";


if (location.hash) {
	const path = location.hash.substring(1);
	const resourceToLoad = exampleRepository.resourceByPath(path);
	if (resourceToLoad) {
		editorState.setResource(path, resourceToLoad);
	}
}

ReactDOM.render(
	<div>
		<RepositoryView />
		<hr />
		<EditorView />
		<EvaluationView />
	</div>,
	document.getElementById("root")!
);
