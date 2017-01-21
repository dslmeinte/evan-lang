import {observer} from "mobx-react";
import * as React from "react";

import {BaseEditWidget} from "../base-edit-widget";
import {IFunctionReference} from "../../../semantics";


@observer
export class FunctionReference extends BaseEditWidget<IFunctionReference> {

	renderContents(functionReference: IFunctionReference) {
		return (<span><em>{functionReference.name}</em></span>);
	}

}
