import { useRef } from "react";

// Returns a mutable ref object whose .current-property
// is passed as the argument to useRef.
// This object will persist for the full lifetime of the component.

// Can be used to access the DOM via the ref-prop.
// Can be used to save instance variables.
// A plain JS-object that is the same on every render.
// Does NOT notify when its content changes.

// This is the common case: access a child imperatively.
const TextInputWithFocusButton = () => {
    const inputEl = useRef(null);
    const onButtonClick = () => {
        // `current` points to the mounted text input element
        inputEl.current.focus();
    };
    
    return (
        <>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
};

/* ---------------------------------------------------------------------------------------- */

// This is using the ref as an instance variable
const Timer = () => {
    const intervalRef = useRef();
    
    useEffect(() => {
        const id = setInterval(() => {
            // ...
        });
      
        intervalRef.current = id;
      
        return () => {
            clearInterval(intervalRef.current);
        };
    });

    const handleCancelClick = () => {
        clearInterval(intervalRef.current);
    };
  
    return '';
};

/* ---------------------------------------------------------------------------------------- */

// This is using the ref as an instance variable
const Counter = () => {
    const [count, setCount] = useState(0);
    
    const prevCountRef = useRef();
    useEffect(() => {
        prevCountRef.current = count;
    });
    
    const prevCount = prevCountRef.current;
    
    return <h1>Now: {count}, before: {prevCount}</h1>;
};