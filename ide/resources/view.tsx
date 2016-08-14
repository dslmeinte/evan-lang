/// <reference path="../../typings/tsd.d.ts" />

import {observer} from "mobx-react";
import * as React from "react";

import {ResourcesState} from "./state";
import {EditorState} from "../editor/state";


@observer
export class ResourcesView extends React.Component<{ resources: ResourcesState, editorState: EditorState }, {}> {

	render() {
		const {resources, editorState} = this.props;
		return (
			<div>
				<ul>
					{Object.keys(resources.resourcesAsMap()).map(path => <li key={path} onClick={this.loadResource(path)}>{path}</li>)}
				</ul>
				<span>{editorState.pathLoaded ? `file loaded: ${editorState.pathLoaded}` : "no file loaded"}</span>
			</div>
		);
	}

	loadResource(path: string) {
		return () => { this.props.editorState.setResource(path, this.props.resources.resourceByPath(path)); };
	}

}

