"use client"
import Link from "next/link";

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { TbDots } from "react-icons/tb";
import { TbArrowsUpDown } from "react-icons/tb";
 
export const columns = [
 
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
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
    id: "ID",
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <TbArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "nombre",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Nombre
        <TbArrowsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    accessorFn: row => row.last_name + ' ' + row.first_name,
    cell: (props) => {
      return <p className=''>{props.getValue()}</p>;
    }
  },
  {
    id: 'dni',
    accessorKey: 'dni',
    header: 'DNI',
    cell: (props) => {
      const value = props.getValue();
      // console.log("Cell value (DNI):", value, "Type:", typeof value);
      return <p className=''>{value}</p>;
    },
    filterFn: (row, columnId, filterValue) => {
      const cellValue = row.getValue(columnId).toString();
      console.log(`Comparing cell value: ${cellValue} with filter value: ${filterValue}`);
      return cellValue.includes(filterValue);
    }
  },
  {
    id: 'fecha de Nacimiento',
    accessorKey: 'birth_date',
    header: 'Fecha de Nacimiento',
    cell: (props) => <p className=''>{new Date(props.getValue()).toLocaleDateString()}</p>
  },
  {
    accessorKey: 'sex',
    header: 'Sexo',
    cell: (props) => <p className=''>{props.getValue()}</p>
  },
  // {
  //   id: 'Localidad',
  //   accessorKey: 'contact_info.locality.name',
  //   header: 'Localidad',
  //   cell: (props) => <p className=''>{props.getValue()}</p>
  // },
  // {
  //   id: 'Localidad',
  //   accessorKey: 'contact_info.locality.name',
  //   header: 'Localidad',
  //   cell: (props) => <p className=''>{props.getValue()}</p>,
  //   enableFiltering: true, // Asegúrate de habilitar el filtrado aquí si usas un paquete que lo requiera
  // },
  {
    id: 'Localidad',
    accessorKey: 'contact_info.locality.name',
    header: 'Localidad',
    cell: (props) => <p>{props.getValue()}</p>,
    filterFn: (row, columnId, filterValues) => {
      // Si filterValues está vacío, mostrar todos los resultados
      if (!filterValues.length) return true;
      const cellValue = row.getValue(columnId);
      return filterValues.includes(cellValue);
    },
    filterComponent: (table) => (
      <FacetedFilter
        table={table}
        columnId="contact_info.locality.name"
        options={['Beneficio 1', 'Beneficio 2', 'Beneficio 3']} // Cambia estas opciones según tu data
      />
    ),
  },
  {
    id: 'Direccion',
    header: 'Direccion',
    accessorFn: row => row.contact_info.street.name + ' ' + row.contact_info.street_number,
    cell: (props) => {
      return <p className=''>{props.getValue()}</p>;
    }
  },
  {
    id: 'Telefono',
    accessorKey: 'contact_info.phone',
    header: 'Teléfono',
    cell: (props) => <p className=''>{props.getValue()}</p>
  },
  {
    id: "Email",
    accessorKey: "contact_info.email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <TbArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  
  {
    id: "actions",
    cell: ({ row }) => {
      const recipient = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              {/* <MoreHorizontal  /> */}
              <TbDots  className="h-4 w-4" />

            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(id)}
            >
              Copiar Id de persona
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/dashboard/recipients/${recipient.id}`}>
              <DropdownMenuItem>Ver en detalle</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  
]


 // {
  //   accessorKey: 'streetNumber',
  //   header: 'Número de Calle',
  //   cell: (props) => <p className=''>{props.getValue()}</p>
  // },  
  // {
  //   accessorKey: 'familyGroupId',
  //   header: () => {
  //     return(
  //       <TooltipProvider>
  //         <Tooltip>
  //           <TooltipTrigger asChild>
  //             <Button variant="outline">ID_GF</Button>
  //           </TooltipTrigger>
  //           <TooltipContent>
  //             <p>Id Grupo Familiar</p>
  //           </TooltipContent>
  //         </Tooltip>
  //       </TooltipProvider>
  //     )
  //   },
  //   cell: (props) => <p className=''>{props.getValue()}</p>
  // },