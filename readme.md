# Evan: EValuation of Abstract Nodes

The main goal of the *Evan programming language* is to bootstrap a working, functional-style general purpose programming language which nestles comfortably in the JavaScript-world, complete with tools like an IDE.

It also ports selected virtues of a number of existing languages (most notably: Lisp) to the context of JavaScript.
The IDE should (eventually) be implemented as an Evan program itself, making it meta-circular.

The following technology is used: Node.js, NPM, TypeScript, Browserify, React and [MobX](https://mobxjs.github.io/mobx/).


# how does it work?

The Evan language is implemented by means of an *evaluator*, which transforms *any* JSON into a JavaScript value.
Often, this is again JSON but it can also be React DOM elements which are then rendered into a browser.
The evaluation is in principle functional, in the sense that evaluating the same piece of JSON leads to the same result.
Also, the evaluation is wired to happen incremental (using MobX), so (small) changes to the JSON input should only require a partial re-evaluation, for better performance.


# npm scripts

Type `npm run NAME` to execute any of the commands below:

| name          | description           |
| ------------- | ------------- |
| `test` | run evaluator & meta-model generation tests |
| `test-watch` | run evaluator & meta-model generation tests in watch-mode |
| `clean` | clean build artifacts |
| `build` | transpile `ts(x)`'s to `lib/` dir |
| `watch` | transpile `ts(x)`'s to `lib/` in watch-mode |
| `build-ide` | build ide browser bundle |
| `watch-ide` | build ide browser bundle in watch-mode |
| `ide` | start a development server at [http://localhost:8070](http://localhost:8070) and run `watch-ide` in parallel |


# usage

```
evan FILE OPTIONS

Options:

  --semantics    Print TypeScript semantics.
  -v, --version  Show meta-model version.
  -h, --help     Show this message.
```


# documentation

All other documentation you can find under [`docs/`](./docs).
Right now, the menu offers the following selection of dishes:

* [What's been added recently](./docs/updates.md)
* [How to contribute](./docs/contributing.md)
* [TODOs that form a short-term roadmap of sorts](./docs/todo.md)
* [A primordial design](./docs/design.md)
* [The _External Objects_ mechanism](./docs/external-objects.md)


# about the name

As you've probably already noticed, the "Evan" acronym is awkward.
That's because is retrofitted to the name of Meinte's first-born :)


# license

mit
