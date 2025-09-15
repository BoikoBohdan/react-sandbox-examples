import React, { useReducer, type ReactNode } from 'react';
import type { CounterContextType } from './types';
import { counterReducer, initialState } from './reducer';
import { CounterContext } from './context-definition';

export const CounterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  const incrementA = () => dispatch({ type: 'INCREMENT_A' });
  const incrementB = () => dispatch({ type: 'INCREMENT_B' });

  const contextValue: CounterContextType = {
    state,
    incrementA,
    incrementB,
  };

  return (
    <CounterContext.Provider value={contextValue}>
      {children}
    </CounterContext.Provider>
  );
};

 