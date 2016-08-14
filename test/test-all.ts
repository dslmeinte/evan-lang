/// <reference path="../typings/tsd.d.ts" />

import {readdirSync, readFileSync, writeFileSync} from "fs";
import {join} from "path";

import {evaluate} from "../evaluation/evaluator";
import {encodingOptions, prettyJson} from "../shared/util";


const rootprefix = join(__dirname, "../..");
const srcPathPrefix = join(rootprefix, "data");
const actualPathPrefix = join(rootprefix, "test/actual");

function readJson(path) {
	return JSON.parse(readFileSync(path, encodingOptions));
}

function writeJson(path, data) {
	writeFileSync(path, prettyJson(data), encodingOptions);
}

readdirSync(srcPathPrefix).sort().forEach(fileName => {
	if (fileName.lastIndexOf(".json") === fileName.length - 5) {
		const jsonData = readJson(join(srcPathPrefix, fileName));
		writeJson(join(actualPathPrefix, "evaluation", fileName), evaluate(jsonData));
		console.log(`Saved evaluation of ${fileName}.`);
	}
});

