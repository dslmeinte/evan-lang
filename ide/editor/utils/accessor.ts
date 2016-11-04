import {observable} from "mobx";
import {ArrayLike} from "../../../core/util";


/**
 * (Type parameter T is type of current/initial value, not after change.)
 */
export interface IAccessor<T> {

	/** Value can not be type-changed. */
	isUnswitchable?: boolean;

	value: T;
	set(newValue: T): void;
	delete(): void;

}


export interface IWithAccessor<T> {
	accessor: IAccessor<T>;
};


export function makePropertyAccessor(object: Object, propertyName: string): IAccessor<any> {
	const observableObject = observable(object);
	return observable({
		get value() { return observableObject[propertyName]; },
		set: (newValue: any) => { observableObject[propertyName] = newValue; },
		"delete": () => { delete observableObject[propertyName]; }
	});
}


export function makeArrayAccessor<T>(array: ArrayLike<T>, index: number): IAccessor<any> {
	const observableArray = observable(array);
	return observable({
		get value() { return observableArray[index]; },
		set: (newValue: any) => { observableArray[index] = newValue; },
		"delete": () => { observableArray.splice(index, 1); }
	});
}

