import { useCallback, useMemo } from "react";

// Returns a memoized FUNCTION
// Think of memoization as caching a value so that it does NOT
// need to be recalculated.

// The array of dependencies are not passed as arguments to the callback,
// but should be considered as such.

const memoizedCallback = useCallback(
    () => {
        doSomething(a, b);
    },
    [a, b],
);

// This is the same thing
const memoizedValue = useMemo(
    () => () => {
        doSomething(a, b)
    },
    [a, b],
);
