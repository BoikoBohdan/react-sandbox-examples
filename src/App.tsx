import { FibonacciDemo } from "./components/FibonacciDemo";
import { ParentSignalRerender } from "./features/preact-signals/ParentSignalRerender";
import ReactDomRender from "./features/react-dom-render";
import { ParentZustandRerender } from "./features/zustand/ParentZustandRerender";

export const App = () => {
  return (
    <div className="min-h-screen relative">
      <header className="w-full border-b">
        <div className="max-w-5xl mx-auto p-4">
          <h1 className="text-2xl font-semibold">React widgets examples</h1>
          <p className="text-sm text-gray-600">
            Project created to practice with React with different state management approaches.
            Also it includes practice examples from react
          </p>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-4">
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          <ParentSignalRerender />
          <ParentZustandRerender />
          <FibonacciDemo />
          <ReactDomRender />
        </div>
      </main>
    </div>
  );
};
