## React Context State Management

### Characteristics:
- Built-in React state management solution using Context API + useReducer
- Re-renders all components that consume the context when state changes
- No external dependencies required
- Follows React's built-in patterns and paradigms

### How Context Re-rendering Works:
- When context state updates, ALL components consuming that context re-render
- This includes components that don't use the specific piece of state that changed
- Context provides no built-in optimization for selective subscriptions
- Every consumer component will re-render on any context state change

### Performance Characteristics:
- **Re-render Behavior**: All context consumers re-render on any state change
- **Heavy Computation Impact**: Expensive operations (like Fibonacci calculation) will re-run on every context update
- **No Granular Updates**: Unlike signals, there's no way to update only specific parts of the UI
- **Optimization Required**: Manual optimization needed using React.memo, useMemo, useCallback

### Best Practices:
- Split contexts by concern to minimize unnecessary re-renders
- Use React.memo to prevent re-renders of components that don't need updates
- Implement useMemo and useCallback for expensive computations
- Consider multiple contexts instead of one large context
- Use context selectors or state management libraries for complex scenarios

### Performance Comparison:
When compared to other state management solutions:
- **vs Signals**: Context causes full component re-renders, signals update DOM directly
- **vs Zustand**: Similar re-render behavior but Zustand offers better selector optimization
- **vs useState**: Context allows sharing state across components but with broader re-render impact

### Use Cases:
- Sharing state across multiple components in a component tree
- Theming and configuration that doesn't change frequently
- User authentication state
- When you want to avoid prop drilling without external dependencies
- Applications where re-render performance isn't critical

### Performance Example: Heavy Computation
The demo includes a computationally intensive Fibonacci calculation that takes approximately 3 seconds to complete. This example showcases how:

- **With Context**: The heavy computation re-runs whenever ANY context state changes
- **Real Impact**: You can observe performance degradation when unrelated state updates occur
- **Optimization Need**: Demonstrates why manual optimization (React.memo, useMemo) is crucial 