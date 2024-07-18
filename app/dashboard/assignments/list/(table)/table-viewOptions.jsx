"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { RxMixerHorizontal } from "react-icons/rx";

export function DataTableViewOptions({ table }) {

  const columnNamesInSpanish = {
    "recipient.first_name": "Nombre",
    "recipient.last_name": "Apellido",
    "recipient.dni": "DNI",
    "benefit.name": "Beneficios",
    "status": "Estado",
    "recipient.locality": "Localidad",
    "enrollment_date": "Fecha de registro",
    "expiry_date": "Fecha de vencimiento",
    "withdrawal_date": "Fecha de Concrecion",
    "amount": "Monto",
    "quantity": "Cantidad"
  };

  return (
    <div className="flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-10 lg:flex"
          >
            <RxMixerHorizontal className="mr-2 h-4 w-4" />
            Mostrar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[150px]">
          <DropdownMenuLabel>Columnas visibles</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {/* {column.id} */}
                  {columnNamesInSpanish[column.id] || column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
