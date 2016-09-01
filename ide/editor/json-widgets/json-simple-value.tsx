import {observer} from "mobx-react";
import * as React from "react";

import {prettyJson} from "../../../shared/util";


@observer
export class JsonSimpleValue<T> extends React.Component<{ value: string | number | boolean | void; }, {}> {

	render() {
		return (
			<pre>{prettyJson(this.props.value)}</pre>
		);
	}

}
