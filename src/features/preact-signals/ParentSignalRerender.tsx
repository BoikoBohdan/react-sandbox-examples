import {Signal} from "@preact/signals-react";
import { useFibonacci } from "../../hooks";
import { childASignal, childBSignal, parentSignal } from "./signals";

export const ParentSignalRerender = () => {
  const handleIncrementA = () => {
    childASignal.value.count.value++;
  };
  const handleIncrementB = () => {
    childBSignal.value.count.value++;
  };

  console.log("ParentSignalRerender re-render");
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Parent Re-render Example (Signals)
        </h2>
        <div className="text-3xl font-bold text-purple-600">{parentSignal}</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={handleIncrementA}
          className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
        >
          Increment A
        </button>
        <button
          onClick={handleIncrementB}
          className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
        >
          Increment B
        </button>
      </div>

      <div className="space-y-4">
        <CountA firstValue={childASignal} />
        <CountB secondValue={childBSignal} />
      </div>
    </div>
  );
};

const CountA = ({firstValue}: {firstValue: Signal<{count: Signal<number>}>}) => {
  const fibResult = useFibonacci(100000000);
  console.log("CountA re-render", fibResult);
  return (
    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className="text-sm text-gray-600 mb-1">Count A</div>
      <div className="text-2xl font-semibold text-gray-900">{firstValue.value.count}</div>
    </div>
  );
};

const CountB = ({secondValue}: {secondValue: Signal<{count: Signal<number>}>}) => {
  console.log("CountB re-render");
  return (
    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className="text-sm text-gray-600 mb-1">Count B1</div>
      <div className="text-2xl font-semibold text-gray-900">{secondValue.value.count}</div>
    </div>
  );
};
