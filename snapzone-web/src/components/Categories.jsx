import React from "react";

const Categories = ({ onCategorySelect }) => {
  const categories = [
    "Frames",
    "Magic Mirror Frame",
    "Bouquets",
    "Polaroid",
    "Customized Chocolate Wrappers",
  ];

  return (
    <div className="categories-container flex flex-wrap justify-center gap-4 mt-4">
      {categories.map((category, index) => (
        <button
        key={index}
        className="category-btn px-6 py-3 bg-white border border-gray-300 rounded-md shadow-md text-gray-700 font-semibold hover:bg-gray-200 transition-all"
        onClick={() => onCategorySelect(category)}
      >
        {category} {/* This was missing */}
      </button>
      ))}
    </div>
  );
};

export default Categories;
