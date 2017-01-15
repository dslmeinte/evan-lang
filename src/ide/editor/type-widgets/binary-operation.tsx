import {observer} from "mobx-react";
import * as React from "react";

import {BaseEditWidget} from "../base-edit-widget";
import {makePropertyAccessor} from "../utils/accessor";
import {dispatch} from "../dispatcher";
import {IBinaryOperation} from "../../../latest";


@observer
export class BinaryOperation extends BaseEditWidget<IBinaryOperation> {

	renderContents(binaryOperation: IBinaryOperation) {
		return (
			<div>
				{dispatch(makePropertyAccessor(binaryOperation, "left"))}
				<span>{binaryOperation.operator}</span>
				{dispatch(makePropertyAccessor(binaryOperation, "right"))}
			</div>
		);
	}

}
