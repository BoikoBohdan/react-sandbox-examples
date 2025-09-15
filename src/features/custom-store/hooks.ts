import { useContext, useEffect, useReducer } from 'react';
import { StoreContext } from './store';
import type { CounterState } from './store-utils';

export function useSelector<S>(selector: (s: CounterState) => S): S {
  const store = useContext(StoreContext)!;
  const [, forceUpdate] = useReducer((c: number) => c + 1, 0);

  const selected = selector(store.state);

  useEffect(() => {
    const callback = () => forceUpdate();
    store.listeners.add(callback);
    return () => {
      store.listeners.delete(callback);
    };
  }, [store]);

  return selected;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
} 