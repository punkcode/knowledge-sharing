import { useReducer } from 'react';

const initialState = {count: 0};

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        default:
            throw new Error();
    }
};

const Counter = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </>
    );
};

/* ---------------------------------------------------------------------------------------- */

// Lazy initialization
const init = initialCount => { count: initialCount };

const lazyReducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        case 'reset':
            return init(action.payload);
        default:
            throw new Error();
    }
};

const LazyCounter = ({ initialCount }) => {
    const [state, dispatch] = useReducer(lazyReducer, initialCount, init);
  
    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({type: 'reset', payload: initialCount})}>Reset</button>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </>
    );
};

/* ---------------------------------------------------------------------------------------- */

const TodosDispatch = React.createContext(null);

const TodosApp = () => {
    // Note: `dispatch` won't change between re-renders
    const [todos, dispatch] = useReducer(todosReducer);
  
    return (
        <TodosDispatch.Provider value={dispatch}>
            <DeepTree todos={todos} />
        </TodosDispatch.Provider>
    );
};

//...

const DeepChild = props => {
    // If we want to perform an action, we can get dispatch from context.
    const dispatch = useContext(TodosDispatch);
    
    const handleClick = () => {
        dispatch({ type: 'add', text: 'hello' });
    };
    
    return <button onClick={handleClick}>Add todo</button>;
};