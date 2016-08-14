# Evan-lang

The Evan programming language tries to port a number of the virtues of a number of existing languages (most notably: Lisp) to the context of JavaScript.
Its main goal is to bootstrap a working, functional-style general purpose programming language which nestles comfortably in the JavaScript-world, complete with interpreter, type checker (which adorns an Evan program with type annotations) and editor/IDE.
The IDE should be programmable in Evan itself.

## Concrete syntax === JSON

One of Lisp's main virtues is *homoiconicity* which means very loosely that the language's concrete syntax is a data type in the language itself.
For Evan, I chose JSON as its concrete syntax - this completely eschews me having to write a parser and is a very well-known and -supported format.

Of course, *writing* a program in JSON is tedious, uncomfortable and unproductive: after all, we'd be writing ASTs in a verbose form.
This should be remedied by a projectional/structured editor which provides a top-notch editing/development experience.


## Some design/architectural guidelines

* Evaluation does type checking: no reliance on static type checking!
* A separate type checker mimics the evaluator but computes and checks typing statically: this should help the developer beyond what's reasonable in terms of unit tests.
* Execution does not throw but returns something sensible, an issue object or `undefined` (which corresponds loosely to `None`).
	Receiver of any one of these types of values has to decide what to do them on a case-by-case basis.

