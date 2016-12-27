import {observer} from "mobx-react";
import * as React from "react";

import {dispatch} from "../dispatcher";

import {IAccessor} from "../utils/accessor";
import {BaseEditWidget} from "../base-edit-widget";
import {IJsonProperty} from "../utils/json-property-util";
import {EditableStringWidget} from "../editable-string-widget";


@observer
export class JsonProperty extends BaseEditWidget<IJsonProperty> {

	renderContents(property: IJsonProperty) {
		const {name, value} = property;
		const fakeNameAccessor: IAccessor<string> = {
			set: () => null,
			value: name,
			delete: () => null
		};
		// FIXME  create accessor for both from IAccessor<IJsonProperty>
		return (
			<div>
				<EditableStringWidget isBeingEdited={this.isBeingEdited()} accessor={fakeNameAccessor}/> <span>:</span> {dispatch(value)}
			</div>
		);
	}

}
