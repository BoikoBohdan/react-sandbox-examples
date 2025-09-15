import { useEffect, startTransition, useState } from 'react';

// External data source - not managed by React
let data = 1;
function getData() {
  return data;
}

// Change data after 100ms to simulate external updates
setTimeout(() => data = 2, 100);

function ProblematicCell() {
  // Force yielding to main thread in concurrent mode
  const start = Date.now();
  while (Date.now() - start < 50) {
    // Blocking operation to simulate work
  }
  
  const currentData = getData();
  return (
    <div className="p-4 border-2 border-red-500 bg-red-50 rounded-lg">
      <div className="text-sm text-red-600 mb-1">Problematic Cell</div>
      <div className="text-2xl font-bold text-red-800">{currentData}</div>
    </div>
  );
}

export const TearingDemo = () => {
  const [showCells, setShowCells] = useState(false);

  useEffect(() => {
    startTransition(() => setShowCells(true));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Tearing Example (Problematic)
        </h2>
        <p className="text-sm text-gray-600">
          Multiple cells rendering same external data which changes during rendering.
          <br />
          <strong>Expected:</strong> All cells show the same value
          <br />
          <strong>Problem:</strong> Cells may show different values due to tearing
        </p>
      </div>

      {showCells ? (
        <div className="grid grid-cols-2 gap-4">
          <ProblematicCell />
          <ProblematicCell />
          <ProblematicCell />
          <ProblematicCell />
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-lg text-gray-600">Preparing...</div>
          <div className="text-sm text-gray-500 mt-2">
            Data will change from 1 to 2 during rendering
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="text-sm text-yellow-800">
          <strong>What's happening:</strong>
          <br />• External data changes from 1 to 2 after 100ms
          <br />• Each cell takes 50ms to render (blocking)
          <br />• In concurrent mode, some cells may see old data, others new data
          <br />• This creates "tearing" - inconsistent UI state
        </div>
      </div>
    </div>
  );
}; 