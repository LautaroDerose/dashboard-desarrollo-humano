'use client'

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MdAssignmentAdd, MdOutlineInsertDriveFile } from "react-icons/md";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import NavigationMenuAssignments from "./assign-nav-menu";

export default function AssignmentLayout({ children }) {

  return (
    <div className="flex flex-col mt-4 " >
      <Card  className="p-4 mx-12 flex">
        <NavigationMenuAssignments />
        <div className="ml-auto flex items-center gap-2">       
          <Button>
            <MdAssignmentAdd className="h-5 w-5 mr-2" />
            <Link href='/dashboard/assignments/formularios/subsidios'>
              Crear subsidio
            </Link>
          </Button>            
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button  className=" gap-1">
                <MdAssignmentAdd className="h-5 w-5 mr-2" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Otras asignaciones
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>Formularios</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem >
                <Link href='/dashboard/assignments/formularios/credencial'>
                  Credencial Hospitalaria
                </Link>
              </DropdownMenuItem>
              
                <Link className="ml-2" href='/dashboard/assignments/formularios/agua'>
                  Agua
                </Link>
              
              <DropdownMenuItem>
                <Link href='/dashboard/assignments/formularios/atmosferico'>
                  Atmosferico
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href='/dashboard/assignments/formularios/pasajes'>
                  Pasajes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href='/dashboard/assignments/formularios/lena'>
                  Lena
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href='/dashboard/assignments/formularios/garrafa'>
                  Garrafa
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
      <div className=" flex-auto px-4">
        {children}
      </div>
    </div>
  );
}

// <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" size="sm" className="h-8 gap-1">
//                 <IoFilterSharp className="h-3.5 w-3.5" />
//                 <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                   Filter
//                 </span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Filter by</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuCheckboxItem checked>
//                 Active
//               </DropdownMenuCheckboxItem>
//               <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
//               <DropdownMenuCheckboxItem>
//                 Archived
//               </DropdownMenuCheckboxItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
{/* <Button size="sm" variant="outline" className="h-8 gap-1">
<MdOutlineInsertDriveFile className="h-3.5 w-3.5" />
<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
  Export
</span>
</Button> */}