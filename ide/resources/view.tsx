/// <reference path="../../typings/tsd.d.ts" />

import {observer} from "mobx-react";
import * as React from "react";

import {resourcesState} from "./state";
import {editorState} from "../editor/state";


@observer
export class ResourcesView extends React.Component<{}, {}> {

	render() {
		return (
			<div>
				<ul>
					{Object.keys(resourcesState.resourcesAsMap()).map(path => <li key={path} onClick={this.loadResource(path)}>{path}</li>)}
				</ul>
				<span>{editorState.pathLoaded ? `file loaded: ${editorState.pathLoaded}` : "no file loaded"}</span>
			</div>
		);
	}

	loadResource(path: string) {
		return () => { editorState.setResource(path, resourcesState.resourceByPath(path)); };
	}

}

