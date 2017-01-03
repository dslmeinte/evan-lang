/**
 * A singleton exposing a very small part of the browser's API.
 */
export const browser = {
    /** @returns the post-hash part of the current URI. */
    uriHash: () => location && location.hash
                            ? location.hash.substring(1)
                            : undefined
};

