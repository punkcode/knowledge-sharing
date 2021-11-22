// Returns a memoized VALUE
// Think of memoization as caching a value so that it does NOT
// need to be recalculated.

// The array of dependencies are not passed as arguments to the callback,
// but should be considered as such.

// This is only a performance optimization, not a semantic guarantee.
// React may choose to `forget` some memoized values to free memory.
// Write code so that it works as if useMemo was not there,
// but add it to optimize performance.

// This function will run during rendering.
// Do NOT do antyhing there that would not be done during rendering.
// Remember, side effects belong in useEffect, not useMemo.

const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

/* ---------------------------------------------------------------------------------------- */

const Parent = ({ a, b }) => {
    // Only re-rendered if `a` changes:
    const child1 = useMemo(() => <Child1 a={a} />, [a]);
    // Only re-rendered if `b` changes:
    const child2 = useMemo(() => <Child2 b={b} />, [b]);
    return (
        <>
            {child1}
            {child2}
        </>
    );
};