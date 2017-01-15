import {observer} from "mobx-react";
import * as React from "react";

import {IComments} from "../../../latest";
import {BaseEditWidget} from "../base-edit-widget";


@observer
export class Comments extends BaseEditWidget<IComments> {

	renderContents(comments: IComments) {
		return (
			<p className="comments">{comments.text}</p>
		);
	}

}
