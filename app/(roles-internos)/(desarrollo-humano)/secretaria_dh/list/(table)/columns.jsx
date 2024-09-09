"use client"

import { TbDots } from "react-icons/tb";
import { TbArrowsUpDown } from "react-icons/tb";
import { Checkbox } from "@/components/ui/checkbox"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BsArrowRepeat } from "react-icons/bs";

import Link from "next/link";
import { useState } from "react";
import { confirmDoc } from "@/actions/doc-actions/doc-subse-actions";
 
export const columns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    accessorKey: 'id',
    header: 'ID Asignacion',
    cell: (props) => {
      const value = props.getValue();
      return <p>{value}</p>;
    },
    filterFn: 'includesString'
  },
  {
    id: "recipient.first_name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Nombre
        <TbArrowsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    accessorFn: row => row.recipient.last_name + ' ' + row.recipient.first_name,
    cell: (props) => {
      return <p className=''>{props.getValue()}</p>;
    }
  },
  {
    id: 'recipient.dni',
    accessorKey: 'recipient.dni',
    header: 'DNI',
    cell: (props) => {
      const value = props.getValue();
      return <p>{value}</p>;
    },
    filterFn: 'includesString'
  },
  {   
    id: 'HospitalCredential.ts_name',
    accessorKey: 'HospitalCredential.ts_name',
    header: 'Trabajadora asignada',
    cell: (props) => {
      const value = props.getValue();
      return <p>{value ? value : "No asignada"}</p>; // Muestra "No asignada" si no hay ts_name
    },
  },
  {
    accessorKey: 'expiry_date',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Vencimiento
        <TbArrowsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>,
  },
  
  {
    id: "actions",
    cell: ({ row }) => {
      const assignment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <TbDots className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(assignment.id)}>
              Copiar Id de Asignación
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/secretaria_dh/${assignment.id}`}>
              <DropdownMenuItem>Ver en detalle</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
    // {
  //   id: "id",
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
  //       ID Beneficiario
  //       <TbArrowsUpDown className="ml-2 h-4 w-4" />
  //     </Button>
  //   ),
  // },
  // {
  //   id: 'Direccion',
  //   header: 'Direccion',
  //   accessorFn: row => row.contact_info.street.name + ' ' + row.contact_info.street_number,
  //   cell: (props) => {
  //     return <p className=''>{props.getValue()}</p>;
  //   }
  // },
 
 
  
  // {
  //   id: 'status',
  //   accessorKey: 'status',
  //   header: 'Estado',
  //   cell: (props) => {
  //     const value = props.getValue().toString();
  //     return <p>{value}</p>;
  //   },
  //   filterFn: (row, columnId, filterValue) => {
  //     const cellValue = row.getValue(columnId).toString();
  //     return cellValue.includes(filterValue);
  //   }
  // },
  
  // {
  //   id: 'recipient.locality',
  //   accessorKey: 'recipient.contact_info.locality.name',
  //   header: 'Localidad',
  //   cell: (props) => <p>{props.getValue()}</p>,
  // },
  // {
  //   accessorKey: 'enrollment_date',
  //   header: ({ column }) => (
  //     <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
  //       Registro
  //       <TbArrowsUpDown className="ml-2 h-4 w-4" />
  //     </Button>
  //   ),
  //   cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>,
  // },
  
  // {
  //   accessorKey: 'withdrawal_date',
  //   header: 'F. de Concresion',
  //   cell: (props) => { null ? "" : <p>{new Date(props.getValue()).toLocaleDateString()}</p>},
  // },
  // {
  //   accessorKey: 'amount',
  //   header: 'Monto',
  //   cell: (props) => <p>{props.getValue()}</p>,
  // },
  // {
  //   accessorKey: 'quantity',
  //   header: 'Cantidad',
  //   cell: (props) => <p>{props.getValue()}</p>,
  // },
 
 
  
