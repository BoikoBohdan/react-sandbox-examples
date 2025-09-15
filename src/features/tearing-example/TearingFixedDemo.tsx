import { useEffect, startTransition, useState, useSyncExternalStore } from 'react';

// External data store with proper subscription mechanism
class ExternalStore {
  private data = 1;
  private listeners = new Set<() => void>();

  getData = () => {
    return this.data;
  };

  setData = (newData: number) => {
    this.data = newData;
    this.listeners.forEach(listener => listener());
  };

  subscribe = (callback: () => void) => {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  };

  getSnapshot = () => {
    return this.data;
  };
}

const externalStore = new ExternalStore();

// Change data after 100ms to simulate external updates
setTimeout(() => externalStore.setData(2), 100);

function FixedCell() {
  // Use useSyncExternalStore to prevent tearing
  const data = useSyncExternalStore(
    externalStore.subscribe,
    externalStore.getSnapshot
  );

  // Force yielding to main thread in concurrent mode
  const start = Date.now();
  while (Date.now() - start < 50) {
    // Blocking operation to simulate work
  }
  
  return (
    <div className="p-4 border-2 border-green-500 bg-green-50 rounded-lg">
      <div className="text-sm text-green-600 mb-1">Fixed Cell</div>
      <div className="text-2xl font-bold text-green-800">{data}</div>
    </div>
  );
}

export const TearingFixedDemo = () => {
  const [showCells, setShowCells] = useState(false);

  useEffect(() => {
    startTransition(() => setShowCells(true));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Tearing Fixed with useSyncExternalStore
        </h2>
        <p className="text-sm text-gray-600">
          Same scenario but using useSyncExternalStore to prevent tearing.
          <br />
          <strong>Result:</strong> All cells always show the same consistent value
          <br />
          <strong>Solution:</strong> React ensures consistency across concurrent renders
        </p>
      </div>

      {showCells ? (
        <div className="grid grid-cols-2 gap-4">
          <FixedCell />
          <FixedCell />
          <FixedCell />
          <FixedCell />
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-lg text-gray-600">Preparing...</div>
          <div className="text-sm text-gray-500 mt-2">
            Data will change from 1 to 2 during rendering
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="text-sm text-green-800">
          <strong>How useSyncExternalStore fixes it:</strong>
          <br />• Provides a subscription mechanism for external data
          <br />• React can detect external changes during rendering
          <br />• Forces consistent snapshots across all components
          <br />• Prevents tearing by ensuring all components see the same data
        </div>
      </div>
    </div>
  );
}; 