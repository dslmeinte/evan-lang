import test = require("tape");
import * as fs from "fs";
import * as path from "path";
import { SemanticsNode } from "../meta-model";
const split = require("split2");
const ndjson = require("ndjson");
const glob = require("glob");

const dir = __dirname + "/../../fixtures/meta-model";

test("build semantics", t => {

	glob(dir + "/*.json", (err: any, files: any[]) => {
		if (err) {
			throw err;
		}

		t.plan(files.length);

		files.forEach(file => {
			const basename = path.basename(file);

			const version = basename.split(".json")[0];

			fs.createReadStream(file).pipe(split()).pipe(ndjson.parse())
				.on("data", (data: any) => {
					fs.readFile(dir + "/" + version + ".ts", "utf8", (err, expected) => {
						if (err) { throw err; }

						const node = new SemanticsNode(data);
						const actual = node.print();
						t.equal(expected.trim(), actual.trim(), version);
					});
				});
		});
	});

});
