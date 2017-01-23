import test = require("tape");
import {shallow} from "enzyme";
import * as fs from "fs";
import evan = require("../../evan");

test("transpile html-element node into react element", t => {
	const prog = JSON.parse(fs.readFileSync(__dirname + "/../../../fixtures/programs/html-test.json", "utf8"));
	const w = shallow(evan.evaluate(prog));
	t.equal(w.find(".foo.bar").length, 1);
	t.equal(w.find(".foo.bar").at(0).text(), "some text");
	t.end();
});
