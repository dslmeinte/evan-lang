import {readFileSync} from "fs";
const process = require("process");

import {evaluate} from "../shared/evaluator";
import {prettyJson} from "../shared/util";


function handle(json: any) {
	console.log(prettyJson(evaluate(json)));
}

function withStdin(action: (json: any) => void) {
	process.stdin.setEncoding("utf8");

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
		const jsonData = readFileSync(process.argv[2], { encoding: "utf8" });
		const json = JSON.parse(jsonData);
		handle(json);
	} catch (e) {
		logError(e);
	}
} else {
	withStdin(handle);
}

