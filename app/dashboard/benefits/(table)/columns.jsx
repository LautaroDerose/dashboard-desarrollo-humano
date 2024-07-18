"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import EditableCell from "./EditableCell";

import { TbDots } from "react-icons/tb";
import { TbArrowsUpDown } from "react-icons/tb";
import BenefitDeleteButton from "@/components/benefit-inactive-button"
import { Separator } from "@/components/ui/separator"
import BenefitInactiveButton from "@/components/benefit-inactive-button"
import BenefitActiveButton from "@/components/benefit-active-button"

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
    id: "name",
    accessorKey: "name",
    // cell: EditableCell,
    header: "Beneficio",
  },
  {
    id: "is_active",
    accessorKey: "is_active",
    // cell: EditableCell,
    header: "Estado",
    cell: (props) => {
      const value = props.getValue();
      return value ? (
        <p className='text-green-400 p-2'>Activo</p>
      ) : (
        <p className='text-red-400 p-2'>Inactivo</p>
      );
    }
  },
  {
    accessorKey: 'category.name',
    header: 'Categoria',
    cell: (props) => <p className='text-slate-400 p-2'>{props.getValue()}</p>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const benefit = row.original
      
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
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <Separator className="mb-2" />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(benefit.id)}
            >
              Copiar ID de beneficio
            </DropdownMenuItem>
            <DropdownMenuItem>
              Editar de beneficio
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem><BenefitInactiveButton benefitId={benefit.id}/></DropdownMenuItem>
            <DropdownMenuItem><BenefitActiveButton benefitId={benefit.id}/></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
