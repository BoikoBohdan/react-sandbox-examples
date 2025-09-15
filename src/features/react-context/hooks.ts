import { useContext } from 'react';
import { CounterContext } from './context-definition';

export const useCounterContext = () => {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error('useCounterContext must be used within a CounterProvider');
  }
  return context;
}; 