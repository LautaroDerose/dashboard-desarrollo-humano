"use client";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./table-pagination";
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./table-viewOptions";
import { IoMdPersonAdd } from "react-icons/io";
import Link from "next/link";
import { MdAssignmentAdd, MdPersonAdd } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { TbLeaf } from "react-icons/tb";
import FormActionAssignment from "../../(forms)/form-action-assignment";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FacetedFilter from "./table-faceted-filter";


// const FilterInput = ({ table }) => {
//   const [inputValue, setInputValue] = useState(table.getColumn("recipient.dni")?.getFilterValue() || "");
//   const debounceTimeout = useRef(null);

//   const handleInputChange = (event) => {
//     const value = event.target.value;
//     setInputValue(value);

//     if (debounceTimeout.current) {
//       clearTimeout(debounceTimeout.current);
//     }

//     debounceTimeout.current = setTimeout(() => {
//       table.getColumn("recipient.dni")?.setFilterValue(value);
//     }, 1000);
//   };

//   return (
//     <Input
//       placeholder="Filtrar por DNI..."
//       value={inputValue}
//       onChange={handleInputChange}
//       className="max-w-sm"
//     />
//   );
// };
const FilterInput = ({ table }) => {
  const [inputValue, setInputValue] = useState(table.getColumn("recipient.dni")?.getFilterValue() || "");
  const debounceTimeout = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      table.getColumn("recipient.dni")?.setFilterValue(value);
    }, 1000);
  };

  return (
    <Input
      placeholder="Filtrar por DNI..."
      value={inputValue}
      onChange={handleInputChange}
      className="max-w-sm"
    />
  );
};

export function DataTable({ columns, assignments, benefits, recipients }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("recipient.dni");

  // const recipient = data.recipient
  // const contact = recipient.contact_info
  // console.log(recipient)

  const table = useReactTable({
    data: assignments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleFilterChange = (event) => {
    table.getColumn(selectedFilter)?.setFilterValue(event.target.value);
  };
  const [openModalCreate, setOpenModalCreate] = useState(false)


  return (
    <>
      <div className="flex items-center gap-4 py-4">
        <FilterInput table={table} />
        <FacetedFilter table={table} columnId="benefit.name" options={benefits.map(benefit => benefit.name)} />
        {/* <Dialog className="max-w-4xl" open={openModalCreate} onOpenChange={setOpenModalCreate} >
          <DialogTrigger asChild>
            <Button>
              <MdAssignmentAdd className="h-5 w-5 mr-2" />
              <p>Agregar Asignacion</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="z-50">
            <DialogHeader>
              <DialogTitle>Crear Asignacion</DialogTitle>
              <DialogDescription>Una ddescripcion pertinente</DialogDescription>
            </DialogHeader>
            <FormActionAssignment benefits={benefits} recipients={recipients} />
          </DialogContent>
        </Dialog> */}
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  );
}
// const FilterInput = ({ table }) => {
//   const [inputValue, setInputValue] = useState(table.getColumn("recipient.dni")?.getFilterValue() || "");
//   const debounceTimeout = useRef(null);

//   const handleInputChange = (event) => {
//     const value = event.target.value;
//     setInputValue(value);

//     if (debounceTimeout.current) {
//       clearTimeout(debounceTimeout.current);
//     }

//     debounceTimeout.current = setTimeout(() => {
//       // console.log("Input value:", value, "Type", typeof value);
//       table.getColumn("recipient.dni")?.setFilterValue(value);
//     }, 1000); // Ajusta el tiempo de espera según tus necesidades
//   };

//   return (
//     <Input
//       placeholder="Filtrar por DNI..."
//       value={inputValue}
//       onChange={handleInputChange}
//       className="max-w-sm"
//     />
//   );
// };
