## Tearing Example - React Concurrent Mode

### What is Tearing?

**Tearing** is a visual inconsistency that occurs when different parts of your UI show different values for the same piece of external data during a single render. This happens when:

1. External data changes during React's concurrent rendering process
2. Some components read the old value, others read the new value
3. The UI becomes inconsistent, showing multiple states simultaneously

### Why Does Tearing Happen?

In React's Concurrent Mode:
- Rendering can be **interrupted** and **resumed**
- Components may render at **different times**
- External data can **change between** component renders
- React has **no way to detect** external data changes during rendering

### The Problem Demonstrated

```typescript
// ❌ PROBLEMATIC: Direct external data access
let data = 1;
function getData() {
  return data;
}

setTimeout(() => data = 2, 100); // Changes during rendering

function ProblematicCell() {
  // This may read different values in different components
  const currentData = getData();
  return <div>{currentData}</div>;
}
```

**Issues:**
- No subscription mechanism for React to track changes
- External data mutations happen outside React's control
- Concurrent rendering can see inconsistent data snapshots
- Results in visual tearing (some cells show 1, others show 2)

### The Solution: useSyncExternalStore

```typescript
// ✅ SOLUTION: Proper external store with subscription
class ExternalStore {
  private data = 1;
  private listeners = new Set<() => void>();

  subscribe = (callback: () => void) => {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  };

  getSnapshot = () => this.data;

  setData = (newData: number) => {
    this.data = newData;
    this.listeners.forEach(listener => listener());
  };
}

function FixedCell() {
  // This ensures consistent data across all components
  const data = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot
  );
  return <div>{data}</div>;
}
```

### How useSyncExternalStore Works

#### 1. **Subscription Mechanism**
```typescript
const unsubscribe = store.subscribe(callback);
```
- React subscribes to external data changes
- Gets notified when data updates
- Can coordinate updates across components

#### 2. **Snapshot Function**
```typescript
const snapshot = store.getSnapshot();
```
- Provides current data value
- Called during rendering to get consistent snapshots
- Ensures all components see the same data

#### 3. **Consistency Guarantee**
- React detects when external data changes during rendering
- Forces re-render with consistent data across all components
- Prevents tearing by ensuring atomic updates

### Demo Components

#### TearingDemo
- Shows the **problematic approach** with direct external data access
- Demonstrates how tearing occurs in concurrent mode
- External data changes from 1 to 2 during rendering

#### TearingFixedDemo
- Shows the **correct approach** using `useSyncExternalStore`
- Prevents tearing by ensuring data consistency
- Same timing but with proper subscription mechanism

#### TearingComparisonDemo
- **Side-by-side comparison** of both approaches
- Interactive demo you can restart multiple times
- Clearly shows the difference in behavior

### Real-World Applications

#### When to Use useSyncExternalStore:

1. **External State Libraries**
   - Redux stores
   - Zustand stores
   - MobX observables
   - Custom state managers

2. **Browser APIs**
   - `window.matchMedia()` for responsive design
   - `navigator.onLine` for network status
   - `localStorage` / `sessionStorage`
   - WebSocket connections

3. **Third-Party Libraries**
   - Libraries that manage state outside React
   - Real-time data subscriptions
   - External event emitters

#### Example: Window Size Tracking
```typescript
function useWindowSize() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    () => ({ width: window.innerWidth, height: window.innerHeight }),
    () => ({ width: 0, height: 0 }) // Server-side snapshot
  );
}
```

### Best Practices

#### 1. **Always Use Subscriptions**
- Never directly access external mutable data in components
- Always provide a way for React to detect changes
- Use `useSyncExternalStore` for external data sources

#### 2. **Immutable Snapshots**
- Snapshot function should return immutable data
- Don't mutate the returned snapshot object
- Ensure referential equality for unchanged data

#### 3. **Proper Cleanup**
- Always return an unsubscribe function
- Clean up event listeners and subscriptions
- Prevent memory leaks

#### 4. **Server-Side Rendering**
- Provide a server-side snapshot function (3rd parameter)
- Handle cases where external APIs aren't available on server
- Ensure hydration consistency

### Performance Considerations

#### Benefits:
- **Prevents Unnecessary Re-renders**: Only updates when external data actually changes
- **Consistent UI**: Eliminates visual glitches from tearing
- **Concurrent Mode Compatible**: Works properly with React 18+ features

#### Trade-offs:
- **Slightly More Complex**: Requires proper store implementation
- **Memory Overhead**: Subscription mechanism adds some overhead
- **Learning Curve**: Developers need to understand external store patterns

### Common Pitfalls

#### 1. **Forgetting Subscriptions**
```typescript
// ❌ Wrong: No subscription
const data = externalStore.getData();

// ✅ Correct: With subscription
const data = useSyncExternalStore(
  externalStore.subscribe,
  externalStore.getSnapshot
);
```

#### 2. **Mutable Snapshots**
```typescript
// ❌ Wrong: Mutable object
getSnapshot: () => mutableObject,

// ✅ Correct: Immutable snapshot
getSnapshot: () => ({ ...mutableObject }),
```

#### 3. **Missing Cleanup**
```typescript
// ❌ Wrong: No cleanup
subscribe: (callback) => {
  addEventListener('change', callback);
  // Missing return cleanup function
}

// ✅ Correct: Proper cleanup
subscribe: (callback) => {
  addEventListener('change', callback);
  return () => removeEventListener('change', callback);
}
```

### Conclusion

`useSyncExternalStore` is essential for:
- **Preventing tearing** in concurrent React applications
- **Safely integrating** external state with React
- **Ensuring consistency** across component trees
- **Future-proofing** apps for React's concurrent features

Always use it when accessing mutable external data sources in React components! 