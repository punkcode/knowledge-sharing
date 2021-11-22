# React Hooks
Simplifying the [React Hooks-documentation](https://reactjs.org/docs/hooks-intro.html).

## Why Hooks?
We want to "hook" inte React features and be able to reuse stateful logic between components. This will help us avoid providers, consumers, higher-order components, render props, and other abstractions. The idea is to make complex components easier to understand.

Classes are confusing, verbose, and don't play nicely with machines. In combination with Lifecycle events classes separate logic in unintuitive ways. Keep the ones that exist, move over to Function Components with Hooks for new components or when refactoring Class Components.

## Which Hooks exist?
### Basic Hooks
- useState
- useEffect
- useContext

### Variant or Edge Case Hooks
- useReducer
- useCallback
- useMemo
- useRef
- useImperativeHandle
- useLayoutEffect
- useDebugValue
- useWhateverYourHeartDesires

## Rules
- Use top-level before any returns. Never use in loops, conditions, or nestled functions. React relies on the call order of Hooks.
- Need a condition? Place it in the Hook.
- Use in Function Components, not Class Components.