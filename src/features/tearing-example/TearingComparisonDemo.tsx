import { useEffect, startTransition, useState, useSyncExternalStore } from 'react';

// Problematic approach - direct external data access
let problematicData = 1;
function getProblematicData() {
  return problematicData;
}

// Fixed approach - external store with subscription
class ExternalStore {
  private data = 1;
  private listeners = new Set<() => void>();

  getData = () => this.data;

  setData = (newData: number) => {
    this.data = newData;
    this.listeners.forEach(listener => listener());
  };

  subscribe = (callback: () => void) => {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  };

  getSnapshot = () => this.data;
}

const externalStore = new ExternalStore();

function ProblematicCell({ index }: { index: number }) {
  // Force yielding to main thread in concurrent mode
  const start = Date.now();
  while (Date.now() - start < 30) {
    // Blocking operation
  }
  
  const data = getProblematicData();
  return (
    <div className="p-3 border-2 border-red-400 bg-red-50 rounded-lg text-center">
      <div className="text-xs text-red-600 mb-1">Cell {index}</div>
      <div className="text-xl font-bold text-red-800">{data}</div>
    </div>
  );
}

function FixedCell({ index }: { index: number }) {
  const data = useSyncExternalStore(
    externalStore.subscribe,
    externalStore.getSnapshot
  );

  // Force yielding to main thread in concurrent mode
  const start = Date.now();
  while (Date.now() - start < 30) {
    // Blocking operation
  }
  
  return (
    <div className="p-3 border-2 border-green-400 bg-green-50 rounded-lg text-center">
      <div className="text-xs text-green-600 mb-1">Cell {index}</div>
      <div className="text-xl font-bold text-green-800">{data}</div>
    </div>
  );
}

export const TearingComparisonDemo = () => {
  const [showCells, setShowCells] = useState(false);
  const [dataChangeTime, setDataChangeTime] = useState<number | null>(null);

  const triggerDemo = () => {
    // Reset data
    problematicData = 1;
    externalStore.setData(1);
    setShowCells(false);
    setDataChangeTime(null);

    // Start the demo
    setTimeout(() => {
      startTransition(() => setShowCells(true));
      
      // Change data during rendering
      setTimeout(() => {
        problematicData = 2;
        externalStore.setData(2);
        setDataChangeTime(Date.now());
      }, 80); // Change data while cells are still rendering
    }, 100);
  };

  useEffect(() => {
    triggerDemo();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Tearing Comparison Demo
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Side-by-side comparison showing tearing problem vs. useSyncExternalStore solution
        </p>
        <button
          onClick={triggerDemo}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Restart Demo
        </button>
        {dataChangeTime && (
          <div className="text-xs text-orange-600 mt-2">
            Data changed at: {new Date(dataChangeTime).toLocaleTimeString()}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Problematic Version */}
        <div>
          <h3 className="text-lg font-semibold text-red-700 mb-4 text-center">
            ❌ Problematic (Direct Access)
          </h3>
          {showCells ? (
            <div className="grid grid-cols-2 gap-3">
              <ProblematicCell index={1} />
              <ProblematicCell index={2} />
              <ProblematicCell index={3} />
              <ProblematicCell index={4} />
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">Preparing...</div>
          )}
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="text-xs text-red-700">
              <strong>Problem:</strong> Cells may show different values (1 or 2) 
              because external data changes during concurrent rendering.
            </div>
          </div>
        </div>

        {/* Fixed Version */}
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-4 text-center">
            ✅ Fixed (useSyncExternalStore)
          </h3>
          {showCells ? (
            <div className="grid grid-cols-2 gap-3">
              <FixedCell index={1} />
              <FixedCell index={2} />
              <FixedCell index={3} />
              <FixedCell index={4} />
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">Preparing...</div>
          )}
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-xs text-green-700">
              <strong>Solution:</strong> All cells always show the same consistent value
              because useSyncExternalStore prevents tearing.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm text-blue-800">
          <strong>Key Differences:</strong>
          <br />• <strong>Left (Red):</strong> Direct external data access - prone to tearing in concurrent mode
          <br />• <strong>Right (Green):</strong> useSyncExternalStore - prevents tearing by ensuring consistency
          <br />• <strong>Test:</strong> Click "Restart Demo" multiple times to see the difference
        </div>
      </div>
    </div>
  );
}; 