import {observable} from "mobx";


export class EditorState {

	@observable pathLoaded: string = null;

	@observable jsonData: any = null;

	setResource(path: string, jsonData: any) {
		this.pathLoaded = path;
		this.jsonData = jsonData;
		location.hash = "#" + path;
	}

}
