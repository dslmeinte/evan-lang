# Contributing to Evan

## The basics


### A map of the country side

AKA: You'll find the following in this repository:

* `data/`: contains example programs and other JSON resources.
* `dist/` (after building): contains JavaScript compiled from TypeScript.
* `documentation/`: you really have to ask?!
* `ide/`: the code for the IDE.
	The simple Node.js `http-server` takes `ide/web/` as Web root.
* `meta/`: the meta description of Evan (specifically of its semantic types) and simple JavaScript program to generate some TypeScript source files from that.
* `node_modules/` (after installing): NPM's backyard.
* `shared/`: all code shared across IDE, testing code, etc.
* `test/`: testing code, including a CLI tool to invoke the evaluator on any JSON.
* `typings/`: TypeScript typings sourced from DefinitelyTyped, but part of repo to avoid having to use TSD.
* Special cameo appearance by: the usual top-level boilerplate suspects.


### NPM commands

The following NPM commands are useful:

* `npm install`: installs (which implies some downloading) all dependencies and does some initialization (through a `postinstall` script...yes I know...).
* `npm run build-meta`: builds some TypeScript source files (interfaces, widget implementation skeletons) from the definition of Evan in `meta/meta-model.json`.
* `npm run build`: builds everything apart from the IDE code.
* `npm test`: runs `test/test-all.ts` that runs the evaluator (after having built it) on all files in `data/`, saves the results in `test/actual/` and compares these (using POSIX `diff`) with the ones in `test/expected/`.
* `npm run build-web`: builds everything including the IDE code.
* `npm start`: starts a Web server serving the IDE on [`localhost:8031`](http://localhost:8031) after building everything.
* `npm run clean`: cleans the repository from installed, generated or compiled artifacts.
	Afterwards: jump to 0.


### Development environment

To edit the TypeScript code, you can use any IDE that speaks TypeScript such as (in no other order than free ones first) Visual Studio Code, Eclipse with suitable plugins, WebStorm (or up), etc.

Note that not every IDE might pick up the `tsconfig.json` equally well.
Use the NPM tasks described above to be sure of functioning compilation.

Everything should work fine under Mac (which I use) or Linux, but nothing's guaranteed under Windows (as yet), in particular because of Posix CLI commands used (like `diff` and `mkdir`).

To annoy as many people as possible and/or potentially start pseudo-religious wars of the `vi` vs. `emacs`-kind, I added a configuration for TSLint.
Enable the TSLint plugin for your TypeScript-IDE-du-jour at your own leisure and risk.


## Understanding the code base

OK, to really change/add something in/to Evan, you might need a more detailed picture.


### Meta building

Evan's language constructs (which I call *semantics types*) are structurally described in `meta/meta-model.json`.
This description is *limited to structure* because that's the information that's fanned out and shared across various implementation aspects: evaluator, IDE.
When executing `meta/build-meta.js`, the latter reads the description and generates various things:

* `shared/semantics-types.ts`: interfaces for each semantics type.
* `ide/editor/polymorphic-dispatcher.ts`: function that dispatches on the semantics type tag in the `$sType` property.
	(We can do away with this with TypeScript 2.0 because of tagged unions.)
* `ide/editor/type-widgets/*.tsx_gen`: skeleton implementation code for widgets for each semantics type.


### Evaluator

The standalone evaluator that evaluates an Evan program is implemented through the `evaluate` function in `shared/evaluator.ts`.


### IDE

The entry point for the IDE is `ide/index.tsx`.
The function `dispatch` in `ide/editor/dispatcher.tsx` dispatches objects to their corresponding visualizing/editing widgets in `ide/editor/type-widgets` (and the ones in `ide/editor/json-widgets` for JSON constructs), based on the semantics type tag.


## Actually contributing

OK, to *really* change/add something in/to Evan, you might still some more info.

**TODO**  explain what needs to be done when adding a language construct

