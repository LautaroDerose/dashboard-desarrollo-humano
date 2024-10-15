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
import { confirmDecreeDoc } from "@/actions/doc-actions/doc-contaduria-actions";
import { PapeleoCell } from "@/components/papeleo-column";

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
    header: 'ID',
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
    id: 'benefit.name',
    accessorKey: 'benefit.name',
    header: 'Beneficio',
    cell: (props) => <p>{props.getValue()}</p>,
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
    id: "Núm. de Nota",
    accessorKey: 'subsidy_stage.note_doc.doc_number', // Para el documento de tipo nota
    header: 'Número de Nota',
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    id: "Núm. de Decreto",
    accessorKey: 'subsidy_stage.decree_doc.doc_number', // Para el documento de tipo nota
    header: 'Número de Decreto',
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    id: "papeleo",
    accessorKey: 'subsidy_stage.decree_doc.is_confirm',
    header: 'Papeleo',
    cell: (props) => {
      const assignmentId = props.row.original.id;
      const initialConfirmation = props.getValue();
  
      return  <PapeleoCell assignmentId={assignmentId} initialConfirmation={initialConfirmation} />;
    },
  },
  // {
  //   id: "papeleo",
  //   accessorKey: 'subsidy_stage.decree_doc.is_confirm',
  //   header: 'Papeleo',
  //   cell: (props) => {
  //     const [isConfirmed, setIsConfirmed] = useState(props.getValue());
  //     const assignmentId = props.row.original.id;
  
  //     const handleToggleConfirmation = async () => {
  //       try {
  //         await confirmDecreeDoc(assignmentId, isConfirmed);
  //         setIsConfirmed(!isConfirmed);
  //       } catch (error) {
  //         console.error("Error updating document confirmation:", error);
  //       }
  //     };
  
  //     return (
  //       <div className="flex items-center justify-center">
  //         <BsArrowRepeat />  
  //         {
  //           isConfirmed ? (
  //           <button
  //             onClick={handleToggleConfirmation}
  //             className="text-green-400 font-bold p-2 rounded"
  //           >
  //             Disponible
  //           </button>
  //         ) : (
  //           <button
  //             onClick={handleToggleConfirmation}
  //             className="text-red-400 font-bold p-2 rounded"
  //           >
  //             En espera
  //           </button>
  //         )
  //         }
  //       </div>
  //     )
  //   },
  // },
  // {
  //   id: "papeleo",
  //   accessorKey: 'subsidy_stage.note_doc.is_confirm', // Para el documento de tipo nota
  //   header: 'papeleo ',
  //   cell: (props) => {
  //     const value = props.getValue();
  //     return value ? (
  //       <p className='text-green-400 font-bold  '>Disponible</p>
  //     ) : (
  //       <p className='text-red-400 font-bold  '>En espera</p>
  //     );
  //   }
  // },
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
            <Link href={`/contaduria/${assignment.id}`}>
              <DropdownMenuItem>Ver en detalle</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
