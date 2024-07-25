"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { ColumnFiltersState, SortingState, VisibilityState, flexRender,getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { DataTablePagination } from "./table-pagination";
import { DataTableViewOptions } from "./table-viewOptions";
import { FormModalRecipient } from "../form-modal-recipient";
import FormActionRecipient from "../form-action-recipient";

import { CirclePlus } from "lucide-react";
import { MdPersonAdd } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { TbLeaf } from "react-icons/tb";

const FilterInput = ({ table }) => {
  const [inputValue, setInputValue] = useState(table.getColumn("dni")?.getFilterValue() || "");
  const debounceTimeout = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      // console.log("Input value:", value, "Type", typeof value);
      table.getColumn("dni")?.setFilterValue(value);
    }, 1000); // Ajusta el tiempo de espera según tus necesidades
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

export function DataTable({ columns, data }) {
  // console.log(data)
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("recipient.dni"); // Campo de búsqueda seleccionado
  const [openModalCreate, setOpenModalCreate] = useState(false)

  
  // console.log(socialConditions)
  const table = useReactTable({
    data:data.recipients,
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

  return (
    <>
      {/* Filtros */}
      <div className="flex items-center gap-4 py-4">
        {/* <select
          value={selectedFilter}
          onChange={(event) => setSelectedFilter(event.target.value)}
          className="max-w-sm"
        >
          <option value="locality.dni">DNI</option>
          <option value="recipient.first_name">Nombre</option>
          <option value="recipient.last_name">Apellido</option>
          <option value="locality.name">Localidad</option>
        </select>
        <Input
          placeholder={`Filtrar por ${selectedFilter.split('.').pop()}`}
          value={table.getColumn(selectedFilter)?.getFilterValue() || ""}
          onChange={handleFilterChange}
          className="max-w-sm"
        /> */}
        {/* <Input
          placeholder="Filtrar por DNI..."
          value={table.getColumn("recipient.dni")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("recipient.dni")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        {/* <Input
          placeholder="Filtrar por DNI..."
          value={table.getColumn("recipient.dni")?.getFilterValue() || ""}
          onChange={(event) => {
            const value = event.target.value;
            console.log("Input value:", value, "Type", typeof value);
            table.getColumn("recipient.dni")?.setFilterValue(value);
          }}
          className="max-w-sm"
        /> */}
          <FilterInput table={table} />
          <DataTableViewOptions table={table} />
          {/* <Button size="sm" className="h-8 gap-1" asChild>
            <div>
              <MdPersonAdd className="h-5 w-5 mr-2" />
              <Link href="./recipients/form" className="sr-only sm:not-sr-only sm:whitespace-nowrap"> Agregar Persona </Link>
            </div>
          </Button> */}
          <Dialog className="max-w-4xl" open={openModalCreate} onOpenChange={setOpenModalCreate} >
            <DialogTrigger asChild>
              <Button>
                <MdPersonAdd className="h-5 w-5 mr-2" />
                <p>Agregar Persona</p>
              </Button>
            </DialogTrigger>
            <DialogContent className="z-50">
              <DialogHeader>
                <DialogTitle>Crear Persona</DialogTitle>
                <DialogDescription>Asegurese de que no se encuentre en la lista antes de agregar una persona</DialogDescription>
              </DialogHeader>
              {/* <FormModalRecipient data={data} /> */}
              <FormActionRecipient />
            </DialogContent>
          </Dialog>
      </div>
    {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="w-fit" > 
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