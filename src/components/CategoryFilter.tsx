
import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { value: 'all', label: 'All News', color: 'from-gray-500 to-gray-600' },
  { value: 'technology', label: 'Technology', color: 'from-blue-500 to-cyan-500' },
  { value: 'science', label: 'Science', color: 'from-purple-500 to-indigo-500' },
  { value: 'health', label: 'Health', color: 'from-green-500 to-emerald-500' },
  { value: 'environment', label: 'Environment', color: 'from-teal-500 to-green-500' },
  { value: 'sports', label: 'Sports', color: 'from-orange-500 to-red-500' },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            selectedCategory === category.value
              ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
              : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
