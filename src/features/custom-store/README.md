## Custom Store with Selective Subscriptions

### Overview:
This implementation demonstrates a custom state management solution that combines:
- React Context for store distribution
- Manual subscription system with listeners
- Selective state subscriptions via selector functions
- Force re-render mechanism using useReducer

### How It Works:

#### Store Structure:
```typescript
type Store<T> = {
  state: T;                    // Mutable state object
  listeners: Set<() => void>;  // Set of callback functions
};
```

#### Subscription Mechanism:
- Each component using `useSelector` registers a callback in the listeners set
- When state updates, all registered callbacks are invoked
- Callbacks trigger `forceUpdate()` which causes component re-renders
- Components only re-render if they're subscribed via `useSelector`

### Concurrent Rendering Implications:

#### Selective Re-rendering:
- **Advantage**: Only components that call `useSelector` will re-render
- **Problem**: The selector function runs on EVERY state change, regardless of whether the selected value changed
- **Result**: Components re-render even when their selected state slice didn't change

#### Race Conditions:
- **Mutable State**: Direct state mutation can cause inconsistencies during concurrent updates
- **Listener Execution**: All listeners fire synchronously, which can cause cascading re-renders
- **Timing Issues**: State mutations happen immediately, but React re-renders are scheduled

#### Performance Characteristics:
- **Better than Context**: Avoids re-rendering components that don't use `useSelector`
- **Worse than Optimized Solutions**: No memoization of selector results
- **Concurrent Mode Issues**: Mutable state updates can interfere with React's concurrent features

### Problems with This Approach:

1. **No Selector Memoization**: Selector functions run on every update, even if the result is the same
2. **Mutable State**: Direct state mutation can cause issues with React's concurrent rendering
3. **Synchronous Updates**: All listeners fire immediately, potentially causing performance issues
4. **No Batching**: Multiple rapid updates aren't automatically batched

### Concurrent Rendering Impact:

#### React 18+ Concurrent Features:
- **Time Slicing**: Mutable state updates can interfere with React's ability to interrupt and resume work
- **Automatic Batching**: Manual listener notifications bypass React's batching mechanisms
- **Suspense**: Direct state mutations can cause issues with Suspense boundaries
- **Transitions**: `startTransition` won't work properly with this manual update system

#### Better Alternatives:
- **Zustand**: Provides similar selector-based subscriptions with proper optimizations
- **Valtio**: Offers proxy-based reactivity with better concurrent support
- **Jotai**: Atomic state management designed for concurrent React
- **React Query/SWR**: For server state with built-in concurrent handling

### Performance Example: Heavy Computation
The demo includes a computationally intensive Fibonacci calculation that showcases:

- **Selective Updates**: Only components using `useSelector` re-render
- **Selector Overhead**: Selector functions run on every state change
- **No Optimization**: Heavy computations re-run even when selected values don't change
- **Concurrent Issues**: Manual state updates can interfere with React's scheduling

### Recommendations:
- Use established state management libraries for production applications
- If building custom solutions, consider React's concurrent features
- Implement proper selector memoization and change detection
- Use immutable updates instead of direct state mutation 