import {observer} from "mobx-react";
import * as React from "react";

import {JsonProperty} from "./json-property";
import {makeJsonPropertyAccessor} from "../utils/json-property-util";
import {BaseEditWidget} from "../base-edit-widget";
import {preventBubbleUp} from "../utils/ui-util";

const styles = require("../styles.scss");

@observer
export class JsonObject<T extends Object> extends BaseEditWidget<T> {

	renderContents(object: T) {
		const propertyNames = Object.keys(object);
		return [
			<span key={"{"}>{"{"}</span>,
			<div key="body" className={styles.indent}>
				{propertyNames.map(name => <JsonProperty key={name} accessor={makeJsonPropertyAccessor(object, name)} />)}
				{this.isSelected()
					? (
						<span>
							New property:&nbsp;
							<input ref="nameNewProperty" type="text" placeholder="new name" onClick={preventBubbleUp} />
							<button onClick={this.onCreate.bind(this)} disabled={!! this.validateName()}>Create</button>
							<span className={styles.error}>{this.validateName()}</span>
						</span>
					)
					: null
				}
			</div>,
			<span key={"}"}>{"}"}</span>
		];
	}

	private newName(): string {
		const nameInput = (this.refs as any).nameNewProperty;
		return nameInput ? nameInput.value : null;
	}

	private onCreate() {
		if (this.validateName() === null) {
			(this.props.accessor.value as T)[this.newName()] = null;
		}
	}

	private validateName(): string | null {
		const name = this.newName();
		if (!name) {
			return "name cannot be empty";
		}
		// TODO  add more name validation
		if (name in this.props.accessor.value) {
			return "property with name already exists";
		}
		return null;
	}

}
