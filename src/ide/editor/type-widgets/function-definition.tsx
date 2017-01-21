import {observer} from "mobx-react";
import * as React from "react";

import {makePropertyAccessor} from "../utils/accessor";
import {BaseEditWidget} from "../base-edit-widget";
import {dispatch} from "../dispatcher";
import {IFunctionDefinition} from "../../../semantics";
import {mapMap} from "../utils/object-util";

const styles = require("../styles.scss");

@observer
export class FunctionDefinition extends BaseEditWidget<IFunctionDefinition> {

	renderContents(functionDefinition: IFunctionDefinition) {
		return (
			<div>
				<span><b>define</b> </span><span><em>{functionDefinition.name}</em></span><span>(</span>
					{mapMap(functionDefinition.parameters, (paramName, type) => (
						<div className={styles.indent} key={paramName}>
							<span>{paramName}</span><span>: </span><span>{type}</span>
						</div>
					))}
				<span>)</span>{functionDefinition.returnType ? <span>: {functionDefinition.returnType}</span> : null}
				<span> {"{"}</span>
				<div className={styles.indent}>
					{dispatch(makePropertyAccessor(functionDefinition, "body"))}
				</div>
				<span>{"}"}</span>
			</div>
		);
	}

}
