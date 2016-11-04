import {observer} from "mobx-react";
import * as React from "react";

import {makePropertyAccessor} from "../utils/accessor";
import {BaseEditWidget} from "../base-edit-widget";
import {dispatch} from "../dispatcher";
import {IFunctionApplication} from "../../../core/semantics-types_gen";
import {mapMap} from "../../../core/util";


@observer
export class FunctionApplication extends BaseEditWidget<IFunctionApplication> {

	renderContents(functionApplication: IFunctionApplication) {
		return (
			<div>
				{dispatch(makePropertyAccessor(functionApplication, "function"))} <span>(</span>
					{mapMap(functionApplication.arguments, (argName) => (
						<div className="indent" key={argName}>
							<span>{argName}</span><span>&larr;</span>
							{dispatch(makePropertyAccessor(functionApplication.arguments, argName))}
						</div>
					))}
				<span>)</span>
			</div>
		);
	}

}
