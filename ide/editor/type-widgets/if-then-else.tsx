import {observer} from "mobx-react";
import * as React from "react";

import {makePropertyAccessor} from "../utils/accessor";
import {BaseEditWidget} from "../base-edit-widget";
import {dispatch} from "../dispatcher";
import {IIfThenElse} from "../../../core/semantics-types_gen";


@observer
export class IfThenElse extends BaseEditWidget<IIfThenElse> {

	renderContents(ifThenElse: IIfThenElse) {
		return (
			<div>
				<span><b>if</b>: </span><div className="indent">
					{dispatch(makePropertyAccessor(ifThenElse, "condition"))}</div>
				<span><b>then</b>: </span><div className="indent">
					{dispatch(makePropertyAccessor(ifThenElse, "trueBranch"))}</div>
				<span><b>else</b>: </span><div className="indent">
					{dispatch(makePropertyAccessor(ifThenElse, "falseBranch"))}</div>
			</div>
		);
	}

}
