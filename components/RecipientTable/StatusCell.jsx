import React, { useState } from 'react';
import { STATUSES } from '../../constants/index';

const StatusCell = ({ getValue, row, column, table }) => {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={togglePopover} className={`${color || 'bg-transparent'} w-full h-full p-4 text-gray-900`}>
        {name}
      </button>

      <div className={`origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${isOpen ? '' : 'hidden'}`}>
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <button
            onClick={() => {
              updateData(row.index, column.id, null);
              togglePopover();
            }}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
            role="menuitem"
          >
            <div className={`w-4 h-4 mr-3 rounded-md bg-red-400`} />
            <span className="ml-2">None</span>
          </button>
          {STATUSES.map((status) => (
            <button
              key={status.id}
              onClick={() => {
                updateData(row.index, column.id, status);
                togglePopover();
              }}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
              role="menuitem"
            >
              <div className={`w-4 h-4 mr-3 rounded-md`} style={{ backgroundColor: status.color }} />
              <span className="ml-2">{status.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusCell;

// const StatusCell = ({ getValue, row, column, table }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { name, color } = getValue() || {};
//   const { updateData } = table.options.meta;

//   return (
//     <div className="relative inline-block text-left">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={`p-4 bg-${color || 'transparent'} text-gray-900`}
//       >
//         {name}
//         <div className="w-4 h-4 ml-2" />
//       </button>
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//           <div className="px-1 py-1">
//             <button
//               onClick={() => updateData(row.index, column.id, null)}
//               className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900"
//             >
//               <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
//               None
//             </button>
//             {STATUSES.map(status => (
//               <button
//                 key={status.id}
//                 onClick={() => updateData(row.index, column.id, status)}
//                 className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900"
//               >
//                 <span className={`w-3 h-3 bg-${status.color} rounded-full mr-2`}></span>
//                 {status.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StatusCell;