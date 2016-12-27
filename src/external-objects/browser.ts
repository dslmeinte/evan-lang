export const browser = {
    locationHash: () => location && location.hash
                            ? location.hash.substring(1)
                            : undefined
};

