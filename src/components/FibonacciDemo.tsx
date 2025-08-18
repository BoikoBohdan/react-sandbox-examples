import { useState } from 'react';
import { useFibonacci } from '../hooks';

export const FibonacciDemo = () => {
  const [number, setNumber] = useState<number>(10);
  const fibResult = useFibonacci(number);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Fibonacci Calculator
        </h2>
        <div className="flex gap-4 items-center">
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            min="0"
          />
          <span className="text-gray-600">→</span>
          <div className="text-2xl font-bold text-purple-600">
            {fibResult}
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <p>This component demonstrates:</p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>Efficient Fibonacci calculation</li>
          <li>Result memoization</li>
          <li>Input validation</li>
          <li>Real-time updates</li>
        </ul>
      </div>
    </div>
  );
}; 