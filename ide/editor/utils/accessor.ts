import {IObservableArray, observable} from "mobx";


export type MyArray<T> = Array<T> | IObservableArray<T>;


export interface IAccessor<T> {
	value: T;
	set(newValue: T): void;
}


export interface IWithAccessor<T> {
	accessor: IAccessor<T>;
};


export function makePropertyAccessor(object: Object, propertyName: string): IAccessor<any> {
	const observableObject = observable(object);
	return observable({
		get value() { return observableObject[propertyName]; },
		set: newValue => { observableObject[propertyName] = newValue; }
	});
}


export function makeArrayAccessor<T>(array: MyArray<T>, index: number): IAccessor<any> {
	const observableArray = observable(array);
	return observable({
		get value() { return observableArray[index]; },
		set: newValue => { observableArray[index] = newValue; }
	});
}

