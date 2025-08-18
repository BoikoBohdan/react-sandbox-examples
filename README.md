# React + TypeScript + Vite

This project demonstrates different state management approaches and React rendering behaviors. It includes examples of:
- State management with @preact/signals-react and Zustand
- React Virtual DOM and direct DOM manipulation implications
- Performance comparisons and best practices

## Features Documentation

### State Management
- [**@preact/signals-react**](./src/features/preact-signals/README.md): Modern approach with granular updates and optimal re-rendering
- [**Zustand**](./src/features/zustand/README.md): Traditional state management with optimization techniques

### React DOM Handling
- [**DOM Rendering Demo**](./src/features/react-dom-render/README.md): Demonstrates Virtual DOM behavior and potential issues with direct DOM manipulation

## Re-renders Demo
![DEMO](./assets/re-render-demo.mov)

## Performance Example: Heavy Computation
The project includes a performance demonstration using a computationally intensive Fibonacci calculation that takes approximately 3 seconds to complete. This example showcases how different state management approaches handle expensive computations:

- **With Signals**: The heavy computation is not re-triggered when unrelated state changes occur
- **With Traditional State**: The computation is re-run on every re-render, causing performance issues
- **Real Impact**: You can observe a 3-second delay in traditional state management vs instant updates with signals

For detailed documentation about each feature, please visit the respective README files in the feature directories.
