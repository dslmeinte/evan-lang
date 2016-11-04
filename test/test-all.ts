import {readdirSync, readFileSync, writeFileSync} from "fs";
import {join} from "path";

import {evaluate} from "../core/evaluator";
import {prettyJson} from "../core/util";


const rootprefix = join(__dirname, "../..");
const srcPathPrefix = join(rootprefix, "data");
const actualPathPrefix = join(rootprefix, "test/actual");

function readJson(path: string) {
	return JSON.parse(readFileSync(path, { encoding: "utf8" }));
}

function writeJson(path: string, data: string) {
	writeFileSync(path, prettyJson(data), { encoding: "utf8" });
}

readdirSync(srcPathPrefix).sort().forEach(fileName => {
	if (fileName.lastIndexOf(".json") === fileName.length - 5) {
		console.log(`Reading ${fileName}...`);
		const jsonData = readJson(join(srcPathPrefix, fileName));
		writeJson(join(actualPathPrefix, fileName), evaluate(jsonData));
		console.log(`\tSaved evaluation of ${fileName}.`);
	}
});

