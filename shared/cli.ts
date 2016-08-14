/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/nscript/nscript.d.ts" />

import {readFileSync} from "fs";
import {nscript, Shell} from "nscript";

import {evaluate} from "../evaluation/evaluator";
import {withStdin} from "./stdin";
import {prettyJson, logError} from "./util";

nscript((shell: Shell, $0) => {

	function process(json: any) {
		console.log(prettyJson(evaluate(json)));
	}

	if ($0) {
		try {
			const jsonData = readFileSync($0, { encoding: "utf8" });
			const json = JSON.parse(jsonData);
			process(json);
		} catch (e) {
			logError(e);
		}
	} else {
		withStdin(process);
	}

});

