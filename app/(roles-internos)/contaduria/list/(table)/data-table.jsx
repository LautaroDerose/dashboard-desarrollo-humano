"use client";
import { useState, useRef, useEffect } from "react";

import { DataTableViewOptions } from "./table-viewOptions";
import { ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight } from "react-icons/hi";


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

function DataTablePagination({ table }) {
  return (
    <div className="flex items-center justify-between mt-1 mb-2 px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Filas por pagina</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Pagina {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir a la primer pagina</span>
            <HiChevronDoubleLeft  className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir a pagina anterior</span>
            <HiChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir a pagina siguiente</span>
            <HiChevronRight  className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir a ultima pagina</span>
            <HiChevronDoubleRight  className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

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
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="m-auto ">
                      {header.isPlaceholder ? null : <div className="flex items-center justify-center ">{flexRender(header.column.columnDef.header, header.getContext())}</div>}
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
                    <div className="flex items-center justify-center cursor-default  ">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
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




