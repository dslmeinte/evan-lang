/// <reference path="../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import {EditorState} from "./editor/state";
import {EditorView} from "./editor/view";

import {resourcesState} from "./resources/state";
import {ResourcesView} from "./resources/view";


const editorState = new EditorState();

if (location.hash) {
	const path = location.hash.substring(1);
	const resourceToLoad = resourcesState.resourceByPath(path);
	if (resourceToLoad) {
		editorState.setResource(path, resourceToLoad);
	}
}

ReactDOM.render(
	<div>
		<ResourcesView resources={resourcesState} editorState={editorState} />
		<EditorView editorState={editorState} />
	</div>,
	document.getElementById("root")
);

