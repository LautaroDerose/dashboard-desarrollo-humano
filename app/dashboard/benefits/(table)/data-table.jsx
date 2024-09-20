"use client";

import { useRef, useState } from "react";
import { ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { DataTablePagination } from "./table-pagination";
import { DataTableViewOptions } from "./table-viewOptions";

import { MdPersonAdd } from "react-icons/md";
import FormActionBenefit from "../form-action-benefit";

const FilterInput = ({ table }) => {
  const [inputValue, setInputValue] = useState(table.getColumn("name")?.getFilterValue() || "");
  const debounceTimeout = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      // console.log("Input value:", value, "Type", typeof value);
      table.getColumn("name")?.setFilterValue(value);
    }, 1000); // Ajusta el tiempo de espera según tus necesidades
  };

  return (
    <Input
      placeholder="Filtrar por nombre..."
      value={inputValue}
      onChange={handleInputChange}
      className="max-w-sm"
    />
  );
};

export function DataTable({ benefits, benefitCategories, columns }) {

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("name"); // Campo de búsqueda seleccionado
  const [openModalCreate, setOpenModalCreate] = useState(false)
  // const [editData, setEditData] = useState({data})

  const table = useReactTable({
    data:benefits,
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
    // meta: {
    //   updateData: (rowIndex, columnId, value) => 
    //     setEditData((prev) => 
    //       prev.map( (row, index) => 
    //       index === rowIndex 
    //       ? { ...prev[rowIndex], [columnId]: value} 
    //       : row
    //     )
    //   ),
    // },
  });

  return (
    <div className="max-w-screen-lg flex flex-col justify-center mx-auto  ">
    {/* Filtros */}
      <div className="flex items-center gap-4 py-4">
        <FilterInput table={table} />
        <DataTableViewOptions table={table} />
        <Dialog  className="w-fit" open={openModalCreate} onOpenChange={setOpenModalCreate} >
          <DialogTrigger asChild>
            <Button>
              <MdPersonAdd className="h-5 w-5 mr-2" />
              <p>Agregar Beneficio</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="z-50">
            <DialogHeader>
              <DialogTitle>Crear Subsidio</DialogTitle>
              <DialogDescription>
                <div>
                  <p>Asegurese de que no se encuentre en la lista antes de agregar un beneficio</p>
                  <div>
                    <h2>Descripsion de las categorias</h2>
                    <h3>1- Subsidios</h3>
                    <p>Esta categoria se debe asignar a aquellos beneficios que tienen el mismo procedimiento de entrega: <span className="italic">Crear Nota, se envia a subsecretaria y contaduria como procedimiento.</span><br/>Por ejemplo: Luz, Agua, Alquiler, etc...</p>
                    <h3>2- Provedores</h3>
                    <p>Esta categoria se debe asignar a aquellos beneficios que dependen de un provedor<br/>Por ejemplo: Leña, Garrafa, Pasajes</p>
                    <p>Esta categoria se debe asignar a aquellos beneficios que cuenta con stock el municipio.<br/>Por ejemplo: Alimentos y materiales de construccion</p>
                    <h3>4- Otros</h3>
                    <p>Esta categoria se debe asignar a aquellos beneficios que tienen un procedimiento particular de entrega: <span className="block h-fit italic text-red-700 ">Para estos casos se recomienda asistencia, por lo que es probable que se deba agregar codigo y crear tablas nuevas</span>Por ejemplo: Credencial Hospitalaria, Agua, Atmosferico</p>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <FormActionBenefit benefits={benefits} benefitCategories={benefitCategories} />
          </DialogContent>
        </Dialog>
      </div>
    {/* Table */}
      <div className=" rounded-md border">
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
    </div>
  );
}