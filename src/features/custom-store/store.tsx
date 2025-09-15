import { createContext, useRef, type ReactNode } from 'react';
import { createStore, type Store, type CounterState } from './store-utils';

export const StoreContext = createContext<Store<CounterState> | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef(createStore<CounterState>({ 
    countA: 0, 
    countB: 0, 
    totalCount: 0 
  }));
  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
} 