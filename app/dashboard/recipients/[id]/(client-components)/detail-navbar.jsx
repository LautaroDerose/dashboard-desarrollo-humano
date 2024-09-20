'use client'
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FormActionRecipient from "../../list/form-action-recipient";
import RecipientDeleteButton from "@/components/recipient-delete-button";
import { MdOutlineEdit } from "react-icons/md";

export default function DetailNavbar({recipient}) {
  const [openEditModal, setOpenEditModal] = useState(false);

  return(
    <div>
      <Card className="p-4">
        <div className="ml-auto flex items-center justify-between ">
          <div className="flex items-center gap-2">
            {/* <Button size="sm" variant="outline" className="h-10 gap-1">
              <MdOutlineInsertDriveFile className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Exportar Datos</span>
            </Button> */}
            <Dialog className="max-w-4xl" open={openEditModal} onOpenChange={setOpenEditModal} >
              <DialogTrigger asChild>
                <Button><MdOutlineEdit className="h-5 w-5 mr-2" /><p>Editar Datos</p></Button>
              </DialogTrigger>
              <DialogContent className="z-50">
                <DialogHeader>
                  <DialogTitle>Edicion de Beneficiario</DialogTitle>
                  <DialogDescription>Asegurese de que no se encuentre en la lista antes de agregar una persona</DialogDescription>
                </DialogHeader>
                <FormActionRecipient recipient={recipient} />
              </DialogContent>
            </Dialog>
          </div>
          <RecipientDeleteButton recipientId={recipient.id} />
        </div>
      </Card>
    </div>
  )
}