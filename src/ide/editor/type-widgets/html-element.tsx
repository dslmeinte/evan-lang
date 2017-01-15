import {observer} from "mobx-react";
import * as React from "react";

import {BaseEditWidget} from "../base-edit-widget";
import {dispatch} from "../dispatcher";
import {IHtmlElement} from "../../../latest";


@observer
export class HtmlElement extends BaseEditWidget<IHtmlElement> {

	renderContents(htmlElement: IHtmlElement) {
		return (
			<div>
				<span>&lt;{htmlElement.tag} {htmlElement.classes}&gt;</span>
					{dispatch(htmlElement.contents)}
				<span>&lt;/{htmlElement.tag}&gt;</span>
			</div>
		);
		// TODO  make correct (using accessors) and editable
	}

}
