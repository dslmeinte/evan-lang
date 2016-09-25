import {observer} from "mobx-react";
import * as React from "react";

import {makePropertyAccessor} from "../utils/accessor";
import {dispatch} from "../dispatcher";
import {editorState} from "../state";
import {IFunctionApplication} from "../../../core/semantics-types_gen";
import {mapMap} from "../../../core/util";


@observer
export class FunctionApplication<T> extends React.Component<{ functionApplication: IFunctionApplication; }, {}> {

	render() {
		const {functionApplication} = this.props;
		return (
			<div onClick={editorState.actionSelectItem(this)} className={editorState.cssClassForSelection(this)}>
				{dispatch(makePropertyAccessor(functionApplication, "function"))}<span>(</span>
					{mapMap(functionApplication.arguments, (argName, value) => (
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
