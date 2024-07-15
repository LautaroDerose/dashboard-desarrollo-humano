"use client";

// import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
// import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { RxMixerHorizontal } from "react-icons/rx";

export function DataTableViewOptions({ table }) {

  const columnNamesInSpanish = {
    
    "recipient.first_name": "Nombre",
    "recipient.last_name": "Apellido",
    recipient_birth_date: "Fecha de Nacimiento",
    recipient_dni: "DNI",
    recipient_sex: "Sexo",
    recipient_enrollment_date: "Fecha de Inscripción",
    "locality.name": "Localidad",
    street_name: "Calle"
  };

  return (
    <div className="flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto  h-10 lg:flex"
            // className="ml-auto hidden h-10 lg:flex"
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
