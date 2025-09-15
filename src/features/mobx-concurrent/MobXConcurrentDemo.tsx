import {useState, useTransition} from "react";
import {counterStore} from "./store";
import {
  ShowParityProblematic,
  ShowValueProblematic,
} from "./ProblematicComponents";

export const MobXConcurrentDemo = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          MobX Concurrent Mode Issues
        </h2>
      </div>

      <MobxStateControllers />

      <div className="space-y-4">
        <ShowValueProblematic />
        <ShowParityProblematic />
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="text-xs text-yellow-800">
          <strong>MobX Concurrent Issues:</strong>
          <br />• "Sync" - synchronous increment
          <br />• "Async + Transition" - mutations outside React control with
          transition
          <br />
          Click many times "Async + Transition" button to see the issue
          <br />
          React will time to time show old value, since it's rendering in the
          middle of the async operation
        </div>
      </div>
    </div>
  );
};

const MobxStateControllers = () => {
  const [showAnimate, setShowAnimate] = useState(false);
  const [, startTransition] = useTransition();

  const handleIncrement = () => {
    counterStore.increment();
  };

  const handleAsyncIncrementWithTransition = () => {
    startTransition(() => {
      setShowAnimate(true);
      // 🚨 Trigger MobX update during concurrent render
      counterStore.incrementLater().catch(console.error).finally(() => {
        setShowAnimate(false);
      });
    });
  };
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 mb-6">
        <button
          onClick={handleIncrement}
          className="px-2 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm"
        >
          +1 Sync
        </button>
        <button
          onClick={handleAsyncIncrementWithTransition}
          className="px-2 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors text-sm"
          title="Problematic: mutation outside React control"
        >
          +1 Async + Transition
        </button>
      </div>
      {showAnimate && <ShowAnimate />}
    </div>
  );
};

const ShowAnimate = () => {
  return (
    <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 mt-4">
      <div className="flex items-center justify-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent"></div>
        <div className="text-sm text-purple-600 font-medium">
          Transition pending...
        </div>
      </div>

      <div className="mt-3 flex justify-center space-x-1">
        <div
          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
          style={{animationDelay: "0ms"}}
        ></div>
        <div
          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
          style={{animationDelay: "150ms"}}
        ></div>
        <div
          className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
          style={{animationDelay: "300ms"}}
        ></div>
      </div>

      <div className="mt-3 relative overflow-hidden">
        <div className="h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60 animate-pulse"></div>
      </div>

      <div className="mt-2 text-xs text-center text-gray-500">
        <span className="animate-pulse">
          React is working on concurrent updates...
        </span>
      </div>
    </div>
  );
};
