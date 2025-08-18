import { create } from 'zustand'

interface CounterState {
  countA: number
  countB: number
  totalCount: number
  incrementA: () => void
  incrementB: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  countA: 0,
  countB: 0,
  totalCount: 0,
  incrementA: () => set((state) => {
    const newCountA = state.countA + 1
    return {
      countA: newCountA,
      totalCount: newCountA + state.countB
    }
  }),
  incrementB: () => set((state) => {
    const newCountB = state.countB + 1
    return {
      countB: newCountB,
      totalCount: state.countA + newCountB
    }
  })
})) 