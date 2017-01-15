import * as React from "react";

import {IAccessor} from "./utils/accessor";

import {BinaryOperation} from "./type-widgets/binary-operation";
import {Comments} from "./type-widgets/comments";
import {FunctionApplication} from "./type-widgets/function-application";
import {FunctionDefinition} from "./type-widgets/function-definition";
import {FunctionReference} from "./type-widgets/function-reference";
import {HtmlElement} from "./type-widgets/html-element";
import {IfThenElse} from "./type-widgets/if-then-else";
import {Issue} from "./type-widgets/issue";
import {ObjectFunctionInvocation} from "./type-widgets/object-function-invocation";
import {ValueReference} from "./type-widgets/value-reference";

export function polyDispatch(sType: string, accessor: IAccessor<any>, key?: string) {
	switch (sType) {
		case "binary operation": return <BinaryOperation accessor={accessor} key={key} />;
		case "comments": return <Comments accessor={accessor} key={key} />;
		case "function application": return <FunctionApplication accessor={accessor} key={key} />;
		case "function definition": return <FunctionDefinition accessor={accessor} key={key} />;
		case "function reference": return <FunctionReference accessor={accessor} key={key} />;
		case "HTML element": return <HtmlElement accessor={accessor} key={key} />;
		case "if-then-else": return <IfThenElse accessor={accessor} key={key} />;
		case "issue": return <Issue accessor={accessor} key={key} />;
		case "object-function invocation": return <ObjectFunctionInvocation accessor={accessor} key={key} />;
		case "value reference": return <ValueReference accessor={accessor} key={key} />;
		default: return null;
	}
}
