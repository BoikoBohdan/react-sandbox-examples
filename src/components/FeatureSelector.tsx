import {useState} from "react";
import {
  useFeatureFilter,
  type Feature,
  type FeatureId,
} from "../contexts/FeatureFilterContext";

const CATEGORY_COLORS = {
  "State Management": "bg-blue-100 text-blue-800 border-blue-200",
  Performance: "bg-green-100 text-green-800 border-green-200",
  "Concurrent Mode": "bg-purple-100 text-purple-800 border-purple-200",
  Other: "bg-gray-100 text-gray-800 border-gray-200",
};

export function FeatureSelector() {
  const {
    selectedFeatures,
    toggleFeature,
    clearAll,
    selectAll,
    isFeatureSelected,
    availableFeatures,
  } = useFeatureFilter();

  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(availableFeatures.map((f) => f.category))),
  ];

  const filteredFeatures =
    filterCategory === "All"
      ? availableFeatures
      : availableFeatures.filter((f) => f.category === filterCategory);



  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col space-y-6">
          {/* Header with controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Select Examples to Show
              </h3>
              <span className="text-sm text-gray-500">
                ({selectedFeatures.length} selected)
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={selectAll}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Select All
              </button>
              <button
                onClick={clearAll}
                className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">
              Filter by Category:
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredFeatures.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                isSelected={isFeatureSelected(feature.id)}
                onToggle={toggleFeature}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  feature: Feature;
  isSelected: boolean;
  onToggle: (featureId: FeatureId) => void;
}

function FeatureCard({feature, isSelected, onToggle}: FeatureCardProps) {
  return (
    <div
      onClick={() => onToggle(feature.id)}
      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-200"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {/* Selection indicator */}
      <div className="absolute top-3 right-3">
        {isSelected ? (
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : (
          <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
        )}
      </div>

      {/* Category badge */}
      <div className="mb-3">
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${
            CATEGORY_COLORS[feature.category]
          }`}
        >
          {feature.category}
        </span>
      </div>

      {/* Feature info */}
      <div className="pr-8">
        <h4 className="font-semibold text-gray-900 mb-2">{feature.name}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Hover effect overlay */}
      <div
        className={`absolute inset-0 rounded-lg transition-opacity ${
          isSelected
            ? "bg-blue-500 opacity-5"
            : "bg-gray-500 opacity-0 hover:opacity-5"
        }`}
      ></div>
    </div>
  );
}


