import {IIssue} from "./semantics";
import {util} from "./util";

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
	return util.isObject(value) && value.$sType === "issue";
}
