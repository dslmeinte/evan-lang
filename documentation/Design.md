# Design of Evan

## Concrete syntax === JSON

For Evan, I chose JSON as its concrete syntax - this completely eschews me having to write a parser and is a very well-known and -supported format.

Of course, *writing* a program in JSON is tedious, uncomfortable and unproductive: after all, we'd be writing ASTs in a verbose form.
This should be remedied by a projectional/structured editor which provides a top-notch editing/development experience.

The inspiration for this choice comes from one of Lisp's main virtues: its *homoiconicity* which means very loosely that the language's concrete syntax is a data type in the language itself, so a program in that language can manipulate other programs in that language or even itself.


## Some design guidelines

* Evaluation does type checking and does not rely the program statically checking out OK!
* A separate type checker mimics the evaluator but computes and checks typing statically: this should help the developer beyond what's reasonable in terms of unit tests.
* Execution does not throw but returns something sensible, an issue object or `undefined` (which corresponds loosely to e.g. Scala's `None`).
	Receiver of any one of these types of values has to decide what to do them on a case-by-case basis.

