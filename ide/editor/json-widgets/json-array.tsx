import {IObservableArray} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";

import {dispatch} from "../dispatcher";
import {editorState} from "../state";

import {AddValue} from "../add-value";


@observer
export class JsonArray<T> extends React.Component<{ array: Array<T> | IObservableArray<T>; }, {}> {

	render() {
		const {array} = this.props;
		return (
			<div onClick={editorState.actionSelectItem(this)} className={editorState.cssClassForSelection(this)}>
				<span>[</span>
					<span className="indent" key="foo">
						{array.map(item => dispatch(item, "" + array.indexOf(item)))}
						<AddValue addCallback={this.addItem.bind(this)} />
					</span>
				<span>]</span>
			</div>
		);
	}

	addItem(newValue: any) {
		this.props.array.push(newValue);
	}

}
