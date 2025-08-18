import {computed, signal} from "@preact/signals-react";

export const childASignal = signal({count: signal(0)});
export const childBSignal = signal({count: signal(0)});
export const parentSignal = computed(
  () => childASignal.value.count.value + childBSignal.value.count.value
);
