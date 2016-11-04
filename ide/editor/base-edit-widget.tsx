import * as React from "react";

import {IWithAccessor} from "./utils/accessor";
import {type} from "../../core/util";
import {TypeSelector} from "./type-selector";
import {editorState, FocusType} from "./state";
import {preventBubbleUp} from "./utils/ui-util";


export abstract class BaseEditWidget<T> extends React.Component<IWithAccessor<T>, void> {

	abstract renderContents(value: T): void;

	render() {
		const value = this.props.accessor.value;
		return (
			<div onClick={this.handleFocusClick.bind(this)} className={this.genericClassName()}>
				{
					(this.isSelected() && !this.props.accessor.isUnswitchable)
						? <TypeSelector initialType={type(value)} onChange={newType => { console.log(newType); }} />
						: null
				}
				<span className="edit-icons"><button onClick={this.handleDeleteClick.bind(this)}>DEL</button></span>
				{this.renderContents(value)}
			</div>
		);
	}

	isSelected() {
		return editorState.itemFocused === this && editorState.focusType === FocusType.selected;
	}

	isBeingEdited() {
		return editorState.itemFocused === this && editorState.focusType === FocusType.editing;
	}

	exitEdit() {
		if (editorState.itemFocused === this) {
			editorState.itemFocused = FocusType.selected;
		}
	}


	/**
	 * @return an action that selects the given item.
	 * Intended to be used in React onClick defs as 'editorState.actionSelectItem(this)'.
	 */
	private handleFocusClick(e: React.SyntheticEvent) {
		if (editorState.itemFocused === this) {
			editorState.focusType = FocusType.editing;
		} else if (editorState.itemFocused !== FocusType.editing) {
			editorState.itemFocused = this;
			editorState.focusType = FocusType.selected;
		}
		preventBubbleUp(e);
	}

	private genericClassName() {
		return "widget " + ( editorState.itemFocused === this ? "focused" : "" );
	}

	private handleDeleteClick(e: React.SyntheticEvent) {
		this.exitEdit();
		this.props.accessor.delete();
		preventBubbleUp(e);
	}

}

