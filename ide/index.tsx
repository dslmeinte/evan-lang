/// <reference path="./typings.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import {editorState} from "./editor/state";
import {EditorView} from "./editor/view";
import {EvaluationView} from "./evaluation-view";

import {resourcesState} from "./resources/state";
import {ResourcesView} from "./resources/view";


if (location.hash) {
	const path = location.hash.substring(1);
	const resourceToLoad = resourcesState.resourceByPath(path);
	if (resourceToLoad) {
		editorState.setResource(path, resourceToLoad);
	}
}

ReactDOM.render(
	<div>
		<ResourcesView />
		<hr />
		<EditorView />
		<EvaluationView />
	</div>,
	document.getElementById("root")
);

