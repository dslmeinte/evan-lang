import {observer} from "mobx-react";
import * as React from "react";

import {preventBubbleUp} from "./utils/ui-util";
import {IAccessor} from "./utils/accessor";


export interface IEditableString {
	isBeingEdited: boolean;
	accessor: IAccessor<string>;
}


@observer
export class EditableStringWidget extends React.Component<IEditableString, void> {

	render() {
		const {isBeingEdited, accessor} = this.props;
		return (
			isBeingEdited
				? <input type="text" value={accessor.value} onChange={this.onChange.bind(this)} ref="stringInput" />
				: <span>{accessor.value}</span>
		);
	}

	private onChange(e: React.SyntheticEvent) {
		preventBubbleUp(e);
		this.props.accessor.set((this.refs as any).stringInput.value as string);
	}

}

