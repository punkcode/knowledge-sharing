import React, { useState, useEffect } from 'react';

// useEffect performs side effects in Function Components AFTER render.
// By default after the first render AND after every update.
// I.e., the DOM has been updated by the time it runs the effects.

// React renders our component, remembers the effect we used and then
// runs the effect after updating the DOM.

// What are `side effects`?
// Data fetching, setting up a subscription, manually changing the DOM, etc.
const DefaultExample = () => {
    const [count, setCount] = useState(0);
  
    // Similar to componentDidMount and componentDidUpdate.
    // Called inside the Function Component to have access to
    // props and state.
    
    // The function passed to useEffect will be different on EVERY render.
    // Every re-render a different effect is scheduled, replacing the
    // previous one.
    // So each effect belongs to a particular render.

    // Doesn't block the browser from updating the screen.
    // If a synchronous update is needed use the useLayoutEffect Hook.
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });
  
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
};

/* ---------------------------------------------------------------------------------------- */

// Function Component with Clean-Up
// React cleans up effects from the previous render before running the effects the next time.
const FriendStatus = props => {
    const [isOnline, setIsOnline] = useState(null);
  
    // Look! The logic is together! Not split!
    useEffect(() => {
        const handleStatusChange = status => {
            setIsOnline(status.isOnline);
        };
    
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        // Specify how to clean up after this effect:
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    });
  
    if (isOnline === null) {
        return 'Loading...';
    }
  
    return isOnline ? 'Online' : 'Offline';
};

// Order of updates
// Mount with { friend: { id: 100 } } props
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // Run first effect

// Update with { friend: { id: 200 } } props
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // Clean up previous effect
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // Run next effect

// Update with { friend: { id: 300 } } props
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // Clean up previous effect
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // Run next effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Clean up last effect

/* ---------------------------------------------------------------------------------------- */

// Function Component with Many Concerns
// Look! The logic is together logically! Not split!
const FriendStatusWithCounter = props => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });

    const [isOnline, setIsOnline] = useState(null);
    useEffect(() => {
        const handleStatusChange = status => {
            setIsOnline(status.isOnline);
        };
    
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        // Specify how to clean up after this effect:
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    });
  
    if (isOnline === null) {
        return 'Loading...';
    }
  
    return isOnline ? 'Online' : 'Offline';
};

/* ---------------------------------------------------------------------------------------- */

// In the future, the second argument might get added
// automatically by a build-time transformation

// All values from the component scope (props and state) that change over time and that are used
// by the effect should be in the dependecy array.
// They are NOT arguments, but should be treated as such.
const SkippingEventsExample = props => {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, [count]); // Only re-run the effect if the count changes.

    const [isOnline, setIsOnline] = useState(null);
    useEffect(() => {
        const handleStatusChange = status => {
            setIsOnline(status.isOnline);
        };
    
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        // Specify how to clean up after this effect:
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    }, [props.friend.id]); // Only re-subscribe if props.friend.id changes
  
    if (isOnline === null) {
        return 'Loading...';
    }
  
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <p>{isOnline ? 'Online' : 'Offline'}</p>
        </div>
    );
};

/* ---------------------------------------------------------------------------------------- */

// Dependency array issues

// If you specify a list of dependencies in any hook,
// such as useEffect, useLayoutEffect, useMemo, useCallback, or useImperativeHandle
// it MUST include all values used inside the callback and participate in the React data flow.
// This includes props, state, and anything derived from them.

// For the most part declare functions needed by an effect inside of it
const FirstDependencyArrayExample = ({ someProp }) => {
    const doSomethingWrong = () => {
        console.log(someProp);
    };

    useEffect(() => {
        doSomethingWrong();
    }, []); // This is not safe (it calls `doSomething` which uses `someProp`)

    useEffect(() => {
        const doSomethingRight = () => {
            console.log(someProp);
        };

        doSomethingRight();
    }, [someProp]); // OK (our effect only uses `someProp`)

    useEffect(() => {
        const doSomethingElse = () => {
            console.log('Hello!');
        };

        doSomethingElse();
    }, []); // OK in this example because we don't use *any* values from component scope
};

// Second dependency array example
const ProductPageWrong = ({ productId }) => {
    const [product, setProduct] = useState(null);
    
    const fetchProduct = async () => {
        const response = await fetch('http://myapi/product/' + productId); // Uses productId prop
        const json = await response.json();
        setProduct(json);
    };
    
    useEffect(() => {
        fetchProduct();
    }, []); // Invalid because `fetchProduct` uses `productId`

    return product;
};

const ProductPageRight = ({ productId }) => {
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        // By moving this function inside the effect, we can clearly see the values it uses.
        const fetchProduct = async () => {
            const response = await fetch('http://myapi/product/' + productId);
            const json = await response.json();
            setProduct(json);
        };
        
        fetchProduct();
    }, [productId]); // Valid because our effect only uses productId
    
    return product;
};

const ProductPageRightHandleOutOfOrderResponses = ({ productId }) => {
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        let ignore = false;
        const fetchProduct = async () => {
            const response = await fetch('http://myapi/product/' + productId);
            const json = await response.json();
            if (!ignore) setProduct(json);
        };
        
        fetchProduct();

        return () => { ignore = true; };
    }, [productId]);
    
    return product;
};

// Third dependency array example
const Counter = () => {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
        const id = setInterval(() => {
            setCount(c => c + 1); // This doesn't depend on `count` variable outside
        }, 1000);
        return () => clearInterval(id);
    }, []); // Our effect doesn't use any variables in the component scope
    
    return <h1>{count}</h1>;
};