import {observer} from "mobx-react";
import * as React from "react";

import {dispatch} from "../dispatcher";
import {editorState} from "../state";
import {IFunctionApplication} from "../../../shared/semantics-types";
import {mapMap} from "../../../shared/util";


@observer
export class FunctionApplication<T> extends React.Component<{ functionApplication: IFunctionApplication; }, {}> {

	render() {
		const {functionApplication} = this.props;
		return (
			<div onClick={editorState.actionSelectItem(this)} className={editorState.cssClassForSelection(this)}>
				{dispatch(functionApplication.function)}<span>(</span>
					{mapMap(functionApplication.arguments, (argName, value) => (
						<div className="indent" key={argName}>
							<span>{argName}</span><span>&larr;</span>{dispatch(value)}
						</div>
					))}
				<span>)</span>
			</div>
		);
	}

}
