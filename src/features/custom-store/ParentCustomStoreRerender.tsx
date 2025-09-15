import { useFibonacci } from "../../hooks";
import { StoreProvider } from "./store";
import { useSelector, useStore } from "./hooks";
import { incrementA, incrementB } from "./store-utils";

const ParentCustomStoreRerenderInner = () => {
  const store = useStore();
  const totalCount = useSelector((state) => state.totalCount);

  const handleIncrementA = () => incrementA(store);
  const handleIncrementB = () => incrementB(store);

  console.log("ParentCustomStoreRerender re-render");
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Parent Re-render Example (Custom Store)
        </h2>
        <div className="text-3xl font-bold text-purple-600">{totalCount}</div>
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
        <CountA />
        <CountB />
      </div>
    </div>
  );
};

const CountA = () => {
  const countA = useSelector((state) => state.countA);
  const fibResult = useFibonacci(100000000);
  console.log("CountA re-render", fibResult);
  return (
    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className="text-sm text-gray-600 mb-1">Count A</div>
      <div className="text-2xl font-semibold text-gray-900">{countA}</div>
    </div>
  );
};

const CountB = () => {
  const countB = useSelector((state) => state.countB);
  console.log("CountB re-render");
  return (
    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className="text-sm text-gray-600 mb-1">Count B</div>
      <div className="text-2xl font-semibold text-gray-900">{countB}</div>
    </div>
  );
};

export const ParentCustomStoreRerender = () => {
  return (
    <StoreProvider>
      <ParentCustomStoreRerenderInner />
    </StoreProvider>
  );
}; 