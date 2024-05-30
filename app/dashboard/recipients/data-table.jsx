"use client";

import {
  // ColumnDef,
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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./table-viewOptions";
import { IoMdPersonAdd } from "react-icons/io";
import Link from "next/link";
import { MdPersonAdd } from "react-icons/md";


export function DataTable({ columns, data }) {
  // console.log(data.assignments)
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
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

  return (
    <>
    {/* Filtros */}
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Filtrar por nombre..."
          value={table.getColumn("recipient.first_name")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("recipient.first_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
          <DataTableViewOptions table={table} />
          <Button size="sm" className="h-8 gap-1" asChild>
            <div>
            <MdPersonAdd className="h-5 w-5 mr-2" />
            <Link href="./recipients/form" className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar Persona
            </Link>
            </div>
          </Button>

          {/* <Link href="/dashboard/recipients/form"><Button 
              variant="outline"
              size="sm"
              className="ml-auto hidden h-10 lg:flex"
            >
              <MdPersonAdd  className="mr-2 h-5 w-5"/>Agregar Persona
          </Button></Link> */}

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