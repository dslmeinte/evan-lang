import {SyntheticEvent} from "react";

export function preventBubbleUp(e: SyntheticEvent) {
	e.stopPropagation();
	e.preventDefault();
}

