import { useState } from 'react';
import { STATUSES } from "@/constants";
import { FiFilter } from "react-icons/fi";

const StatusItem = ({ status, setColumnFilters, isActive }) => (
  <div
    className={`flex items-center cursor-pointer rounded-md font-bold p-1.5 text-slate-200 ${isActive ? 'bg-gray-800' : 'bg-transparent'} hover:bg-gray-800`}
    onClick={() =>
      setColumnFilters((prev) => {
        const statuses = prev.find((filter) => filter.id === 'status')?.value;
        if (!statuses) {
          return prev.concat({ id: 'status', value: [status.id] });
        }
        return prev.map((f) =>
          f.id === 'status'
            ? { ...f, value: isActive ? statuses.filter((s) => s !== status.id) : statuses.concat(status.id) }
            : f
        );
      })
    }
  >
    <div className={`w-4 h-4 mr-3 rounded-md`} style={{ backgroundColor: status.color }}></div>
    {status.name}
  </div>
);

const FilterPopover = ({ columnFilters, setColumnFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterStatuses = columnFilters.find((f) => f.id === 'status')?.value || [];

  return (
    <div className="h-10 relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-full items-center px-3 py-2 text-sm font-medium text-white bg-gray-800  hover:bg-gray-700 focus:outline-none"
      >
        <FiFilter className="w-4 h-4 mr-2" />
        Filter
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-48 mt-2 bg-gray-700 border-[1px] border-slate-400 rounded-md shadow-lg">
        {/* <div className="absolute right-0 z-10 w-48 mt-2 bg-[#2D3748] border border-gray-200 rounded-md shadow-lg"> */}
          <div className="px-4 py-2">
            <div className="mb-4 text-lg font-bold text-slate-100">Filter By:</div>
            <div className="mb-1 font-bold text-slate-400">Status</div>
            <div className="flex flex-col space-y-1">
              {STATUSES.map((status) => (
                <StatusItem
                  key={status.id}
                  status={status}
                  isActive={filterStatuses.includes(status.id)}
                  setColumnFilters={setColumnFilters}
                />
              ))}
            </div>
          </div>
          <button
            className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPopover;
