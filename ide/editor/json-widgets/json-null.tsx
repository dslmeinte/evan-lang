/// <reference path="../../../typings/tsd.d.ts" />

import {observer} from "mobx-react";
import * as React from "react";


@observer
export class JsonNull<T> extends React.Component<{}, {}> {

	render() {
		return <span className="json-null">null</span>;
	}

}
