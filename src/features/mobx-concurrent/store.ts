import { makeAutoObservable } from 'mobx';

export class CounterStore {
  value = 0;
  loading = false;

  constructor() {
    makeAutoObservable(this, {
      increment: true,
      incrementLater: true,
    });
  }

  get isEven(): boolean {
    return this.value % 2 === 0;
  }

  increment() {
    this.value++;
  }

  reset() {
    this.value = 0;
  }

  // 🚨 PROBLEMATIC: Async mutations outside React's control
  async incrementLater() {
    console.log('🚨 Increment later started');
    this.loading = true;
    
    try {
      // Simulate async delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 🚨 This mutation happens outside React's control
      // In Concurrent Mode, React may be rendering stale state when this fires
      this.value++;
      
      console.log('🚨 MobX mutation outside React control - value:', this.value);
    } finally {
      this.loading = false;
      console.log('🚨 Increment later finished');
    }
  }
}

export const counterStore = new CounterStore(); 