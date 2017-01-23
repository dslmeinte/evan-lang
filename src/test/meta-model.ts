import test = require("tape");
import * as fs from "fs";
import { SemanticsNode } from "../meta-model";
const split = require("split2");
const ndjson = require("ndjson");

const file1 = __dirname + "/../../semantics.json";

// This test assumes that you have already generated the typings file.
// See: node lib/bin/cmd.js --help
const file2 = __dirname + "/../../fixtures/semantics.ts";

test("semantics", t => {
	fs.createReadStream(file1).pipe(split()).pipe(ndjson.parse())
		.on("data", (data: any) => {
			fs.readFile(file2, "utf8", (err, expected) => {
				if (err) { throw err; }

				const node = new SemanticsNode(data);
				const actual = node.print();
				t.equal(expected.trim(), actual.trim());
				t.end();
			});
		});
});