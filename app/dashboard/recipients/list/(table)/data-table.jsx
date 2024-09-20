"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { MdAssignmentAdd, MdPersonAdd } from "react-icons/md";

import { ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";

import FormActionRecipient from "../form-action-recipient";
import { DataTablePagination } from "./table-pagination";
import { DataTableViewOptions } from "./table-viewOptions";
import FacetedFilter from "./table-faceted-filter";

const FilterInput = ({ table }) => {
  // Estado para almacenar el valor del input y la columna seleccionada
  const [inputValue, setInputValue] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("dni"); // Por defecto es 'dni'
  const debounceTimeout = useRef(null);

  // Función para manejar el cambio de input
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      // Aplicamos el filtro a la columna seleccionada
      table.getColumn(selectedColumn)?.setFilterValue(value);
    }, 1000); // Ajusta el tiempo de debounce según tus necesidades
  };

  // Función para manejar el cambio de columna seleccionada
  const handleColumnChange = (column) => {
    setSelectedColumn(column);
    // Reseteamos el valor del filtro de la columna cuando cambias la columna seleccionada
    setInputValue(""); 
    table.getColumn(column)?.setFilterValue("");
  };

  return (
    <div className="flex gap-4 items-center">
      {/* Select para elegir la columna */}
      <Select onValueChange={handleColumnChange} value={selectedColumn}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar columna" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dni">DNI</SelectItem>
          <SelectItem value="nombre">Nombre</SelectItem>
          <SelectItem value="Direccion">Direccion</SelectItem>
          {/* Agrega más columnas según sea necesario */}
        </SelectContent>
      </Select>

      {/* Input para el valor del filtro */}
      <Input
        placeholder={`Filtrar por ${selectedColumn}...`}
        value={inputValue}
        onChange={handleInputChange}
        className="max-w-sm"
      />
    </div>
  );
};

export function DataTable({ columns, data, localities }) {

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("recipient.dni"); 
  
  const [openModalCreate, setOpenModalCreate] = useState(false)

  const table = useReactTable({
    data: data.recipients,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Asegúrate de tener este modelo activado
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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
      <div className="flex items-center gap-4 py-4 justify-between ">
        <div className="flex items-center gap-4 ">
          <FilterInput table={table} />
          <FacetedFilter
            table={table}
            columnId="Localidad"
            options={localities.map(locality => locality.name)}
          />
          <DataTableViewOptions table={table} />
        </div>
       
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
