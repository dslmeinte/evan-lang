import {readdirSync, readFileSync, writeFileSync} from "fs";
import {join} from "path";

import {evaluate} from "../shared/evaluator";
import {prettyJson} from "../shared/util";


const rootprefix = join(__dirname, "../..");
const srcPathPrefix = join(rootprefix, "data");
const actualPathPrefix = join(rootprefix, "test/actual");

function readJson(path) {
	return JSON.parse(readFileSync(path, { encoding: "utf8" }));
}

function writeJson(path, data) {
	writeFileSync(path, prettyJson(data), { encoding: "utf8" });
}

readdirSync(srcPathPrefix).sort().forEach(fileName => {
	if (fileName.lastIndexOf(".json") === fileName.length - 5) {
		const jsonData = readJson(join(srcPathPrefix, fileName));
		writeJson(join(actualPathPrefix, fileName), evaluate(jsonData));
		console.log(`Saved evaluation of ${fileName}.`);
	}
});

