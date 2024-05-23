import React, { useState } from 'react';

const ColumnVisibilityButton = ({ columnNames, toggleColumnVisibility, columnVisibility }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" h-10 relative inline-block">
      <button
        onClick={togglePopover}
        className="flex h-full items-center px-3 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none"
      >
        Toggle Columns
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-48 mt-2 bg-gray-700 border-[1px] border-slate-400 rounded-md shadow-lg">
          <div className="px-4 py-2">
            {columnNames.map((columnName, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={!columnVisibility[index].isHidden}
                  onChange={() => toggleColumnVisibility(columnVisibility[index].accessorKey)}
                />
                <span>{columnName}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnVisibilityButton;



