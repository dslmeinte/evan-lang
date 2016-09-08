import * as React from "react";

import {IWithAccessor} from "./utils/accessor";
import {editorState, FocusType} from "./state";
import {preventBubbleUp} from "./utils/ui-util";


export abstract class FocusWidget<T> extends React.Component<T, void> {

	/**
	 * @return an action that selects the given item.
	 * Intended to be used in React onClick defs as 'editorState.actionSelectItem(this)'.
	 */
	handleFocusClick(e) {
		if (editorState.itemFocused === this) {
			editorState.focusType = FocusType.editing;
		} else if (editorState.itemFocused !== FocusType.editing) {
			editorState.itemFocused = this;
			editorState.focusType = FocusType.selected;
		}
		preventBubbleUp(e);
	}

	genericClassName() {
		return "widget " + ( editorState.itemFocused === this ? "focused" : "" );
	}

	isBeingEdited() {
		return editorState.itemFocused === this && editorState.focusType === FocusType.editing;
	}

	exitEdit() {
		if (editorState.itemFocused === this) {
			editorState.itemFocused = FocusType.selected;
		}
	}

}


export abstract class BaseEditWidget<T> extends FocusWidget<IWithAccessor<T>> {
}

