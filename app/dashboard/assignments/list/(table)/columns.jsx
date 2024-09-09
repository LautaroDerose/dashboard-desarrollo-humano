"use client"

import { TbDots } from "react-icons/tb";
import { TbArrowsUpDown } from "react-icons/tb";
import { Checkbox } from "@/components/ui/checkbox"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import Link from "next/link";
import FacetedFilter from "./table-faceted-filter";
import StepperSubsidy from "@/components/stepper-subsidyStage";
import StepperHospital from "@/components/stepper-hospital";
 

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
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        ID Beneficiario
        <TbArrowsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
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
  // {
  //   id: 'Direccion',
  //   header: 'Direccion',
  //   accessorFn: row => row.contact_info.street.name + ' ' + row.contact_info.street_number,
  //   cell: (props) => {
  //     return <p className=''>{props.getValue()}</p>;
  //   }
  // },
 
  // {
  //   id: 'benefit.name',
  //   accessorKey: 'benefit.name',
  //   header: 'Beneficio',
  //   cell: (props) => <p>{props.getValue()}</p>,
  // },
  {
    id: 'benefit.name',
    accessorKey: 'benefit.name',
    header: 'Beneficio',
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
        columnId="benefit.name"
        options={['Beneficio 1', 'Beneficio 2', 'Beneficio 3']} // Cambia estas opciones según tu data
      />
    ),
  },
  {
    id: "benefit.id",
    accessorKey: "benefit.id",
    header: "Estado",
    cell: (props) => {
      const value = props.getValue();
      switch (value) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
          return <StepperSubsidy subsidyStage={props.row.original.subsidy_stage} />;
        case 16:
          return <StepperHospital credential={props.row.original.HospitalCredential}/>;
        case 13:
          return <p>Pasajes</p>;
        default:
          return null; // Devuelve null si no hay un caso que coincida
      }
    }
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Estado',
    cell: (props) => {
      const value = props.getValue().toString();
      return <p>{value}</p>;
    },
    filterFn: (row, columnId, filterValue) => {
      const cellValue = row.getValue(columnId).toString();
      return cellValue.includes(filterValue);
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
    id: 'recipient.locality',
    accessorKey: 'recipient.contact_info.locality.name',
    header: 'Localidad',
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: 'enrollment_date',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Registro
        <TbArrowsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>,
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
    accessorKey: 'withdrawal_date',
    header: 'F. de Concresion',
    cell: (props) => { null ? "" : <p>{new Date(props.getValue()).toLocaleDateString()}</p>},
  },
  {
    accessorKey: 'amount',
    header: 'Monto',
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: 'quantity',
    header: 'Cantidad',
    cell: (props) => <p>{props.getValue()}</p>,
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(recipient.id)}>
              Copiar Id de persona
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
            <Link href={`/dashboard/assignments/${assignment.id}`}>
              <DropdownMenuItem>Ver en detalle</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

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
//   {
//     id: 'recipient.dni',
//     accessorKey: 'recipient.dni',
//     header: 'DNI',
//     cell: (props) => {
//       const value = props.getValue().toString();
//       console.log("Cell value (DNI):", value, "Type:", typeof value);
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
//   },
//   {
//     accessorKey: 'recipient.sex',
//     header: 'Sexo',
//     cell: (props) => <p className=''>{props.getValue()}</p>
//   },
//   {
//     accessorKey: 'phone',
//     header: 'Teléfono',
//     cell: (props) => <p className=''>{props.getValue()}</p>
//   },
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
//             <DropdownMenuItem>Editar </DropdownMenuItem>
//             <DropdownMenuItem>Eliminar</DropdownMenuItem>
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
