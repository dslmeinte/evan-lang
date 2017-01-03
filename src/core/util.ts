/**
 * @returns the given JSON in pretty-printed form (undefined-safe).
 */
export function prettyJson(json: any) {
	return json === undefined ? "undefined" : JSON.stringify(json, null, 2);
}

