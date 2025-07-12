import React from "react";

const FilterTags = ({ tags, selectedTag, setSelectedTag }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag, index) => (
        <button
          key={index}
          onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
          className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
            selectedTag === tag
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default FilterTags;
