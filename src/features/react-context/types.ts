export interface CounterState {
  countA: number;
  countB: number;
  totalCount: number;
}

export type CounterAction =
  | { type: 'INCREMENT_A' }
  | { type: 'INCREMENT_B' };

export interface CounterContextType {
  state: CounterState;
  incrementA: () => void;
  incrementB: () => void;
} 