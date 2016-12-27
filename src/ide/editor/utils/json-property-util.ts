import {observable} from "mobx";
import {IAccessor} from "./accessor";


export interface IJsonProperty {
	object: Object;
	name: string;
	value: any;
}


export function makeJsonPropertyAccessor(object: Object, propertyName: string): IAccessor<IJsonProperty> {
	return observable({
		get value() {
			return {
				object: object,
				name: propertyName,
				value: object[propertyName]
			};
		},
		set: (newValue: IJsonProperty) => {
			if (newValue.name !== propertyName) {
				delete object[propertyName];
			}
			object[newValue.name] = newValue.value;
		},
		"delete": () => {
			delete object[propertyName];
		},
		isUnswitchable: true
	});
}

