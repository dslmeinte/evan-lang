/*
 * Node.js program, runnable from the command line, to run the evaluator on any JSON,
 * reading either from stdin or from the file having the 1st argument as path
 * and printing the result to stdout.
 */

import {readFileSync} from "fs";
import process = require("process");

import {evaluate} from "./evaluator";
import {prettyJson} from "./util";

const encoding = "utf8";


function handle(json: any) {
	console.log(prettyJson(evaluate(json)));
}

function withStdin(action: (json: any) => void) {
	process.stdin.setEncoding(encoding);

	let inputJson = "";
	process.stdin.on("readable", () => {
		let chunk = process.stdin.read();
		if (chunk !== null) {
			inputJson += chunk;
		}
	});

	process.stdin.on("end", () => {
		try {
			let json = JSON.parse(inputJson);
			action(json);
		} catch (e) {
			logError(e);
		}
	});
}

export function logError(err: Error) {
	console.error(`${err instanceof SyntaxError ? "Could not parse content as JSON" : "Something went wrong"}: ${err}`);
	console.error(err.stack);
}


// main:

if (process.argv[2]) {
	try {
		const jsonData = readFileSync(process.argv[2], { encoding });
		const json = JSON.parse(jsonData);
		handle(json);
	} catch (e) {
		logError(e);
	}
} else {
	withStdin(handle);
}

