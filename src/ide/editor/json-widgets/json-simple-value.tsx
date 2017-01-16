import {observer} from "mobx-react";
import * as React from "react";

import {BaseEditWidget} from "../base-edit-widget";
import {SimpleValue, SimpleType, toInfo, coerce, fromString, nothing} from "../utils/simple-value-util";

const styles = require("../styles.scss");


@observer
export class JsonSimpleValue extends BaseEditWidget<SimpleValue> {

	renderContents(value: SimpleValue) {
		return this.isBeingEdited() ? this.renderValueEdit(value) : this.renderValue(value);
	}

	private renderValue(value: SimpleValue) {
		const {type, displayText} = toInfo(value);
		return <span className={styles["json-" + SimpleType[type]]}>{displayText}</span>;
	}

	private renderValueEdit(value: SimpleValue) {
		const {type, displayText} = toInfo(value);
		return (
			<span>
				{type === SimpleType.string ? <input type="text" value={"" + value} onChange={this.onChange.bind(this)} ref="valueInput" /> : null}
				{type === SimpleType.number ? <input type="number" value={displayText} onChange={this.onChange.bind(this)} ref="valueInput" /> : null}
				{type === SimpleType.boolean
					? <input type="checkbox" checked={!!value} onChange={this.onChangeBoolean.bind(this)} ref="booleanInput" />
					: null
				}
				{type === SimpleType.nothing ? (
						<span>
							{this.mkNothingRadio.bind(this)(undefined, value as void)}
							{this.mkNothingRadio.bind(this)(null, value as void)}
						</span>
					)
					: null
				}
				<button onClick={this.exitEdit.bind(this)}>Done</button>
				<span>Coerce to:</span>
				<select onChange={this.doCoerce.bind(this)} ref="coerceTypeSelector" value={SimpleType[type]}>
					<option value="string" key="string">string</option>
					<option value="number" key="number">number</option>
					<option value="boolean" key="boolean">boolean</option>
					<option value="nothing" key="nothing">nothing</option>
				</select>
			</span>
		);
	}

	private doCoerce() {
		const dstTypeIndex = (this.refs as any).coerceTypeSelector.value as string;
		this.props.accessor.set(coerce(this.props.accessor.value, SimpleType[dstTypeIndex]));
	}

	private mkNothingRadio(targetValue: nothing, currentValue: nothing) {
		const asText = targetValue === undefined ? "undefined" : "null";
		return (
			<span key={"input-" + asText}>
				<input
					type="radio"
					name="nothing-radios"
					value={asText}
					key={asText}
					checked={targetValue === currentValue}
					onChange={() => { this.props.accessor.set(targetValue); }}
				/>
				<span className={styles["json-nothing"]}>{asText}</span>
			</span>
		);
	}

	private onChange() {
		const newValueAsString = (this.refs as any).valueInput.value;
		const {type} = toInfo(this.props.accessor.value);
		this.props.accessor.set(fromString(newValueAsString, type));
	}

	private onChangeBoolean() {
		this.props.accessor.set((this.refs as any).booleanInput.checked);
	}

}
