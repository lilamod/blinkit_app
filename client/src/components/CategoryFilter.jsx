import { Filter } from 'lucide-react';

export default function CategoryFilter({ categories, selectedCategory, onSelect }) {
  // Ensure categories is always an array
  const categoryList = Array.isArray(categories) ? categories : [];

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Filter size={20} className="text-blinkit-500" />
        <h3 className="font-semibold text-gray-700">Categories</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selectedCategory === ''
              ? 'bg-blinkit-500 text-white'
              : 'bg-white text-gray-700 hover:bg-blinkit-100'
          }`}
        >
          All
        </button>
        {categoryList.length > 0 ? (
          categoryList.map((category) => (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === category
                  ? 'bg-blinkit-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-blinkit-100'
              }`}
            >
              {category}
            </button>
          ))
        ) : (
          <p className="text-sm text-gray-500">Loading categories...</p>
        )}
      </div>
    </div>
  );
}