import {observer} from "mobx-react";
import * as React from "react";

import {makePropertyAccessor, makeArrayAccessor} from "../utils/accessor";
import {BaseEditWidget} from "../base-edit-widget";
import {dispatch} from "../dispatcher";
import {IObjectFunctionInvocation} from "../../../core/semantics-types_gen";


@observer
export class ObjectFunctionInvocation extends BaseEditWidget<IObjectFunctionInvocation> {

	renderContents(objectFunctionInvocation: IObjectFunctionInvocation) {
		return (
			<div>
				{dispatch(makePropertyAccessor(objectFunctionInvocation, "object"))}.{dispatch(makePropertyAccessor(objectFunctionInvocation, "function"))} <span>(</span>
					{objectFunctionInvocation.arguments.map((argument, index) => (
						<div className="indent" key={"argument-" + index}>
							{dispatch(makeArrayAccessor(objectFunctionInvocation.arguments, index))}
						</div>
					))}
				<span>)</span>
			</div>
		);
	}

}
