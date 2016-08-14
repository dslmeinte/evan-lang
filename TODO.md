# TODO

Roughly in order of importance.

* Extend visualizer with selecting and editing (and folding) capabilities:
	1. Be able to select rendered components.
	2. Provide sensible edit icons.
	3. Provide edit mode for every component.
	4. Provide generic "add something" component.
	For this, look at: [react-json](https://github.com/arqex/react-json)
* Introduce semantics types for:
	* Changing the own JSON in some way (e.g. using a JSON Patch-like expression) - for using in an action.
	* Indicating that some stuff is to be rendered as HTML/React component.
	* Defining types *and interpreters on them*.
* Implement a type checker.
* Extend IDE with instant type checking of source.
* Implement Lisp-style macro's.

