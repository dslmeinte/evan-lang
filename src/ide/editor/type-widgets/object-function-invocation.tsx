import {observer} from "mobx-react";
import * as React from "react";

import {makePropertyAccessor, makeArrayAccessor} from "../utils/accessor";
import {BaseEditWidget} from "../base-edit-widget";
import {dispatch} from "../dispatcher";
import {IObjectFunctionInvocation} from "../../../latest";

const styles = require("../styles.scss");


@observer
export class ObjectFunctionInvocation extends BaseEditWidget<IObjectFunctionInvocation> {

	renderContents(objectFunctionInvocation: IObjectFunctionInvocation) {
		return (
			<div>
				{dispatch(makePropertyAccessor(objectFunctionInvocation, "object"))}.{dispatch(makePropertyAccessor(objectFunctionInvocation, "function"))} <span>(</span>
					{objectFunctionInvocation.arguments.map((argument: any, index: any) => (
						<div className={styles.indent} key={"argument-" + index}>
							{dispatch(makeArrayAccessor(objectFunctionInvocation.arguments, index))}
						</div>
					))}
				<span>)</span>
			</div>
		);
	}

}
