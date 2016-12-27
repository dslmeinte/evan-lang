import {readdirSync, readFileSync, writeFileSync} from "fs";
import {join} from "path";

import {evaluate} from "../core/evaluator";
import {prettyJson} from "../core/util";

import {testObject} from "../external-objects/test-object";


const rootprefix = join(__dirname, "../..");
const srcPathPrefix = join(rootprefix, "test/programs");
const actualPathPrefix = join(rootprefix, "test/evaluation/actual");

function readJson(path: string) {
	return JSON.parse(readFileSync(path, { encoding: "utf8" }));
}

function writeJson(path: string, data: string) {
	writeFileSync(path, prettyJson(data), { encoding: "utf8" });
}

const externalObjects = { testObject };
readdirSync(srcPathPrefix).sort().forEach(fileName => {
	if (fileName.lastIndexOf(".json") === fileName.length - 5) {
		console.log(`Reading ${fileName}...`);
		const jsonData = readJson(join(srcPathPrefix, fileName));
		writeJson(join(actualPathPrefix, fileName), evaluate(jsonData, externalObjects));
		console.log(`\tSaved evaluation of ${fileName}.`);
	}
});


