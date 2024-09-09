'use client'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IoFilterSharp } from "react-icons/io5";
import { MdAssignmentAdd, MdOutlineInsertDriveFile } from "react-icons/md";
import { useState } from "react";
import FormActionAssignment from "./(forms)/form-action-assignment";
import { Card } from "@/components/ui/card";
import FormActionSubsidy from "./(forms)/form-subsidy-action";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavigationMenuAssignments from "./navigation-menu";
import FormActionProvider from "./(forms)/form-providers-action";
import FormActionOther from "./(forms)/form-other-action";
import Link from "next/link";


export default function AssignmentLayout({ children }) {

  const [openModalCreate, setOpenModalCreate] = useState(false)
  const [openModalSubsidy, setOpenModalSubsidy] = useState(false)
  const [openModalProvider, setOpenModalProvider] = useState(false)
  const [openModalOther, setOpenModalOther] = useState(false)

  return (
    <div className="flex flex-col mt-4 " >
      {/* <div className="h-screen flex bg-slate-800 p-5">
        < />
      </div> */}
      
      <Card  className="p-4 mx-12 flex">
        <NavigationMenuAssignments />
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
              <Dialog className="max-w-4xl" open={openModalSubsidy} onOpenChange={setOpenModalSubsidy} >
                <DialogTrigger asChild>
                  <Button>
                    <MdAssignmentAdd className="h-5 w-5 mr-2" />
                    <p>Crear Subsidio</p>
                  </Button>
                </DialogTrigger>
                <DialogContent className="z-50">
                  <DialogHeader>
                    <DialogTitle>Crear asignacion de subsidio</DialogTitle>
                    <DialogDescription>Una ddescripcion pertinente</DialogDescription>
                  </DialogHeader>
                  {/* <FormModalAssignment benefits={benefits} recipients={recipients} /> */}
                  <FormActionSubsidy  />
                  {/* <FormActionAssignment benefits={benefits} recipients={recipients} /> */}
                </DialogContent>
              </Dialog>
              {/* <Dialog className="max-w-4xl" open={openModalProvider} onOpenChange={setOpenModalProvider} >
                <DialogTrigger asChild>
                  <Button>
                    <MdAssignmentAdd className="h-5 w-5 mr-2" />
                    <p>Subsidio de Proveedores</p>
                  </Button>
                </DialogTrigger>
                <DialogContent className="z-50">
                  <DialogHeader>
                    <DialogTitle>Crear asignacion de Provedores</DialogTitle>
                    <DialogDescription>Una descripcion pertinente</DialogDescription>
                  </DialogHeader>
                  <FormActionProvider />
                </DialogContent>
              </Dialog> */}
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
                    <Link href='/dashboard/assignments/formulario-consulta'>
                      Credencial Hospitalaria
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='/dashboard/assignments/formulario-agua'>
                      Agua
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='/dashboard/assignments/formulario-atmosferico'>
                      Atmosferico
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='/dashboard/assignments/formulario-pasajes'>
                      Pasajes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='/dashboard/assignments/formulario-lena'>
                      Lena
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='/dashboard/assignments/formulario-garrafa'>
                      Garrafa
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <Dialog className="max-w-4xl" open={openModalCreate} onOpenChange={setOpenModalCreate} >
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
                  <FormActionAssignment  />
                </DialogContent>
              </Dialog> */}
              
          </div>
        </Card>
      <div className=" flex-auto px-4">
        {children}
      </div>
    </div>
  );
}