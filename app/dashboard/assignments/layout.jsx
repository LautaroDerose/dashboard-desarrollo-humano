'use client'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IoFilterSharp } from "react-icons/io5";
import { MdAssignmentAdd, MdOutlineInsertDriveFile } from "react-icons/md";
import { useState } from "react";
import FormActionAssignment from "./form-action-assignment";
import { Card } from "@/components/ui/card";


export default function AssignmentLayout({ children }) {

  const [openModalCreate, setOpenModalCreate] = useState(false)

  return (
    <div className="flex flex-col mt-4 " >
      {/* <div className="h-screen flex bg-slate-800 p-5">
        <Sidebar />
      </div> */}
      
      <Card  className="p-4 mx-12">
        <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <IoFilterSharp className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Archived
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <MdOutlineInsertDriveFile className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Dialog className="max-w-4xl" open={openModalCreate} onOpenChange={setOpenModalCreate} >
                <DialogTrigger asChild>
                  <Button>
                    <MdAssignmentAdd className="h-5 w-5 mr-2" />
                    <p>Agregar Asignacion</p>
                  </Button>
                </DialogTrigger>
                <DialogContent className="z-50">
                  <DialogHeader>
                    <DialogTitle>Crear Asignacion</DialogTitle>
                    <DialogDescription>Una ddescripcion pertinente</DialogDescription>
                  </DialogHeader>
                  {/* <FormModalAssignment benefits={benefits} recipients={recipients} /> */}
                  <FormActionAssignment  />
                  {/* <FormActionAssignment benefits={benefits} recipients={recipients} /> */}
                </DialogContent>
              </Dialog>
          </div>
        </Card>
      <div className=" flex-auto px-4">
        {children}
      </div>
    </div>
  );
}