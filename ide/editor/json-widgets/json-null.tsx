/// <reference path="../../../typings/tsd.d.ts" />

import {observer} from "mobx-react";
import * as React from "react";

import {editorState} from "../state";


@observer
export class JsonNull<T> extends React.Component<{}, {}> {

	render() {
		return (
			<span onClick={editorState.actionSelectItem(this)} className={editorState.cssClassForSelection(this)}>
				null
			</span>
		);
	}

}
