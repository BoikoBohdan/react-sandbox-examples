## MobX Concurrent Mode Issues Demo

### Overview:
This demo illustrates potential problems when manually subscribing to MobX observables instead of using `mobx-react-lite`. It shows how bypassing MobX's React integration can cause concurrent mode issues similar to manual signal subscriptions.

### The Core Problem:

#### Manual MobX Subscription Issues:
```typescript
// 🚨 PROBLEMATIC: Manual MobX subscription (bypasses mobx-react-lite)
useEffect(() => {
  const disposer = store.observe(() => {
    setTick(t => t + 1); // Force re-render
  });
  return disposer;
}, []);
```

#### Why Manual Subscriptions Cause Concurrent Mode Issues:

1. **Bypasses mobx-react-lite**: Manual subscriptions skip MobX's React integration optimizations
2. **Immediate Re-renders**: Force re-renders that can't be scheduled or interrupted by React
3. **No Batching**: Each MobX change triggers a separate render cycle
4. **Concurrent Conflicts**: Manual re-renders interfere with React's time-slicing and priority system

### Concurrent Mode Features Affected:

#### Time Slicing Issues:
- **Problem**: MobX mutations during time-sliced renders can cause inconsistent UI
- **Impact**: Components may show different values mid-render
- **Symptom**: UI flickering or temporary inconsistent states

#### Automatic Batching Problems:
- **Problem**: MobX triggers immediate re-renders that bypass React's batching
- **Impact**: Multiple rapid mutations cause excessive render cycles
- **Symptom**: Performance degradation and choppy animations

#### Transition Priority Conflicts:
- **Problem**: MobX mutations are always high-priority, ignoring `startTransition`
- **Impact**: Low-priority updates get interrupted by MobX changes
- **Symptom**: Smooth transitions become janky

#### Suspense Boundary Issues:
- **Problem**: MobX mutations can trigger during Suspense fallback states
- **Impact**: Inconsistent loading states and error boundaries
- **Symptom**: Loading states that flicker or don't display correctly

### Demonstrated Problems:

#### 1. Async Actions Outside React Control:
```typescript
// 🚨 PROBLEMATIC
async incrementLater() {
  this.loading = true;
  await new Promise(resolve => setTimeout(resolve, 100));
  this.value++; // Uncontrolled mutation
}
```

**Issues:**
- Mutations fire outside React's render cycle
- No coordination with concurrent rendering
- Can cause stale state during interruptions

#### 2. Rapid Uncontrolled Mutations:
```typescript
// 🚨 PROBLEMATIC  
rapidIncrements() {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => this.value++, i * 50);
  }
}
```

**Issues:**
- Bypasses React's batching mechanisms
- Can overwhelm concurrent rendering
- Causes unnecessary re-render cycles

#### 3. Blocking Renders with State Checks:
```typescript
// 🚨 PROBLEMATIC
simulateBlockingRender() {
  if (this.value === 0) {
    // 500ms blocking operation
    while (Date.now() - start < 500) {}
  }
}
```

**Issues:**
- Blocks main thread during renders
- Prevents React from interrupting work
- Causes unresponsive UI

### Better Patterns:

#### 1. Use mobx-react-lite (Recommended):
```typescript
// ✅ BEST: Use mobx-react-lite observer
import { observer } from 'mobx-react-lite';

const OptimizedComponent = observer(() => {
  return <div>Count: {store.value}</div>;
});
```

#### 2. Manual React State Sync (If needed):
```typescript
// ✅ BETTER: Sync React state manually when needed
useEffect(() => {
  setValue(store.value);
}, [store.value]);
```

#### 3. Avoid Blocking Operations:
```typescript
// ✅ BETTER
useEffect(() => {
  if (store.value === 0) {
    // Use async operations instead of blocking
    setTimeout(() => {
      // Non-blocking work
    }, 0);
  }
}, [store.value]);
```

### Demo Components:

#### ProblemComponent:
- Direct MobX observer with blocking operations
- Shows automatic reactivity issues
- Demonstrates uncontrolled re-renders
- Includes 500ms blocking simulation

#### OptimizedComponent:  
- Combines MobX with React Transitions
- Shows better concurrent integration
- Demonstrates controlled updates
- Uses `startTransition` for smoother UX

### Test Scenarios:

1. **Async Mutation Test**:
   - Click "Async (Bad)" vs "Async (Safe)"
   - Compare console timing logs
   - Notice different behavior during concurrent rendering

2. **Rapid Updates Test**:
   - Click "Rapid +10"
   - Watch console for render frequency
   - Observe UI responsiveness differences

3. **Blocking Render Test**:
   - Click "Reset (Blocks!)"
   - Experience 500ms UI freeze
   - See how it affects other interactions

4. **Concurrent Priority Test**:
   - Use "Concurrent Reset" during other operations
   - Notice how MobX ignores transition priorities
   - Compare with React state updates

### Performance Implications:

#### Memory Leaks:
- MobX subscriptions can outlive React components
- Automatic reactivity may prevent garbage collection
- Need proper cleanup in useEffect

#### Render Optimization:
- MobX bypasses React.memo optimizations
- Automatic re-renders ignore dependency arrays  
- Can cause over-rendering of child components

#### Bundle Size:
- MobX adds significant runtime overhead
- Automatic reactivity system increases complexity
- May not be worth it for simple state needs

### Best Practices for MobX + Concurrent React:

1. **Wrap Async Mutations**: Always use `runInAction` for async operations
2. **Coordinate with Transitions**: Use `startTransition` for non-urgent updates
3. **Avoid Blocking Operations**: Never block the main thread in renders
4. **Test Concurrent Features**: Always test with React's concurrent features enabled
5. **Consider Alternatives**: Evaluate if simpler state solutions would work
6. **Profile Performance**: Monitor render frequency and timing
7. **Proper Cleanup**: Ensure MobX subscriptions are properly disposed

### When to Avoid MobX:

- Simple state that doesn't need automatic reactivity
- Applications heavily using React's concurrent features
- Performance-critical applications with frequent updates
- Teams unfamiliar with MobX's mental model
- When you need fine-grained control over re-renders

### Conclusion:

While MobX provides powerful automatic reactivity, it can conflict with React's concurrent rendering model. The automatic nature of MobX mutations can bypass React's scheduling and optimization systems, leading to performance issues and inconsistent behavior. Consider these trade-offs carefully when choosing MobX for concurrent React applications. 