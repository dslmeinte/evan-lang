import * as React from "react";
import * as ReactDOM from "react-dom";

import {editorState} from "./editor/state";
import {EditorView} from "./editor/view";
import {EvaluationView} from "./evaluation-view";

import {browser} from "./external-objects/browser";
import {exampleRepository} from "./external-objects/example-repository";
import {RepositoryView} from "./repository-view";


if (location.hash) {
	const path = browser.uriHash();
	if (path) {
		const resourceToLoad = exampleRepository.resourceByPath(path);
		if (resourceToLoad) {
			editorState.setResource(path, resourceToLoad);
		}
	}
}

class IDE extends React.Component<void, void> {
	render() {
		return (
			<div>
				<RepositoryView />
				<hr />
				<EditorView />
				<EvaluationView />
			</div>
		);
	}
}

class UpdateWrapper extends React.Component<void, void> {
	componentWillMount() {
		this.forceUpdate(); // a little hack to help us rerender when this module is reloaded
	}

	render() {
		return <IDE />;
	}
}

const ud = require("ud");

ReactDOM.render(
	React.createElement(ud.defn(module, UpdateWrapper)),
	document.getElementById("main")
);
