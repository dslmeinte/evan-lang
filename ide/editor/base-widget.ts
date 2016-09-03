import * as React from "react";

import {editorState, FocusType} from "./state";
import {preventBubbleUp} from "./util";


export abstract class BaseWidget<T> extends React.Component<T, {}> {

	/**
	 * @return an action that selects the given item.
	 * Intended to be used in React onClick defs as 'editorState.actionSelectItem(this)'.
	 */
	handleClick(e) {
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

}
