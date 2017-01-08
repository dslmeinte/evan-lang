# Vision

Every programming language should come with a vision, so here's mine.

**Warning: WORK IN PROGRESS**

In short:

* I believe in the value of short and effective feedback cycles.
* I believe in projectional editing.
* Language workbenches have been assigned huge potential, but are still not living up to that expectation.


## The value of feedback

I strongly believe in the value of feedback.
It allows us to gain knowledge not intrinsic to ourselves before (i.e.: to learn), and to make corrections to the course we're taking to wherever we want to be.
Typically: the shorter the feedback cycle, the better.
If there is a lower bound on tightness of feedback cycles below which they could become useless, I haven't really encountered it.

The first major goal of Evan is to be able to program IDE-like Web applications that allow you to implement the best feedback cycle for your situation, quickly and easily.
Yes, this implies that implementing that IDE should come with a good feedback cycle as well, hence Evan's aim for meta-circularity so that the Evan editor/IDE is "just" another Evan program which you can embed in your own IDE, and/or modify.


## The virtues of projectional editing

I believe in projectional editing, over intrinsically text-/parsing-based approaches.

Pros:

* Focuses on the content, rather than on the syntax.
	The concrete, visual syntax can be made custom for any domain.
	You can even make the projection switchable.

* No pollution due to limitations of parser technology.
	Language composition in particular is "easy".


Cons:

* No universal, canonical representation of projectional content.
	You will always have to have an explicit mapping (serialization) of projectional content to some storage format.
	With this mapping come the usual problems of format versioning, etc.

	This is a lot of text to simply say: there's no easy (as in: free) way to `vim` your way into projectional content.

	Evan tries to mitigate this by choosing upfront an extremely well-known canonical representation: JSON.

* All behavior is UI work.

* Editing (algebraic-like) expressions is hard to get to behave "naturally".


## Embedding Evan in software development

Evan does, in itself, not represent end-to-end tooling for software development, so it has to be embedded in some way in any software development project.

The way I envision that is as follows:

1. Define and implement a DSL (domain-specific language) using Evan. 
2. Embed this implementation in a bespoke IDE, again implemented in Evan.
3. Generate suitable artifacts from prose created and maintained through this bespoke IDE.

