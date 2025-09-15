import type { CounterState, CounterAction } from './types';

export const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'INCREMENT_A': {
      const newCountA = state.countA + 1;
      return {
        ...state,
        countA: newCountA,
        totalCount: newCountA + state.countB,
      };
    }
    case 'INCREMENT_B': {
      const newCountB = state.countB + 1;
      return {
        ...state,
        countB: newCountB,
        totalCount: state.countA + newCountB,
      };
    }
    default:
      return state;
  }
};

export const initialState: CounterState = {
  countA: 0,
  countB: 0,
  totalCount: 0,
}; 