import test = require("tape");
import * as path from "path";
import * as evan from "../evan";
const glob = require("glob");

const programsDir = __dirname + "/../../fixtures/programs";

test("evaluate programs", t => {

	glob(programsDir + "/**/*.json", (err: any, files: any[]) => {
		if (err) {
			throw err;
		}

		const testObject = {
			"testFunction": (foo: string, bar: number) => `Hello ${foo}, the answer is: ${bar * 2}.`
		};

		const {progs, expected} = files.reduce<any>((acc: any, file: any) => {
			if (path.basename(path.dirname(file)) === "out") {
				acc.expected[path.basename(file)] = require(file);
			} else {
				acc.progs[path.basename(file)] = require(file);
			}
			return acc;
		// tslint:disable-next-line:align
		}, { progs: {}, expected: {}});

		t.plan(Object.keys(progs).length);

		Object.keys(progs).forEach(d => {
			const prog = progs[d];
			let res = evan.evaluate(prog, {testObject});
			const name = d.replace(path.extname(d), "");
			t.comment(name);
			if (name === "html-test") {
				t.equal(res.props.className, "foo bar");
			} else {
				t.deepLooseEqual(res, expected[d]);
			}
		});

	});

});
