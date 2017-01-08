# TODO

Roughly in order of importance.
Done items are prepended with "&#10003;".

* Do an experiment with React reacting off changes in visualized JSON, while keeping edit state.
* Introduce semantics types for:
	* Defining an immutable value.
	* Defining a mutable value.
	* Aggregating JSON contents from resource (as mutable value).
	* Changing some aggregated JSON in some way (e.g. using a JSON Patch-like expression) - for using in an action.
	* Defining types (through e.g. *type class* with a property name associated for type discrimination) *and interpreters on them*.
	* Doing ES6-style imports that actually execute a `require` (of something that can receive a version specification).
		To execute such programs we need some way of dynamically calling `npm install` and loading the result
			- see this [StackoverFlow answer](http://stackoverflow.com/questions/15957529/can-i-install-a-npm-package-from-javascript-running-in-node-js/15957574#15957574).
		Having this capability and the previous one, enables us to tap into the rich JavaScript ecology.
	* A way to keep the interpretation from finishing, to be able to define servers.
* Extend visualizer with selecting and editing (and folding) capabilities:
	* Fix bug w.r.t. boolean and void literals not view-updating while being edited.
	* Improve styling, e.g. using [Pure CSS](http://purecss.io/) and/or [rework](https://github.com/reworkcss/rework).
	* Implement some logic to have widgets determine whether the visualization would fit in a `span` (1 line) or requires a `div`.
* Implement a type checker.
* Extend IDE with instant type checking of source.
* Implement Lisp-style macro's.


## Done/archive

* Provide evaluator/interpreter with an environment.
	* &#10003; Come up with a sensible interface for an environment.
	* &#10003; Put resource states in the environment.
	* &#10003; Provide some sensible implementations of resource states (disk/local storage-based, etc.).
	* &#10003; Implement HTML bindings which maps to React.
	* &#10003; Implement semantics types that make use of this environment.
* Extend visualizer with selecting and editing (and folding) capabilities:
	* &#10003; Be able to select rendered components.
	* &#10003; Provide generic "add something" component.
		(
			For this, look at: [react-json](https://github.com/arqex/react-json).
			Effectively, we need first to be able to edit (as) plain JSON.
		)
	* &#10003; Have editor and evaluation panes next to each other.
	* &#10003; Provide edit mode for every component (JSON widgets first).
	* Provide sensible edit icons and some reflective info.
		1. &#10003; Deletion.
		2. &#10003; Change type (includes verbosity of current type).
* Introduce semantics types for:
	* &#10003; Indicating that some stuff is to be rendered as HTML/React component.
	* &#10003; Calling functions in JavaScript space.
* &#10003; Move to Browserify over WebPack - see e.g. the [`tsify` plugin for compiling TS in Browserify](https://www.npmjs.com/package/tsify).
* Small things:
	* &#10003; Commit TSD typings to repo as the `tsd` module takes 21M.
		Also: factor typings better by distinguishing Node.js vs. Browserify usage.
	* &#10003; Don't use `nscript` (whose installation is kinda heavy) unless actually convenient.
	* &#10003; Replace various CLI dependencies with `npm`-able, OS-independent alternatives: `rimraf`.
		Can we also replace `mkdir -p` and `diff` with NPM alternatives?
	* &#10003; Upgrade to TypeScript 2.0.x and make use of tagged unions for `ISemanticsTyped.$sType`.
	* &#10003; Make use of a DI'able class for the meta model, so we're relying less on absolute paths.
	* &#10003; Replace use of `core/mapper.ts` with use of explicit `switch` and TS 2.0 tagged unions.
* Implement watching (&#10003;) or even hot reload - see e.g. [this GitHub repo](https://github.com/milankinen/livereactload).

