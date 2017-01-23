import {observer} from "mobx-react";
import * as React from "react";

import {makePropertyAccessor} from "../utils/accessor";
import {BaseEditWidget} from "../base-edit-widget";
import {dispatch} from "../dispatcher";
import {IFunctionApplication} from "../../../semantics";
import {mapMap} from "../utils/object-util";

const styles = require("../styles.scss");

@observer
export class FunctionApplication extends BaseEditWidget<IFunctionApplication> {

	renderContents(functionApplication: IFunctionApplication) {
		return (
			<div>
				{dispatch(makePropertyAccessor(functionApplication, "function"))} <span>(</span>
					{mapMap(functionApplication.arguments, (argName) => (
						<div className={styles.indent} key={argName}>
							<span>{argName}</span><span>&larr;</span>
							{dispatch(makePropertyAccessor(functionApplication.arguments, argName))}
						</div>
					))}
				<span>)</span>
			</div>
		);
	}

}
