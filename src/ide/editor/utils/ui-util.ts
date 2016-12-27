import {SyntheticEvent} from "react";

export function preventBubbleUp<E>(e: SyntheticEvent<E>) {
	e.stopPropagation();
	e.preventDefault();
}

