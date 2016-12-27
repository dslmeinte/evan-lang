import {isObject} from "lodash";

import {IIssue} from "../core/semantics-types_gen";


export function makeIssue(message: string, object?: Object): IIssue {
	const issue: IIssue = {
		"$sType": "issue",
		"message": message
	};
	if (object) {
		issue["object"] = object;	// (property 'object' not expressed in meta model)
	}
	return issue;
}

export function isIssue(object: any) {
	return isObject(object) && object.$sType === "issue";
}

