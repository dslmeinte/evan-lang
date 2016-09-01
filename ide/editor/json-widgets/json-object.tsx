import {observer} from "mobx-react";
import * as React from "react";

import {editorState} from "../state";
import {forEachProperty} from "../../../shared/util";
import {JsonProperty} from "./json-property";


@observer
export class JsonObject<T> extends React.Component<{ object: Object; }, {}> {

	render() {
		const {object} = this.props;
		const propertyNames = [];
		forEachProperty(object, (name, value) => { propertyNames.push(name); });
		return (
			<div onClick={editorState.actionSelectItem(this)} className={editorState.cssClassForSelection(this)}>
				<span>{"{"}</span>
					<div className="indent">
						{propertyNames.map(name => <JsonProperty name={name} value={object[name]} key={name} />)}
					</div>
				<span>{"}"}</span>
			</div>
		);
	}

}
