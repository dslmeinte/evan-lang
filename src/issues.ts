import {isObject} from "lodash";

import {IIssue} from "../core/semantics-types_gen";


/**
 * Creates and @returns an issue object
 * with the given message and (optionally) the offending object
 * (usually having an sType).
 */
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

/**
 * @returns whether the given value is an issue object.
 */
export function isIssue(value: any) {
	return isObject(value) && value.$sType === "issue";
}

