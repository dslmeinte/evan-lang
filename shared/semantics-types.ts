import {ISemanticsTyped} from "./base-semantics-types";


export interface IBinaryOperation extends ISemanticsTyped {
	operator: string;
	left: any;
	right: any;
}

export interface IComments extends ISemanticsTyped {
	sections: { [name: string]: string };
}

export interface IFunctionApplication extends ISemanticsTyped {
	function: any;
	arguments: { [name: string]: any };
}

export interface IFunctionDefinition extends ISemanticsTyped {
	name: string;
	parameters: { [name: string]: string };
	returnType?: string;
	body: any;
}

export interface IFunctionReference extends ISemanticsTyped {
	name: string;
}

export interface IIfThenElse extends ISemanticsTyped {
	condition: any;
	trueBranch: any;
	falseBranch: any;
}

export interface IIssue extends ISemanticsTyped {
	message: string;
	object?: Object;
	causedBy?: IIssue;
}

export interface IValueReference extends ISemanticsTyped {
	name: string;
}

