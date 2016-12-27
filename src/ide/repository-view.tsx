import {observer} from "mobx-react";
import * as React from "react";

import {exampleRepository} from "../external-objects/example-repository";
import {editorState} from "./editor/state";


@observer
export class RepositoryView extends React.Component<{}, {}> {

	render() {
		return (
			<div className="resources-pane">
				<span>Resource:&nbsp;</span>
				<select
					className="resource-selector"
					ref="resourceSelector"
					value={editorState.pathLoaded || "none"}
					onChange={this.handleChange.bind(this)}
				>
					<option key="none" value="none" disabled={true}>(none)</option>
					{exampleRepository.resourcePaths().map(path => <option key={path} value={path}>{path}</option>)}
				</select>
			</div>
		);
	}

	handleChange() {
		const path = (this.refs as any).resourceSelector.value;
		editorState.setResource(path, exampleRepository.resourceByPath(path));
	}

}
