import {observable} from "mobx";


export class EditorState {

	@observable pathLoaded: string = null;

	@observable jsonData: any = null;

	@observable itemSelected: any = null;


	setResource(path: string, jsonData: any) {
		this.pathLoaded = path;
		this.jsonData = jsonData;
		location.hash = "#" + path;
	}

	/**
	 * @return an action that selects the given item.
	 * Intended to be used in React onClick defs as 'editorState.actionSelectItem(this)'.
	 */
	actionSelectItem(item: any) {
		return (e) => {
			this.itemSelected = item;
			e.stopPropagation();
			e.preventDefault();
		};
	}

	cssClassForSelection(item: any) {
		return this.itemSelected === item ? "selected" : "";
	}

}

export const editorState = new EditorState();

