import * as ReactDOM from "react-dom";
import {evaluate} from "../core/evaluator";

const program = require("../../test/programs/html-test.json");


ReactDOM.render(
	evaluate(program),
	document.getElementById("root")!
);

