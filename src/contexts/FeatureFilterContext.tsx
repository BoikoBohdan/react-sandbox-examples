import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type FeatureId = 
  | 'signals'
  | 'zustand' 
  | 'react-context'
  | 'custom-store'
  | 'mobx-concurrent'
  | 'tearing-comparison'
  | 'fibonacci'
  | 'react-dom-render';

export interface Feature {
  id: FeatureId;
  name: string;
  description: string;
  category: 'State Management' | 'Performance' | 'Concurrent Mode' | 'Other';
}

export const AVAILABLE_FEATURES: Feature[] = [
  {
    id: 'signals',
    name: 'Preact Signals',
    description: 'Re-render example with Preact Signals',
    category: 'State Management'
  },
  {
    id: 'zustand',
    name: 'Zustand',
    description: 'Re-render example with Zustand',
    category: 'State Management'
  },
  {
    id: 'react-context',
    name: 'React Context',
    description: 'Re-render example with React Context',
    category: 'State Management'
  },
  {
    id: 'custom-store',
    name: 'Custom Store',
    description: 'Re-render example with Custom Store',
    category: 'State Management'
  },
  {
    id: 'mobx-concurrent',
    name: 'MobX Concurrent',
    description: 'MobX concurrent mode issues demo',
    category: 'Concurrent Mode'
  },
  {
    id: 'tearing-comparison',
    name: 'Tearing Demo',
    description: 'Tearing comparison with useSyncExternalStore',
    category: 'Concurrent Mode'
  },
  {
    id: 'fibonacci',
    name: 'Fibonacci',
    description: 'Performance demo with heavy computation',
    category: 'Performance'
  },
  {
    id: 'react-dom-render',
    name: 'DOM Render',
    description: 'Direct DOM manipulation vs React',
    category: 'Other'
  }
];

interface FeatureFilterContextType {
  selectedFeatures: FeatureId[];
  toggleFeature: (featureId: FeatureId) => void;
  removeFeature: (featureId: FeatureId) => void;
  clearAll: () => void;
  selectAll: () => void;
  isFeatureSelected: (featureId: FeatureId) => boolean;
  getSelectedFeatures: () => Feature[];
  availableFeatures: Feature[];
}

const FeatureFilterContext = createContext<FeatureFilterContextType | undefined>(undefined);

const STORAGE_KEY = 'react-widgets-selected-features';

export function FeatureFilterProvider({ children }: { children: ReactNode }) {
  const [selectedFeatures, setSelectedFeatures] = useState<FeatureId[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSelectedFeatures(parsed);
        }
      } catch (error) {
        console.warn('Failed to parse stored features:', error);
      }
    }
  }, []);

  // Save to localStorage when selectedFeatures changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedFeatures));
  }, [selectedFeatures]);

  const toggleFeature = (featureId: FeatureId) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const removeFeature = (featureId: FeatureId) => {
    setSelectedFeatures(prev => prev.filter(id => id !== featureId));
  };

  const clearAll = () => {
    setSelectedFeatures([]);
  };

  const selectAll = () => {
    setSelectedFeatures(AVAILABLE_FEATURES.map(f => f.id));
  };

  const isFeatureSelected = (featureId: FeatureId) => {
    return selectedFeatures.includes(featureId);
  };

  const getSelectedFeatures = () => {
    return AVAILABLE_FEATURES.filter(f => selectedFeatures.includes(f.id));
  };

  const contextValue: FeatureFilterContextType = {
    selectedFeatures,
    toggleFeature,
    removeFeature,
    clearAll,
    selectAll,
    isFeatureSelected,
    getSelectedFeatures,
    availableFeatures: AVAILABLE_FEATURES
  };

  return (
    <FeatureFilterContext.Provider value={contextValue}>
      {children}
    </FeatureFilterContext.Provider>
  );
}

export function useFeatureFilter() {
  const context = useContext(FeatureFilterContext);
  if (context === undefined) {
    throw new Error('useFeatureFilter must be used within a FeatureFilterProvider');
  }
  return context;
} 