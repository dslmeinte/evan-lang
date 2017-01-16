import {observable} from "mobx";
import {SyntheticEvent} from "react";

import {preventBubbleUp} from "./utils/ui-util";

const styles = require("./styles.scss");

export enum FocusType {
	none, selected, editing
}


export class EditorState {

	@observable pathLoaded: string | null = null;

	@observable jsonData: any = null;

	@observable itemFocused: any = null;

	@observable focusType: FocusType = FocusType.none;


	setResource(path: string, jsonData: any) {
		this.pathLoaded = path;
		this.jsonData = jsonData;
		location.hash = "#" + path;
	}

	/**
	 * @return an action that selects the given item.
	 * Intended to be used in React onClick defs as 'editorState.actionSelectItem(this)'.
	 */
	actionSelectItem<E>(item: any) {
		return (e: SyntheticEvent<E>) => {
			this.itemFocused = item;
			preventBubbleUp(e);
		};
	}

	cssClassForSelection(item: any) {
		return styles.widget + " " + ( this.itemFocused === item ? styles.focused : "" );
	}

}

export const editorState = new EditorState();

