## @preact/signals-react
Arguably one of the most differentiated performance features of signals is the ability to pass a signal value directly into JSX and have it rendered as text in the DOM without the need to re-render the containing component. This can have a tremendous performance benefit as any children of the component that is being updated will not re-render.

### Key Features:
- **Granular Updates**: Updates DOM nodes directly without triggering full component re-renders
- **Performance Optimization**: Ideal for applications with frequent state changes (e.g., dashboards, real-time apps)
- **Flexible Scope**: Supports both global and component-scoped signals
  - Global signals: Shared state across multiple components
  - Scoped signals: Local state as an alternative to useState

### Use Cases:
- Real-time dashboards
- Collaborative tools
- Applications with complex state interactions
- Performance-critical UI components

### Performance Example: Heavy Computation
The demo includes a computationally intensive Fibonacci calculation that takes approximately 3 seconds to complete. This example showcases how:

- **With Signals**: The heavy computation is not re-triggered when unrelated state changes occur
- **Real Impact**: You can observe instant updates without affecting other components 