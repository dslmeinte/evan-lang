/// <reference path="./typings.d.ts" />

import {isBoolean, isString} from "lodash";

import {IContext, cloneContext, emptyContext} from "../core/context";
import {makeIssue, isIssue} from "../core/issues";
import {makeMapper} from "../core/mapper";
import * as sTypes from "../core/semantics-types_gen";
import {isSemanticsTyped} from "../meta/meta-model";


export function evaluate(json: any): any {

	const evaluateInt = makeMapper("evaluate", {
		"binary operation": evaluateBinaryOperation,
		"comments": () => undefined,
		"function application": evaluateFunctionApplication,
		"function definition": evaluateFunctionDefinition,
		"function reference": evaluateFunctionReference,
		"if-then-else": evaluateIfThenElse,
		"issue": () => undefined,
		"value reference": evaluateValueReference
	});

	return evaluateInt(json, emptyContext);


	function evaluateBinaryOperation(operation: sTypes.IBinaryOperation, context: IContext): any {
		const leftEval = evaluateInt(operation.left, context);
		const rightEval = evaluateInt(operation.right, context);
		try {
			switch (operation.operator) {
				case "+": return leftEval + rightEval;
				case "<": return leftEval < rightEval;
				default: return makeIssue(`Binary operator "${operation.operator}" not handled.`, operation);
			}
		} catch (e) {
			return makeIssue(`Could not execute binary operation with operator="${operation.operator}"; reason: ${e}.`, operation);
		}
		// TODO  add a lot of checking
	}

	function evaluateFunctionApplication(call: sTypes.IFunctionApplication, context: IContext): any {
		const definition = evaluateInt(call.function, context);
		if (definition === undefined || !isSemanticsTyped(definition) || definition.$sType !== "function definition") {
			return makeIssue(`Function does not resolve to function definition`, definition);
		}
		// TODO  check arguments against parameters
		const newContext = cloneContext(context);
		for (let parameterName in definition.parameters) {
			const argEval = evaluateInt(call.arguments[parameterName], context);
			newContext.letValues[parameterName] = argEval;
		}
		return evaluateInt(definition.body, newContext);
	}

	function evaluateFunctionReference(call: sTypes.IFunctionReference, context: IContext): sTypes.IFunctionDefinition | sTypes.IIssue | void {
		if (!call.name || !isString(call.name)) {
			return makeIssue(`Function reference has no name.`, call);
		}
		return context.functionDefinitions[call.name];
	}

	function evaluateFunctionDefinition(definition: sTypes.IFunctionDefinition, context: IContext): sTypes.IIssue | void {
		const name = definition.name;
		if (!name || !isString(name)) {
			return makeIssue(`Function definition lacks string-valued name field.`, definition);
		}
		// TODO  check parameters and return type
		context.functionDefinitions[name] = definition;
		return undefined;
	}

	function evaluateIfThenElse(ifThenElse: sTypes.IIfThenElse, context: IContext): any {
		if (!ifThenElse.condition || !ifThenElse.trueBranch || !ifThenElse.falseBranch) {
			return makeIssue(`If-then-else object not complete.`, ifThenElse);
		}
		const conditionEval = evaluateInt(ifThenElse.condition, context);
		if (isBoolean(conditionEval)) {
			return conditionEval ? evaluateInt(ifThenElse.trueBranch, context) : evaluateInt(ifThenElse.falseBranch, context);
		} else {
			const issue = makeIssue(`Condition of if-then-else does not evaluate to boolean.`, ifThenElse);
			if (isIssue(conditionEval)) {
				issue.causedBy = conditionEval;
			}
			return issue;
		}
	}

	function evaluateValueReference(valueRef: sTypes.IValueReference, context: IContext): any {
		const name = valueRef.name;
		return name && isString(name) && (name in context.letValues)
			? context.letValues[name]
			: makeIssue(`"${name}" is not a valid name for a value reference.`);
	}

}
