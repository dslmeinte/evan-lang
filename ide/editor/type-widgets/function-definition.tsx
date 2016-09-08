import {observer} from "mobx-react";
import * as React from "react";

import {makePropertyAccessor} from "../utils/accessor";
import {dispatch} from "../dispatcher";
import {editorState} from "../state";
import {IFunctionDefinition} from "../../../shared/semantics-types_gen";
import {mapMap} from "../../../shared/util";


@observer
export class FunctionDefinition<T> extends React.Component<{ functionDefinition: IFunctionDefinition; }, {}> {

	render() {
		const {functionDefinition} = this.props;
		return (
			<div onClick={editorState.actionSelectItem(this)} className={editorState.cssClassForSelection(this)}>
				<span><b>define</b> </span><span><em>{functionDefinition.name}</em></span><span>(</span>
					{mapMap(functionDefinition.parameters, (paramName, type) => (
						<div className="indent" key={paramName}>
							<span>{paramName}</span><span>: </span><span>{type}</span>
						</div>
					))}
				<span>)</span>{functionDefinition.returnType ? <span>: {functionDefinition.returnType}</span> : null}
				<span> {"{"}</span>
				<div className="indent">
					{dispatch(makePropertyAccessor(functionDefinition, "body"))}
				</div>
				<span>{"}"}</span>
			</div>
		);
	}

}
