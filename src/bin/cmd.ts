#!/usr/bin/env node

import * as path from "path";
import * as minimist from "minimist";
import * as evan from "../evan";
import { SemanticsNode } from "../meta-model";

const argv: any = minimist(process.argv.slice(2), {
	alias: {
		v: "version",
		h: "help"
	}
});

const file: string = argv._[0];

if ((!file && !argv.semantics) || argv.help) {
	showUsage();
} else if (argv.semantics) {
	const data = require("../../latest.json");
	const node = new SemanticsNode(data);
	console.log(node.print());
	process.exit(0);
} else if (argv.version) {
	console.log("v" + require("../../package.json").version);
	process.exit(0);
} else {
	const prog = require(path.resolve(file));
	const out = evan.evaluate(prog);
	console.dir(out, { depth: null, colors: true });
}

function showUsage() {
	const usage =
`evan FILE OPTIONS

Options:

  --semantics    Print TypeScript semantics.
  -v, --version  Show meta-model version.
  -h, --help     Show this message.
`;
	console.log(usage);
	process.exit(0);
}
