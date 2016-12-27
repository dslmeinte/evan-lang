# External Objects

_External Objects_ is Evan's way of interfacing with things outside any Evan program on its own.
It's nothing more than a map/dictionary of names to objects, which expose functions.
Using the semantics type `object-function invocation`, you can interact with functions on these objects.

As an example, consider `src/external-objects/browser.ts` which defines a `browser` object which exposes a function to return the location hash (without annoying '`#`') or `undefined` if it cannot be computed.

An Evan program to make use of that, could look as follows:

```
{
	"$sType": "object-function invocation",
	"object": "browser",
	"function": "locationHash",
	"arguments": []
}
```

To evaluate this, we invoke the evaluator as follows (you have to fix import paths, obviously):

```
import {browser} from "./src/external-objects/browser.ts";
import {evaluate} from "./src/core/evaluator.ts";

evaluate(theJsonAbove, { browser });
```

(Note the nice TypeScript shorthand to put an object into an object under the variable's name.)

This mechanism is meant to expose interaction with the outside system without polluting Evan with language features that would exist solely for that purpose.

Of course, it can be mis-/abused to code business logic in e.g. TypeScript/JavaScript without actually using Evan, but that'd be considered cheating at the very least...

