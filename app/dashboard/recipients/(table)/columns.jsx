// "use client"
// import Link from "next/link";

// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// import { TbDots } from "react-icons/tb";
// import { TbArrowsUpDown } from "react-icons/tb";
// // import { DataTableColumnHeader } from "./table-header";
 
// export const columns = [
 
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     id: "recipient.first_name",
//     accessorKey: "recipient.first_name",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Nombre
//           <TbArrowsUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//   },
//   {
//     id: 'recipient.last_name',
//     accessorKey: 'recipient.last_name',
//     header: 'Apellido',
//     cell: (props) => <p className=''>{props.getValue()}</p>
//   },
//   // {
//   //   id: 'recipient.dni',
//   //   accessorKey: 'recipient.dni',
//   //   header: 'DNI',
//   //   cell: (props) => {
//   //     const value = props.getValue().toString();
//   //     console.log("Cell value (DNI):", value, "Type:", typeof value);
//   //     return <p className=''>{value}</p>;
//   //   }
//     // cell: (props) => <p className=''>{props.getValue().toString()}</p>
//     // cell: (props) => <p className=''>{props.getValue()}</p>
//     // header: ({ column }) => (
//     //   <DataTableColumnHeader column={column} title="DNI" />
//     // ),
//   // },
//   {
//     id: 'recipient.dni',
//     accessorKey: 'recipient.dni',
//     header: 'DNI',
//     cell: (props) => {
//       const value = props.getValue();
//       // console.log("Cell value (DNI):", value, "Type:", typeof value);
//       return <p className=''>{value}</p>;
//     },
//     filterFn: (row, columnId, filterValue) => {
//       const cellValue = row.getValue(columnId).toString();
//       console.log(`Comparing cell value: ${cellValue} with filter value: ${filterValue}`);
//       return cellValue.includes(filterValue);
//     }
//   },
//   {
//     accessorKey: 'recipient.birth_date',
//     header: 'Fecha de Nacimiento',
//     cell: (props) => <p className=''>{new Date(props.getValue()).toLocaleDateString()}</p>
//     //   cell: (props) => {
//       //     const date = new Date(props.getValue());
//       //     return <p className=''>{date.toLocaleDateString()}</p>;
//       // }
//     },
//     {
//       accessorKey: 'recipient.sex',
//       header: 'Sexo',
//       cell: (props) => <p className=''>{props.getValue()}</p>
//     },
//     {
//       accessorKey: 'phone',
//       header: 'Teléfono',
//       cell: (props) => <p className=''>{props.getValue()}</p>
//     },
//   {
//     accessorKey: "email",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Email
//           <TbArrowsUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//   },
//   // {
//   //   accessorKey: "enrollment_date",
//   //   header: "Fech de Registro",
//   //   cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>
//   // },
//   {
//     id: 'locality.name',
//     accessorKey: 'locality.name',
//     header: 'Localidad',
//     cell: (props) => <p className=''>{props.getValue()}</p>
//   },
//   {
//     accessorKey: 'street.name',
//     header: 'Calle',
//     cell: (props) => <p className=''>{props.getValue()}</p>
//   },
//   // {
//   //   accessorKey: 'streetNumber',
//   //   header: 'Número de Calle',
//   //   cell: (props) => <p className=''>{props.getValue()}</p>
//   // },  
//   // {
//   //   accessorKey: 'familyGroupId',
//   //   header: () => {
//   //     return(
//   //       <TooltipProvider>
//   //         <Tooltip>
//   //           <TooltipTrigger asChild>
//   //             <Button variant="outline">ID_GF</Button>
//   //           </TooltipTrigger>
//   //           <TooltipContent>
//   //             <p>Id Grupo Familiar</p>
//   //           </TooltipContent>
//   //         </Tooltip>
//   //       </TooltipProvider>
//   //     )
//   //   },
//   //   cell: (props) => <p className=''>{props.getValue()}</p>
//   // },
//   {
//     accessorKey: "benefits",
//     header: "Beneficios",
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const recipient = row.original
 
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               {/* <MoreHorizontal  /> */}
//               <TbDots  className="h-4 w-4" />

//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(recipient.id)}
//             >
//               Copiar Id de persona
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             {/* <DropdownMenuItem>Editar</DropdownMenuItem>
//             <DropdownMenuItem>Eliminar</DropdownMenuItem> */}
//             {/* <DropdownMenuItem>Ver en detalle </DropdownMenuItem> */}
//             <Link href={`/dashboard/recipients/${recipient.id}`}>
//               <DropdownMenuItem>Ver en detalle</DropdownMenuItem>
//             </Link>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
  
// ]


// -----------------------------------------------------
"use client"
import Link from "next/link";

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { TbDots } from "react-icons/tb";
import { TbArrowsUpDown } from "react-icons/tb";
// import { DataTableColumnHeader } from "./table-header";
 
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
    id: "first_name",
    accessorKey: "first_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <TbArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: 'last_name',
    accessorKey: 'last_name',
    header: 'Apellido',
    cell: (props) => <p className=''>{props.getValue()}</p>
  },
  // {
  //   id: 'dni',
  //   accessorKey: 'dni',
  //   header: 'DNI',
  //   cell: (props) => {
  //     const value = props.getValue().toString();
  //     console.log("Cell value (DNI):", value, "Type:", typeof value);
  //     return <p className=''>{value}</p>;
  //   }
    // cell: (props) => <p className=''>{props.getValue().toString()}</p>
    // cell: (props) => <p className=''>{props.getValue()}</p>
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} title="DNI" />
    // ),
  // },
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
    accessorKey: 'birth_date',
    header: 'Fecha de Nacimiento',
    cell: (props) => <p className=''>{new Date(props.getValue()).toLocaleDateString()}</p>
    //   cell: (props) => {
      //     const date = new Date(props.getValue());
      //     return <p className=''>{date.toLocaleDateString()}</p>;
      // }
    },
    {
      accessorKey: 'sex',
      header: 'Sexo',
      cell: (props) => <p className=''>{props.getValue()}</p>
    },
    {
      accessorKey: 'contact_info.phone',
      header: 'Teléfono',
      cell: (props) => <p className=''>{props.getValue()}</p>
    },
  {
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
  // {
  //   accessorKey: "enrollment_date",
  //   header: "Fech de Registro",
  //   cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>
  // },
  {
    id: 'locality.name',
    accessorKey: 'contact_info.locality.name',
    header: 'Localidad',
    cell: (props) => <p className=''>{props.getValue()}</p>
    // cell: ({ row }) => {
    //   const contactInfo = row.original.contact_info;
    //   return contactInfo.map((info, index) => (
    //     <p key={index} className=''>{info.locality.name}</p>
    //   ));
    // }
  },
  {
    accessorKey: 'contact_info.street.name',
    header: 'Calle',
    cell: (props) => <p className=''>{props.getValue()}</p>
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
            {/* <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem> */}
            {/* <DropdownMenuItem>Ver en detalle </DropdownMenuItem> */}
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