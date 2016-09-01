import {isObject} from "lodash";

import {IIssue} from "../shared/semantics-types_gen";



const sType = "issue";

export function makeIssue(message: string, object?: Object): IIssue {
	const issue = {
		$sType: sType,
		"message": message
	};
	if (object) {
		issue["object"] = object;
	}
	return issue;
}

export function isIssue(object: any) {
	return isObject(object) && object.$sType === sType;
}

