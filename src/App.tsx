import { FibonacciDemo } from "./components/FibonacciDemo";
import { ParentSignalRerender } from "./features/preact-signals/ParentSignalRerender";
import ReactDomRender from "./features/react-dom-render";
import { ParentZustandRerender } from "./features/zustand/ParentZustandRerender";
import { ParentContextRerender } from "./features/react-context/ParentContextRerender";
import { ParentCustomStoreRerender } from "./features/custom-store/ParentCustomStoreRerender";
import { MobXConcurrentDemo } from "./features/mobx-concurrent/MobXConcurrentDemo";
import { TearingComparisonDemo } from "./features/tearing-example/TearingComparisonDemo";
import { FeatureSelector } from "./components/FeatureSelector";
import { useFeatureFilter, FeatureFilterProvider } from "./contexts/FeatureFilterContext";

const AppContent = () => {
  const { isFeatureSelected } = useFeatureFilter();

  // Component mapping
  const components = [
    {
      id: 'signals' as const,
      component: <ParentSignalRerender />,
      colSpan: 'lg:col-span-2'
    },
    {
      id: 'zustand' as const,
      component: <ParentZustandRerender />,
      colSpan: 'lg:col-span-2'
    },
    {
      id: 'react-context' as const,
      component: <ParentContextRerender />,
      colSpan: 'lg:col-span-2'
    },
    {
      id: 'custom-store' as const,
      component: <ParentCustomStoreRerender />,
      colSpan: 'lg:col-span-3'
    },
    {
      id: 'mobx-concurrent' as const,
      component: <MobXConcurrentDemo />,
      colSpan: 'lg:col-span-3'
    },
    {
      id: 'tearing-comparison' as const,
      component: <TearingComparisonDemo />,
      colSpan: 'sm:col-span-2 md:col-span-3 lg:col-span-6'
    },
    {
      id: 'fibonacci' as const,
      component: <FibonacciDemo />,
      colSpan: 'lg:col-span-3'
    },
    {
      id: 'react-dom-render' as const,
      component: <ReactDomRender />,
      colSpan: 'lg:col-span-3'
    }
  ];

  const selectedComponents = components.filter(comp => isFeatureSelected(comp.id));
  console.log(selectedComponents, components);
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-900">React Widgets Examples</h1>
          <p className="text-gray-600 mt-2">
            Project created to practice with React with different state management approaches.
            Also includes practice examples from React.
          </p>
        </div>
      </header>

      <FeatureSelector />

      <main className="max-w-7xl mx-auto p-6 pb-12">
        {selectedComponents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 auto-rows-fr">
            {selectedComponents.map((comp) => (
              <div key={comp.id} className={comp.colSpan}>
                {comp.component}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Examples Selected</h3>
            <p className="text-gray-500 mb-6">
              Choose from the available examples above to see them in action.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export const App = () => {
  return (
    <FeatureFilterProvider>
      <AppContent />
    </FeatureFilterProvider>
  );
};
