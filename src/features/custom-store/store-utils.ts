export type Store<T> = {
  state: T;
  listeners: Set<() => void>;
};

export function createStore<T>(initial: T): Store<T> {
  return { state: initial, listeners: new Set() };
}

export interface CounterState {
  countA: number;
  countB: number;
  totalCount: number;
}

// Store update functions
export function incrementA(store: Store<CounterState>) {
  const newCountA = store.state.countA + 1;
  store.state = { 
    ...store.state, 
    countA: newCountA,
    totalCount: newCountA + store.state.countB
  };
  store.listeners.forEach((l) => l());
}

export function incrementB(store: Store<CounterState>) {
  const newCountB = store.state.countB + 1;
  store.state = { 
    ...store.state, 
    countB: newCountB,
    totalCount: store.state.countA + newCountB
  };
  store.listeners.forEach((l) => l());
} 