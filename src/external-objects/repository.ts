import {observable} from "mobx";

/**
 * In-memory, non-persisting repository of opaque JSON resources.
 */
export class Repository {

	@observable private _resourcesMap: { [path: string]: any } = {};

	addResource(path: string, jsonData: any) {
		this._resourcesMap[path] = jsonData;
	}

	resourceByPath(path: string) {
		return this._resourcesMap[path];
	}

	resourcePaths() {
		return Object.keys(this._resourcesMap);
	}

}
