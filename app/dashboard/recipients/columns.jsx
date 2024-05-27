"use client"
import { TbDots } from "react-icons/tb";
import { TbArrowsUpDown } from "react-icons/tb";
import { Checkbox } from "@/components/ui/checkbox"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { DataTableColumnHeader } from "./table-header";

 
// import { ColumnDef } from "@tanstack/react-table"
 
export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "first_name",
    header: "Name",
  },
  {
    accessorKey: 'last_name',
    header: 'Apellido',
    cell: (props) => <p className=''>{props.getValue()}</p>
  },
  {
    accessorKey: 'dni',
    header: 'DNI',
    cell: (props) => <p className=''>{props.getValue()}</p>
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} title="DNI" />
    // ),
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
    cell: (props) => <p className=''>{props.getValue()}</p>
  },
  {
    accessorKey: 'birth_date',
    header: 'Fecha de Nacimiento',
    cell: (props) => <p className=''>{new Date(props.getValue()).toLocaleDateString()}</p>
  //   cell: (props) => {
  //     const date = new Date(props.getValue());
  //     return <p className=''>{date.toLocaleDateString()}</p>;
  // }
  },
  {
    accessorKey: "email",
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
    accessorKey: 'sex',
    header: 'Sexo',
    cell: (props) => <p className=''>{props.getValue()}</p>
  },
  {
    accessorKey: "enrollment_date",
    header: "Fech de Registro",
    cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>
  },
  // {
  //   accessorKey: 'locality_id',
  //   header: 'ID de Localidad',
  //   cell: (props) => <p className=''>{props.getValue()}</p>
  // },
  // {
  //   accessorKey: 'streetId',
  //   header: 'ID de Calle',
  //   cell: (props) => <p className=''>{props.getValue()}</p>
  // },
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
  {
    accessorKey: "benefits",
    header: "Beneficios",
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
              onClick={() => navigator.clipboard.writeText(recipient.id)}
            >
              Copy recipient ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View recipient details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
// "use client"
 
// import { ColumnDef } from "@tanstack/react-table"
 
// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }
 
// export const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//   },
//   {
//     accessorKey: "amount",
//     header: "Amount",
//   },
// ]