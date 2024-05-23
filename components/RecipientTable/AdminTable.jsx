'use client';

import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { TbArrowsSort } from "react-icons/tb";
import React, { useEffect, useState } from 'react';
import Filters from './Filters';
import EditableCell from './EditableCell';
import StatusCell from './StatusCell';
import ColumnVisibilityButton from './ColumnVisibilityButton';

const AdminTable = ({ recipients }) => {
  // console.log("datos en admintable", recipients);

  const columns = [
    // {
    //   header: 'Nombre Completo',
    //   accessorFn: row => `${row.firstName} ${row.lastName}`
    // },
    {
      accessorKey: 'firstName',
      header: 'Nombre',
      cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
    },
    {
      accessorKey: 'lastName',
      header: 'Apellido',
      cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
    },
    {
      accessorKey: 'birthDate',
      header: 'Fecha de Nacimiento',
      cell: (props) => <p className='text-slate-400 p-2'>{new Date(props.getValue()).toLocaleDateString()}</p>
    },
    {
      accessorKey: 'dni',
      header: 'DNI',
      cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
    },
    {
      accessorKey: 'phone',
      header: 'Teléfono',
      cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
    },
    {
      accessorKey: 'sex',
      header: 'Sexo',
      cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
    },
    {
      accessorKey: 'enrollmentDate',
      header: 'Fecha de Registro',
      cell: (props) => <p className='text-slate-400 p-2'>{new Date(props.getValue()).toLocaleDateString()}</p>
    },
    {
      accessorKey: 'localityId',
      header: 'ID de Localidad',
      cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
    },
    {
      accessorKey: 'streetId',
      header: 'ID de Calle',
      cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
    },
    {
      accessorKey: 'streetNumber',
      header: 'Número de Calle',
      cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
    },
    {
      accessorKey: 'familyGroupId',
      header: 'ID de Grupo Familiar',
      cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
    }
    // {
    //   accessorKey: 'status',
    //   header: 'STATUS',
    //   cell: StatusCell,
    //   enableSorting: false,
    //   enableColumnFilter: true,
    //   filterFn: (row, columnId, filterStatuses) => {
    //     if (filterStatuses.length === 0) return true;
    //     const status = row.getValue(columnId);
    //     return filterStatuses.includes(status?.id)
    //   }
    // },
  ];

  const [data, setData] = useState(recipients);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState(columns.map(column => ({
    accessorKey: column.accessorKey,
    isHidden: false
  })));

  useEffect(() => {
    setData(recipients);
  }, [recipients]);

  const toggleColumnVisibility = (columnId) => {
    setColumnVisibility(prevVisibility => prevVisibility.map(column => {
      if (column.accessorKey === columnId) {
        return {
          ...column,
          isHidden: !column.isHidden
        };
      }
      return column;
    }));
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      columnVisibility: columnVisibility.reduce((acc, curr) => {
        acc[curr.accessorKey] = !curr.isHidden;
        return acc;
      }, {})
    },
    // state: {
    //   columnFilters,
    // },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex, columnId, value) => setData((prev) =>
        prev.map((row, index) =>
          index === rowIndex
            ? { ...prev[rowIndex], [columnId]: value }
            : row
        )
      )
    },
  });


  return (
    <>
      <div className='flex items-center gap-2'>
      <Filters 
        columnFilters={columnFilters} 
        setColumnFilters={setColumnFilters} 
        columnVisibility={columnVisibility} 
        columnNames={columns.map(column => column.header)} 
        toggleColumnVisibility={toggleColumnVisibility} 
      />
      {/* <ColumnVisibilityButton columnVisibility={columnVisibility} columnNames={columns.map(column => column.header)} toggleColumnVisibility={toggleColumnVisibility} />  */}
      </div>
      <table className=' '>
        <thead>
          {
            table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className='bg-slate-900'>
                {
                  headerGroup.headers.map(header => (
                    <th 
                      key={header.id} 
                      className='text-slate-300 p-2 bg-slate-800'
                      style={{ width: header.getSize() }}
                    >
                      <div className='flex items-center justify-center'>
                        <span className='text-sm'>{header.column.columnDef.header}</span>
                        {header.column.getCanSort() && (
                          <button className='align-middle m-2' onClick={header.column.getToggleSortingHandler()}>
                            <TbArrowsSort />
                          </button>
                        )}
                      {
                        {
                          asc: "↑",
                          desc: "↓",
                        }[header.column.getIsSorted()] || null
                      }
                      </div>
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                      />
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {
            table.getRowModel().rows.map((row, index) => (
              <tr key={row.id} className={index % 2 === 0 ? 'bg-slate-700' : 'bg-slate-800'}>
                {row.getVisibleCells().map(cell => (
                  <td style={{ width: cell.column.getSize() }} key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
      <p className='text-slate-500'>
        Page {table.getState().pagination.pageIndex + 1} of {" "} {table.getPageCount()}
      </p>
      <div className='flex gap-2'>
        <button
          onClick={() => { table.previousPage() }}
          disabled={!table.getCanPreviousPage()}
          className='text-slate-500 hover:text-slate-400'
        >{"<"}</button>
        <button
          onClick={() => { table.nextPage() }}
          disabled={!table.getCanNextPage()}
          className='text-slate-500 hover:text-slate-400'
        >{">"}</button>
      </div>
    </>
  );
};

export default AdminTable;

// 'use client';

// import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
// import { TbArrowsSort } from "react-icons/tb";
// import React, { useEffect, useState } from 'react';
// import Filters from './Filters';
// import EditableCell from './EditableCell';
// import StatusCell from './StatusCell';
// import ToggleVisibilityColumn from './toggleVisibilityColumn';

// const AdminTable = ({ recipients }) => {
//   console.log("datos en admintable", recipients);

//   const columns = [
//     // {
//     //   header: 'Nombre Completo',
//     //   accessorFn: row => `${row.firstName} ${row.lastName}`
//     // },
//     {
//       accessorKey: 'firstName',
//       header: 'Nombre',
//       cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
//     },
//     {
//       accessorKey: 'lastName',
//       header: 'Apellido',
//       cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
//     },
//     {
//       accessorKey: 'birthDate',
//       header: 'Fecha de Nacimiento',
//       cell: (props) => <p className='text-slate-400 p-2'>{new Date(props.getValue()).toLocaleDateString()}</p>
//     },
//     {
//       accessorKey: 'dni',
//       header: 'DNI',
//       cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
//     },
//     {
//       accessorKey: 'phone',
//       header: 'Teléfono',
//       cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
//     },
//     {
//       accessorKey: 'email',
//       header: 'Email',
//       cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
//     },
//     {
//       accessorKey: 'sex',
//       header: 'Sexo',
//       cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
//     },
//     {
//       accessorKey: 'enrollmentDate',
//       header: 'Fecha de Registro',
//       cell: (props) => <p className='text-slate-400 p-2'>{new Date(props.getValue()).toLocaleDateString()}</p>
//     },
//     {
//       accessorKey: 'localityId',
//       header: 'ID de Localidad',
//       cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
//     },
//     {
//       accessorKey: 'streetId',
//       header: 'ID de Calle',
//       cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
//     },
//     {
//       accessorKey: 'streetNumber',
//       header: 'Número de Calle',
//       cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
//     },
//     {
//       accessorKey: 'familyGroupId',
//       header: 'ID de Grupo Familiar',
//       cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
//     }
//     // {
//     //   accessorKey: 'status',
//     //   header: 'STATUS',
//     //   cell: StatusCell,
//     //   enableSorting: false,
//     //   enableColumnFilter: true,
//     //   filterFn: (row, columnId, filterStatuses) => {
//     //     if (filterStatuses.length === 0) return true;
//     //     const status = row.getValue(columnId);
//     //     return filterStatuses.includes(status?.id)
//     //   }
//     // },
//   ];

//   const [data, setData] = useState(recipients);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [columnVisibility, setColumnVisibility] = useState([]);

//   useEffect(() => {
//     setData(recipients);
//   }, [recipients]);

//   const toggleColumnVisibility = (columnId) => {
//     const columnIndex = columnVisibility.findIndex(column => column.accessorKey === columnId);
//     if (columnIndex !== -1) {
//       const updatedColumnVisibility = [...columnVisibility];
//       updatedColumnVisibility[columnIndex] = {
//         ...updatedColumnVisibility[columnIndex],
//         isHidden: !updatedColumnVisibility[columnIndex].isHidden
//       };
//       setColumnVisibility(updatedColumnVisibility);
//     }
//   };

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       columnFilters,
//       columnVisibility
//     },
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     columnResizeMode: "onChange",
//     meta: {
//       updateData: (rowIndex, columnId, value) => setData((prev) =>
//         prev.map((row, index) =>
//           index === rowIndex
//             ? { ...prev[rowIndex], [columnId]: value }
//             : row
//         )
//       )
//     },
//   });

//   console.log("estas son las columnas",columnVisibility)

//   return (
//     <>
//       <div className='flex items-center gap-2'>
//       <Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
//       <ToggleVisibilityColumn
//         columnVisibility={columnVisibility}
//         toggleColumnVisibility={toggleColumnVisibility}
//       />
//       </div>
//       <table className='border-white border '>
//         <thead className='border-white border ' >
//           {
//             table.getHeaderGroups().map(headerGroup =>
//               <tr key={headerGroup.id}  style={{ width: table.getTotalSize() }}>
//                 {
//                   headerGroup.headers.map(header =>
//                     <th key={header.id} className='text-slate-300 border-white border' style={{ width: header.getSize() }}>
//                       {header.column.columnDef.header}
//                       {
//                         header.column.getCanSort() && (
//                           <button className='align-middle m-2 ' onClick={header.column.getToggleSortingHandler()}><TbArrowsSort /></button>
//                         )
//                       }
//                       {
//                         {
//                           asc: "↑",
//                           desc: "↓",
//                         }[header.column.getIsSorted()] || null
//                       }
//                       <div
//                         onMouseDown={header.getResizeHandler()}
//                         onTouchStart={header.getResizeHandler()}
//                         className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
//                       >
//                       </div>
//                     </th>
//                   )
//                 }
//               </tr>
//             )
//           }
//         </thead>
//         <tbody >
//           {
//             table.getRowModel().rows.map(row =>
//               <tr key={row.id} className='border-white border '>
//                 {row.getVisibleCells().map(cell =>
//                   <td style={{ width: cell.column.getSize() }} className='border-white border ' key={cell.id}>
//                     {flexRender(
//                       cell.column.columnDef.cell,
//                       cell.getContext()
//                     )}
//                   </td>
//                 )}
//               </tr>
//             )
//           }
//         </tbody>
//       </table>
//       <p className='text-slate-500'>
//         Page {table.getState().pagination.pageIndex + 1} of {" "} {table.getPageCount()}
//       </p>
//       <div className='flex gap-2'>
//         <button
//           onClick={() => { table.previousPage() }}
//           disabled={!table.getCanPreviousPage()}
//           className='text-slate-500 hover:text-slate-400'
//         >{"<"}</button>
//         <button
//           onClick={() => { table.nextPage() }}
//           disabled={!table.getCanNextPage()}
//           className='text-slate-500 hover:text-slate-400'
//         >{">"}</button>
//       </div>
//     </>
//   );
// };

// export default AdminTable;

