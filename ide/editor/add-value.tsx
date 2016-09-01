/// <reference path="../typings.d.ts" />

import {observer} from "mobx-react";
import * as React from "react";
import {indexOf} from "lodash";

import {preventBubbleUp} from "./util";
import {createOfSType} from "../../shared/util";

const metaModel = require("../../meta/meta-model.json");
const sTypes = Object.keys(metaModel);


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
				<div>
					<button onClick={this.switchInAdd.bind(this)}>+ Add</button>
				</div>
			);
		}
		return (
			<div>
				<span>Type:&nbsp;</span>
				<select onClick={preventBubbleUp} ref="typeSelector">
					{options}
				</select>
				<button onClick={this.createInstance.bind(this)}>Create</button>
				<button onClick={this.cancelCreate.bind(this)}>Cancel</button>
			</div>
		);
	}

	switchInAdd(e) {
		preventBubbleUp(e);
		this.setState({ creating: true });
	}

	cancelCreate(e) {
		preventBubbleUp(e);
		this.setState({ creating: false });
	}

	createInstance(e) {
		preventBubbleUp(e);
		this.setState({ creating: false });
		const newValue = (() => {
			const type = (this.refs["typeSelector"] as any).value;
			switch (type) {
				case "json-array": return [];
				case "json-object": return {};
				case "json-simple-value": return undefined;
				default: {
					if (indexOf(sTypes, type) < 0) {
						throw new Error(`Cannot create instance of: ${type}`);
					}
					return createOfSType(type);
				}
			}
		})();
		this.props.addCallback(newValue);
	}

}
