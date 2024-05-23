'use client'

import React, { useState } from 'react';

const ToggleVisibilityColumn = ({ columnVisibility, setColumnVisibility }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleVisibility = (columnId) => {
    setColumnVisibility(columnId);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none"
      >
        Toggle Columns
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-48 mt-2 bg-gray-700 border-[1px] border-slate-400 rounded-md shadow-lg">
          <div className="px-4 py-2">
            {columnVisibility.map((column) => (
              <label key={column.accessorKey} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={!column.isHidden}
                  onChange={() => toggleVisibility(column.accessorKey)}
                />
                <span>{column.header}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToggleVisibilityColumn;