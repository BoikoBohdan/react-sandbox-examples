import {counterStore} from "./store";
import {useMobxReaction} from "./useMobxReaction";

const ShowValueProblematic = () => {
  const value = useMobxReaction(() => counterStore.value);

  if (value % 2 === 0) {
    console.log("🔴 MobX Manual: Blocking render for 500ms...");
    const start = Date.now();
    while (Date.now() - start < 500) {
      // Blocking operation - bad for concurrent mode
    }
    console.log("✅ MobX Manual: Render unblocked");
  }

  return (
    <div className="p-4 bg-red-50 rounded-xl border border-red-200">
      <div className="text-sm text-red-600 mb-1">
        Problem Component (Manual MobX Subscription)
      </div>
      <div className="text-2xl font-semibold text-red-900">Count: {value}</div>
    </div>
  );
};

const ShowParityProblematic = () => {
  const isEven = useMobxReaction(() => counterStore.isEven);
  return (
    <div className="p-4 bg-red-50 rounded-xl border border-red-200">
      <div className="text-sm text-red-600 mb-1">
        Problem Component (Manual MobX Subscription)
      </div>
      <div className="text-2xl font-semibold text-red-900">
        Is Even: {isEven ? "Yes" : "No"}
      </div>
    </div>
  );
};

export {ShowValueProblematic, ShowParityProblematic};
