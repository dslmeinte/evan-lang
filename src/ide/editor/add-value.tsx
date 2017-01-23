import {observer} from "mobx-react";
import * as React from "react";

import {editorState, FocusType} from "./state";
import {preventBubbleUp} from "./utils/ui-util";

import {default as metaModelInstance} from "../instance";
const sTypes = metaModelInstance.sTypes();

const styles = require("./styles.scss");


@observer
export class AddValue extends React.Component<{ addCallback: (newValue: any) => void; }, { creating: boolean; }> {

	constructor() {
		super();
		this.state = { creating: false };
	}

	render() {
		const options = [
			<option value="json-array" key="json-array">array: []</option>,
			<option value="json-object" key="json-object">object: {"{}"}</option>,
			<option value="json-simple-value" key="json-simple-value">simple value: ...</option>
		].concat(sTypes.map(sType => <option value={sType} key={sType}>{sType}</option>));
		if (!this.state.creating) {
			return (
				<div className={styles.widget}>
					<button onClick={this.initiateAdd.bind(this)}>+ Add</button>
				</div>
			);
		}
		return (
			<div className={[ styles.widget, styles.focused ].join(" ")}>
				<span>Type:&nbsp;</span>
				<select onClick={preventBubbleUp} ref="typeSelector">
					{options}
				</select>
				<button onClick={this.createInstance.bind(this)}>Create</button>
				<button onClick={this.cancelCreate.bind(this)}>Cancel</button>
			</div>
		);
	}

	initiateAdd<T>(e: React.SyntheticEvent<T>) {
		if (editorState.itemFocused) {
			if (editorState.focusType === FocusType.editing) {
				return;
			}
			editorState.focusType = FocusType.none;
			editorState.itemFocused = this;
		}
		preventBubbleUp(e);
		this.setState({ creating: true });
	}

	cancelCreate<T>(e: React.SyntheticEvent<T>) {
		preventBubbleUp(e);
		this.setState({ creating: false });
	}

	createInstance<T>(e: React.SyntheticEvent<T>) {
		preventBubbleUp(e);
		this.setState({ creating: false });
		const newValue = (() => {
			const type = (this.refs as any).typeSelector.value;
			switch (type) {
				case "json-array": return [];
				case "json-object": return {};
				case "json-simple-value": return undefined;
				default: {
					if (sTypes.indexOf(type) < 0) {
						throw new Error(`Cannot create instance of: ${type}`);
					}
					return metaModelInstance.createOfSType(type);
				}
			}
		})();
		this.props.addCallback(newValue);
	}

}
