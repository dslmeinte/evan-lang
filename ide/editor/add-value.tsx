/// <reference path="../typings.d.ts" />

import {observer} from "mobx-react";
import * as React from "react";
import {indexOf} from "lodash";

import {editorState, FocusType} from "./state";
import {preventBubbleUp} from "./utils/ui-util";

import {default as metaModelInstance} from "../../meta/meta-model";
const sTypes = metaModelInstance.sTypes();


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
				<div className="widget">
					<button onClick={this.initiateAdd.bind(this)}>+ Add</button>
				</div>
			);
		}
		return (
			<div className="widget focused">
				<span>Type:&nbsp;</span>
				<select onClick={preventBubbleUp} ref="typeSelector">
					{options}
				</select>
				<button onClick={this.createInstance.bind(this)}>Create</button>
				<button onClick={this.cancelCreate.bind(this)}>Cancel</button>
			</div>
		);
	}

	initiateAdd(e: React.SyntheticEvent) {
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

	cancelCreate(e: React.SyntheticEvent) {
		preventBubbleUp(e);
		this.setState({ creating: false });
	}

	createInstance(e: React.SyntheticEvent) {
		preventBubbleUp(e);
		this.setState({ creating: false });
		const newValue = (() => {
			const type = (this.refs as any).typeSelector.value;
			switch (type) {
				case "json-array": return [];
				case "json-object": return {};
				case "json-simple-value": return undefined;
				default: {
					if (indexOf(sTypes, type) < 0) {
						throw new Error(`Cannot create instance of: ${type}`);
					}
					return metaModelInstance.createOfSType(type);
				}
			}
		})();
		this.props.addCallback(newValue);
	}

}
