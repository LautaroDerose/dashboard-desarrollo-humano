'use client'
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { MdAssignmentAdd, MdOutlineInsertDriveFile, MdPersonAdd } from "react-icons/md";
import FormActionRecipient from "./list/form-action-recipient";

export default function AssignmentLayout({ children }) {
  const [openModalCreate, setOpenModalCreate] = useState(false)

  return (
    <div className="flex flex-col mt-4 " >
      <Card  className="flex items-center justify-between gap-4 p-4 mx-4">
        <div className="flex gap-3">
          <Link href="/dashboard/recipients/">
            <Button variant="outline">
              Panel
            </Button>
          </Link>
          <Link href="/dashboard/recipients/list">
            <Button variant="outline">
              Lista
            </Button>
          </Link>
          <Link href="/dashboard/recipients/inactivos">
            <Button variant="outline">
              Usuarios Inactivos
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-4 ">
          <Dialog className="max-w-4xl" open={openModalCreate} onOpenChange={setOpenModalCreate} >
            <DialogTrigger asChild>
              <Button>
                <MdPersonAdd className="h-5 w-5 mr-2" />
                <p>Agregar Persona</p>
              </Button>
            </DialogTrigger>
            <DialogContent className="z-50">
              <DialogHeader>
                <DialogTitle>Crear Persona</DialogTitle>
                <DialogDescription>Asegurese de que no se encuentre en la lista antes de agregar una persona</DialogDescription>
              </DialogHeader>
              <FormActionRecipient />
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button  className=" gap-1">
                <MdAssignmentAdd className="h-5 w-5 mr-2" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  ID Grupo Familiar
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>Formularios</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem >
                <Link href='/dashboard/recipients/grupo-familiar/crear'>
                  Crear Grupo Familiar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href='/dashboard/recipients/grupo-familiar/agregar'>
                  Agregar a Grupo Existente
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