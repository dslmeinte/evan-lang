# Evan: EValuation of Abstract Nodes

The main goal of the *Evan programming language* is to bootstrap a working, functional-style general purpose programming language which nestles comfortably in the JavaScript-world, complete with tools like an evaluator and IDE.

It also ports selected virtues of a number of existing languages (most notably: Lisp) to the context of JavaScript.
The IDE should (eventually) be implemented as an Evan program itself, making it meta-circular.

The following technology is used: Node.js, NPM, TypeScript, Browserify, React and [MobX](https://mobxjs.github.io/mobx/).


## Getting started

To get started:

1. Clone this repository.
2. In the cloned repository, execute: `npm install`
3. To start a Web server with the IDE, execute: `npm start`.
	Then point a browser to [`http://localhost:8031`](http://localhost:8031) to interact with the IDE.
	Select an available file/resource to inspect and/or edit and see its evaluation.
4. To run the tests for the evaluator, execute: `npm test`.
5. To (re-)build the IDE (after having made changes), execute `npm build-web` and re-load it in the browser.
	Hot reloading isn't implemented yet and meta-circularity of the IDE would actually make that circuitous.
6. To run the standalone evaluator on arbitrary (but valid) JSON, execute: `npm run build-core`, `node dist/test/cli.js (<) data/fib.json`.
	You can input JSON either by specifying a path as last argument or by passing it to `stdin`.


## Documentation

All other documentation you can find under [`documentation/`](./documentation).
Right now, the menu offers the following selection of dishes:

* [How to contribute](./documentation/Contributing.md)
* [TODOs that form a short-term roadmap of sorts](./documentation/TODO.md)
* [A primordial design](./documentation/Design.md)


## About the name

As you've probably already noticed, the "Evan" acronym is awkward.
That's because is retrofitted to the name of my first-born :)


