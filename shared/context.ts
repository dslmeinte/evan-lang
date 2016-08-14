/// <reference path="../typings/tsd.d.ts" />

import {cloneDeep} from "lodash";

import * as sTypes from "../shared/semantics-types";


export interface IContext {
	functionDefinitions: { [name: string]: sTypes.IFunctionDefinition };
	letValues: { [name: string]: any };
}

export function cloneContext(context: IContext): IContext {
	return cloneDeep(context);
}

export const emptyContext: IContext = {
	functionDefinitions: {},
	letValues: {}
};

// TODO  make into a class and be able to nest and such (scoping!)

