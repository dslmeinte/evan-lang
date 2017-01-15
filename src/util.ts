export namespace util {

	export function isObject(x: any) {
		return typeof x === "object" && x !== null;
	}

	export function isString(x: any) {
		return typeof x === "string";
	}

	export function isBoolean(x: any) {
		return typeof x === "boolean";
	}

	export function isFunction(x: any) {
		return typeof x === "function";
	}

	export function isArrayLike(x: any) {
		return Array.isArray(x)
			|| (util.isObject(x)
				&& typeof x.constructor === "function"
				&& x.constructor.name === "ObservableArray");
	}

	export const isInteger = require("is-integer");

	export type IDictionary = { [name: string]: any };

}

