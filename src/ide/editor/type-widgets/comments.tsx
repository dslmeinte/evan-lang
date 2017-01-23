import {observer} from "mobx-react";
import * as React from "react";

import {IComments} from "../../../semantics";
import {BaseEditWidget} from "../base-edit-widget";

const styles = require("../styles.scss");


@observer
export class Comments extends BaseEditWidget<IComments> {

	renderContents(comments: IComments) {
		return (
			<p className={styles.comments}>{comments.text}</p>
		);
	}

}
