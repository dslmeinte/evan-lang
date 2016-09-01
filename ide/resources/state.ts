import {observable} from "mobx";

const resourceFib = require("../../data/fib.json");
const resourceSimple = require("../../data/simple.json");
const resourceSimpleFunc = require("../../data/simple-func.json");
const metaModel = require("../../meta/meta-model.json");


export class ResourcesState {

	@observable private _resourcesMap: { [path: string]: any } = {};

	addResource(path: string, jsonData: any) {
		this._resourcesMap[path] = jsonData;
	}

	resourceByPath(path: string) {
		return this._resourcesMap[path];
	}

	resourcesAsMap() {
		return this._resourcesMap;
	}

}

export const resourcesState = new ResourcesState();

resourcesState.addResource("fib", resourceFib);
resourcesState.addResource("simple", resourceSimple);
resourcesState.addResource("simple-func", resourceSimpleFunc);
resourcesState.addResource("meta-model", metaModel);

