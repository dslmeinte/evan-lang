# Design of Evan


## Concrete syntax === JSON

For Evan, I chose JSON as its concrete syntax - this completely eschews me having to write a parser and is a very well-known and -supported format.

Of course, *writing* a program in JSON is tedious, uncomfortable and unproductive: after all, we'd be writing ASTs in a verbose form.
This should be remedied by a projectional/structured editor which provides a top-notch editing/development experience.

The inspiration for this choice comes from one of Lisp's main virtues: its *homoiconicity* which means very loosely that the language's concrete syntax is a data type in the language itself, so a program in that language can manipulate other programs in that language or even itself.


## Execution == evaluation

Evan "works" by providing the *evaluator* with *any* JSON input, and optionally an object table: see the documentation of [External Objects](./ExternalObjects.md).
The evaluator then tree-transforms this JSON according to the following rules:

1. Objects which have a string-valued property `$sType` are processed by their respective evaluation function (defined in the `evaluators` namespace in `src/core/evaluator.ts`).

	A. 	This evaluation *never* throws but returns something sensible: either an issue object or `undefined` (which corresponds loosely to e.g. Scala's `None`).

	B. The individual evaluation functions determine whether recursion into sub-values of sTyped objects happen.

2. All other values (so also objects which are not "sTyped") are returned as-is.

### On type checking

* Evaluation does (some) type checking - which obviously happens at runtime.
* A separate type checker (once it exists) mimics the evaluator but computes and checks typing statically: this should help the developer beyond what's reasonable in terms of unit tests.
* Evan is not statically typed, but could at some point become optionally-typed.

