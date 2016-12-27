# Contributing to Evan


## How and what to contribute

It's on GitHub, therefore: forketh and requesteth pulls (or somesuch thing).

**Disclaimer:** I'm not going to promise that I'll accept every pull request or won't scrutinize your request in the context of some standards and conventions I'm following myself at various times (or not) but couldn't be bothered to write down. (I might make such things more explicit as time goes by.)


### What to contribute

First of all, have a look at the [TODOs](./TODO.md): it's mostly for my own sake, and is definitely not a real roadmap but could serve as inspiration.

On higher level, Evan *needs* love in the following departments, and in the following order:

1. *Editing behavior of the type widgets.* An editor with which you can't edit, is not...
	(Currently, you can only select stuff and edit it to a very limited extent.)
1. *Better styling.* Both the chrome ("What chrome?!" "*That* chrome!") and the visualization of the widgets are quite..."fugly"...

Things that will happen anyway, are fun to, and tick all other boxes that programmers and compiler engineers of all ilks flock to:

1. *Language constructs.* The language is not very rich yet.
1. *Type system and checker.* Note that I'm completely immune to "...but your PL *requires* a recursively-complete type system like..."-nonsense.
	(Yes, that was completely opionated.)
1. All other topics that are inately academically interesting.

What I'm trying to say: I can't stop you from doing things from the second list (although I very well might reject your PR), but would really appreciate some effort on the first list.


## The basics


### Prerequisites and installation

You need to have the following installed:

* [Node.js](https://nodejs.org/en/): you need a moderately-recent version to be on the path - I'm currently on v4.2.2 for `node` and v2.14.7 of `npm`.
* `mkdir` (for initialization) and `diff` (for testing) need to be on the path.

To get things working under Linux (confirmed and specifically for: Debian, Ubuntu), visit [this page](https://github.com/nodesource/distributions).

To get things working under Windows, you'll have to replace all `/` (at least in `package.json`) with `\\` - in spite of it being almost 2017 already...

You might find things still not working under Windows (most likely) or Linux (less likely).
I'm developing on Mac myself, so that should work.

Thanks to Jos Warmer of OCL and OpenModeling fame for trying out under Linux and Windows!


### A map of the country side

AKA: You'll find the following in this repository:

* `dist/` (after building): contains JavaScript compiled from TypeScript.
* `documentation/`: you really have to ask?!
* `node_modules/` (after installing): NPM's backyard.
* `src/`: all TypeScript code, further subdivided into:
	* `core/`: the core of Evan, shared across IDE, testing code, etc.
	* `external-objects/`: code for external objects that can be injected into the evaluator of Evan programs.
	* `ide/`: the code for the IDE.
		The simple Node.js `http-server` takes `src/ide/web/` as Web root.
	* `meta/`: the meta description of Evan (specifically of its semantic types) and simple JavaScript program to generate some TypeScript source files from that.
	* `test/`: (unit) testing code.
* `test/`: testing data.
	`test/programs/` contains example programs,
	with `test/evaluation/expected/` describing what these programs are expected to evaluate to,
	which actually ends up in `test/evaluation/actual/`.
* Special cameo appearance by: the usual top-level boilerplate suspects.


### NPM commands

After cloning the repo and before doing anything, execute:

1. `npm install`: installs (which implies some downloading) all dependencies and does some initialization (through a `postinstall` script...yes I know...).

The following NPM commands can then be ran:

* * `npm run build-meta`: builds some TypeScript source files (interfaces, widget implementation skeletons) from the definition of Evan in `meta/meta-model.json`.
* `npm run build-core`: builds everything apart from the IDE code.
* `npm test`: runs `test/test-all.ts` that runs the evaluator (after having built it) on all files in `data/`, saves the results in `test/actual/` and compares these (using POSIX `diff`) with the ones in `test/expected/`.
* `npm run build-web`: builds everything including the IDE code.
* `npm start`: starts a Web server serving the IDE on [`localhost:8031`](http://localhost:8031) after building everything.
* `npm run watch-web`: watches every TS source in `ide/` (and referred from it) and recompiles and -Browserifies.
	You still have to refresh/reload in the browser, though.
* `npm run clean`: cleans the repository from installed, generated or compiled artifacts.
	Afterwards: jump to 0.


### Development environment

To edit the TypeScript code, you can use any IDE that speaks TypeScript such as (in no other order than free ones first) Visual Studio Code, Eclipse with suitable plugins, WebStorm (or up), etc.

Note that not every IDE might pick up the `tsconfig.json` equally well.
Use the NPM tasks described above to be sure of functioning compilation.

Everything should work fine under Mac (which I use) or Linux, but nothing's guaranteed under Windows (as yet), in particular because of Posix CLI commands used (like `diff` and `mkdir`).

To annoy as many people as possible and/or potentially start pseudo-religious wars of the `vi` vs. `emacs`-kind, I added a configuration for TSLint.
Enable the TSLint plugin for your TypeScript-IDE-du-jour at your own leisure and risk.

To tighten the feedback loop, see also the **Watching** section above.


## Understanding the code base

OK, to really change/add something in/to Evan, you might need a more detailed picture.


### Meta building

Evan's language constructs (which I call *semantics types*) are structurally described in `src/meta/meta-model.json`.
This description is *limited to structure* because that's the information that's fanned out and shared across various implementation aspects: evaluator, IDE.
When executing `src/meta/build-meta.js`, the latter reads the description and generates various things:

* `src/core/semantics-types_gen.ts`: interfaces for each semantics type.
* `src/ide/editor/polymorphic-dispatcher_gen.tsx`: function that dispatches on the semantics type tag in the `$sType` property.
* `src/ide/editor/type-widgets/*.tsx_gen`: skeleton implementation code for widgets for each semantics type.


### Evaluator

The standalone evaluator that evaluates an Evan program is implemented through the `evaluate` function in `src/core/evaluator.ts`.
It's "standalone" in the sense that it's meant to be executed from a CLI as if the program where the whole universe.

<small>
In the future, we'll likely get evaluators that assume a certain context, like: a browser with React and MobX loaded; running in Node.js; being able to access a JSON resources store.
</small>


### IDE

The entry point for the IDE is `src/ide/index.tsx`.
The function `dispatch` in `src/ide/editor/dispatcher.tsx` dispatches objects to their corresponding visualizing/editing widgets in `src/ide/editor/type-widgets` (and the ones in `ide/editor/json-widgets` for JSON constructs), based on the semantics type tag.

