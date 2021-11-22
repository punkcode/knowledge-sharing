import React, { useState } from 'react';

const DefaultExample = () => {
  // Declare a new state variable, which we'll call "count".
  // Inside the square brackets is array destructuring.

  // You can have multiple state variables
  const [count, setCount] = useState(0);
  const [isBorken, setIsBorken] = useState(false);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => {
          // If you update with the same value as the current state,
          // React will bail out
          // without rendering the children or firing effects.
          setIsBorken(count > 13);
          setCount(count + 1);
      }}>
        Click me
      </button>
      {isBorken && <p>Is </p>}
    </div>
  );
};

const FunctionalUpdateExample = ({ initialCount }) => {
    const [count, setCount] = useState(initialCount);
  
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(initialCount)}>Reset</button>
            {/*
                If the update function returns the exact same value as the current state,
                the re-render will be skipped completely.
             */}
             {/*
                useState does not automatically merge update objects.
                If that is desired, use the object spread syntax:
                setState(previousState => {...previousState, ...updatedValues});
                Or the Hook useReducer.
             */}
            <button onClick={() => setCount(previousCount => previousCount - 1)}>-</button>
            <button onClick={() => setCount(previousCount => previousCount + 1)}>+</button>
        </div>
    );
};

const LazyInitialStateExample = () => {
    // The function in useState is used during the initial render, disregarded in re-renders.
    const [firstCount, setFirstCount] = useState(() => someExpensiveComputation(props));
    
    // Like this someExpensiveComputation would be called on every render
    const [secondCount, setSecondCount] = useState(someExpensiveComputation(props));
  
    return (
      <div>
        <p>You clicked {firstCount} times</p>
        <button onClick={() => setFirstCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  };