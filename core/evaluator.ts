/// <reference path="./typings.d.ts" />

import {isBoolean, isObject, isString} from "lodash";
import {isArrayLike} from "mobx";

import {makeIssue, isIssue} from "../core/issues";
import * as sTypes from "../core/semantics-types_gen";
import {isSemanticsTyped} from "../meta/meta-model";


type Values = { [name: string]: any };
type FunctionTable = { [name: string]: any };

export function evaluate(json: any, values: Values = {}, functionTable: FunctionTable = {}): any {

	if (isArrayLike(json)) {
		return (json as any[]).map(item => evaluate(item, values, functionTable));
	}
	if (isObject(json)) {
		if (isSemanticsTyped(json)) {
			const object = json as sTypes.SemanticsTyped;
			switch (object.$sType) {
				case "binary operation": return evaluators.evaluateBinaryOperation(object, values, functionTable, evaluate);
				case "comments": return undefined;
				case "function application": return evaluators.evaluateFunctionApplication(object, values, functionTable, evaluate);
				case "function definition": return evaluators.evaluateFunctionDefinition(object, functionTable);
				case "function reference": return evaluators.evaluateFunctionReference(object, functionTable);
				case "if-then-else": return evaluators.evaluateIfThenElse(object, values, functionTable, evaluate);
				case "issue": return undefined;
				case "value reference": return evaluators.evaluateValueReference(object, values);
				default: return makeIssue(`Cannot evaluate object with sType="${json.$sType}".`, object);
			}
		}
		const result = {};
		for (let propertyName in json) {
			if (json.hasOwnProperty(propertyName)) {
				result[propertyName] = evaluate(json[propertyName], values, functionTable);
			}
		}
		return result;
	}
	return json;	// TODO  find out: why undefined -> null?
}


export namespace evaluators {

	type Evaluator = (json: any, values: Values, functionTable: FunctionTable) => any;

	export function evaluateBinaryOperation(
		operation: sTypes.IBinaryOperation, values: Values, functionTable: FunctionTable, polyEval: Evaluator
	): any {
		const leftEval = polyEval(operation.left, values, functionTable);
		const rightEval = polyEval(operation.right, values, functionTable);
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

	export function evaluateFunctionApplication(
		call: sTypes.IFunctionApplication, values: Values, functionTable: FunctionTable, polyEval: Evaluator
	): any {
		const definition = polyEval(call.function, values, functionTable);
		if (definition === undefined || !isSemanticsTyped(definition) || definition.$sType !== "function definition") {
			return makeIssue(`Function does not resolve to function definition`, definition);
		}
		// TODO  check arguments against parameters
		const newValues: Values = {};
		for (let parameterName in definition.parameters) {
			const argEval = polyEval(call.arguments[parameterName], values, functionTable);
			newValues[parameterName] = argEval;
		}
		return polyEval(definition.body, newValues, functionTable);
	}

	export function evaluateFunctionReference(
		call: sTypes.IFunctionReference, functionTable: FunctionTable
	): sTypes.IFunctionDefinition | sTypes.IIssue | void {
		if (!call.name || !isString(call.name)) {
			return makeIssue(`Function reference has no name.`, call);
		}
		return functionTable[call.name];
	}

	export function evaluateFunctionDefinition(
		definition: sTypes.IFunctionDefinition, functionTable: FunctionTable
	): sTypes.IIssue | void {
		const name = definition.name;
		if (!name || !isString(name)) {
			return makeIssue(`Function definition lacks string-valued name field.`, definition);
		}
		if (name in functionTable) {
			return makeIssue(`Function definition '${name}' was already defined.`, definition);
		}
		// TODO  check parameters and return type
		functionTable[name] = definition;
		return undefined;
	}

	export function evaluateIfThenElse(
		ifThenElse: sTypes.IIfThenElse, values: Values, functionTable: FunctionTable, polyEval: Evaluator
	): any {
		if (!ifThenElse.condition || !ifThenElse.trueBranch || !ifThenElse.falseBranch) {
			return makeIssue(`If-then-else object not complete.`, ifThenElse);
		}
		const conditionEval = polyEval(ifThenElse.condition, values, functionTable);
		if (isBoolean(conditionEval)) {
			return polyEval(conditionEval ? ifThenElse.trueBranch : ifThenElse.falseBranch, values, functionTable);
		} else {
			const issue = makeIssue(`Condition of if-then-else does not evaluate to boolean.`, ifThenElse);
			if (isIssue(conditionEval)) {
				issue.causedBy = conditionEval;
			}
			return issue;
		}
	}

	export function evaluateValueReference(
		valueRef: sTypes.IValueReference, values: Values
	): any {
		const name = valueRef.name;
		return name && isString(name) && (name in values)
			? values[name]
			: makeIssue(`"${name}" is not a valid name for a value reference.`);
	}

}
