import * as React from "react";

import {BinaryOperation} from "./type-widgets/binary-operation";
import {Comments} from "./type-widgets/comments";
import {FunctionApplication} from "./type-widgets/function-application";
import {FunctionDefinition} from "./type-widgets/function-definition";
import {FunctionReference} from "./type-widgets/function-reference";
import {IfThenElse} from "./type-widgets/if-then-else";
import {Issue} from "./type-widgets/issue";
import {ValueReference} from "./type-widgets/value-reference";


export function polyDispatch(sType: string, json: any, key?: string) {
	switch (sType) {
		case "binary operation": return <BinaryOperation binaryOperation={json} key={key} />;
		case "comments": return <Comments comments={json} key={key} />;
		case "function application": return <FunctionApplication functionApplication={json} key={key} />;
		case "function definition": return <FunctionDefinition functionDefinition={json} key={key} />;
		case "function reference": return <FunctionReference functionReference={json} key={key} />;
		case "if-then-else": return <IfThenElse ifThenElse={json} key={key} />;
		case "issue": return <Issue issue={json} key={key} />;
		case "value reference": return <ValueReference valueReference={json} key={key} />;
		default: return null;
	}
}