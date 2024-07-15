'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea"

import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import Link from "next/link";
import { MdCheck, MdOutlineInsertDriveFile, MdClose, MdInfoOutline, MdMoreHoriz, MdOutlinePause, MdArrowOutward, MdAssignmentAdd, MdOutlinePriorityHigh, MdOutlineEdit, MdDeleteOutline } from "react-icons/md"
import { FaUserAltSlash } from "react-icons/fa";
import { FormEditRecipient } from "./edit/form-edit-recipient";
import { FormModalRecipient } from "../form-modal-recipient";
import FormActionRecipient from "../form-action-recipient";
import { format } from "date-fns";
import { es } from "date-fns/locale"
import RecipientDeleteButton from "@/components/recipient-components/recipient-delete-button";


function calculateAge(birthDateString) {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

function getInitials(firstName, lastName) {
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
  const initials = firstInitial + lastInitial
  return initials;
}

export default function DetailView({ recipient }) {
  
  const contactInfo = recipient.contact_info[0] || {};
  const socialConditions = recipient.recipientSocialConditions || {};
  const assignment = recipient.Assignment[0] 
  const benefits = assignment?.benefit || [];
  // console.log(assignment)
  // const benefitNames = benefits.map((benefit) => benefit.name );
  // const [selectedBenefit, setSelectedBenefit] = useState("");
  
  const age = calculateAge(recipient.birth_date)
  const initials = getInitials(recipient.first_name, recipient.last_name)

  const getStatusClass = (status) => {
    switch (status) {
      case "En Proceso":
        return "text-yellow-500";
      case "Pendiente":
        return "text-red-500";
      case "Concretado":
        return "text-green-500";
      default:
        return "";
    }
  };
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDesactivateModal, setOpenDesactivateModal] = useState(false);

  return (
    <div>
        <Card className="p-4">
            <div className="ml-auto flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-10 gap-1">
                    <MdOutlineInsertDriveFile className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Exportar Datos
                    </span>
                  </Button>
                  <Dialog className="max-w-4xl" open={openEditModal} onOpenChange={setOpenEditModal} >
                    <DialogTrigger asChild>
                      <Button>
                        <MdOutlineEdit className="h-5 w-5 mr-2" />
                        <p>Editar Datos</p>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="z-50">
                      <DialogHeader>
                        <DialogTitle>Edicion de Beneficiario</DialogTitle>
                        <DialogDescription>Asegurese de que no se encuentre en la lista antes de agregar una persona</DialogDescription>
                      </DialogHeader>
                      <FormActionRecipient recipient={recipient} />
                      {/* <FormModalRecipient recipient={recipient} /> */}
                    </DialogContent>
                  </Dialog>
                  {/* <Button><Link href={`/dashboard/recipients/${recipient.id}/edit`}>Editar Datos</Link></Button> */}
                </div>

                <RecipientDeleteButton recipientId={recipient.id} />

                {/* <Dialog className="max-w-4xl" open={openDesactivateModal} onOpenChange={setOpenDesactivateModal} >
                  <DialogTrigger asChild>
                    <Button variant="destructive" >
                      <FaUserAltSlash className="h-5 w-5 mr-2" />
                      <p>Dar de baja Beneficiario</p>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="z-50">
                    <DialogHeader>
                      <DialogTitle>Esta seguro de desactivar este usuario?</DialogTitle>
                      <DialogDescription >Por favor realice una descripcion de los motivos para desactivar este Beneficiario </DialogDescription>
                    </DialogHeader>
                    <Textarea placeholder="Escriba la descripcion aqui" />
                    <Button variant="destructive">Dar de baja</Button>
                  </DialogContent>
                </Dialog> */}
                
              </div>
          </Card>
      <div className="flex gap-3 mt-3">
        <Card className="w-1/4">
          <CardHeader className="flex items-center justify-center mx-auto">
            <Avatar className=" w-20 h-20">
              {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="" /> */}
              <AvatarFallback className="font-bolds text-3xl">{initials}</AvatarFallback>
            </Avatar>
            <CardTitle> {recipient.first_name} {recipient.last_name}</CardTitle>
            <CardDescription>
              {recipient.sex} |  {age} años de edad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex justify-between">
               <span className="font-extralight  ">Fecha de nacimiento: </span>
               <p>
               {recipient.birth_date ? (
                  <>
                    {new Date(new Date(recipient.birth_date).getTime() + 86400000).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </>
                ) : "No especificada"}
               </p>
              </div>
              <Separator/>
              <div className="flex justify-between">
               <span className="font-extralight  ">DNI: </span><p>{recipient.dni}</p>
              </div>
              <Separator/>
              <div className="flex justify-between">
               <span className="font-extralight  ">Localidad: </span><p>{contactInfo.locality.name}</p>
              </div>
              <Separator/>
              <div className="flex justify-between">
                <span className="font-extralight  ">Direccion: </span><p>{contactInfo.street.name}{" "}{contactInfo.street_number}</p>
              </div>
              <Separator/>
              <div className="flex justify-between">
                <span className="font-extralight  ">Telefono: </span><p>{contactInfo.phone}</p>
              </div>
              <Separator/>
              <div className="flex justify-between">
                <span className="font-extralight  ">Email: </span><p>{contactInfo.email}</p>
              </div>
              <Separator/>
              <div>
                <span className="font-extralight">Condición Social: </span>
                <div className="flex">
                  {socialConditions.map((condition) => (
                    <div key={condition.id}  >
                      <Badge className="mr-2" >
                        {condition.social_condition.name}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="w-3/4 flex flex-row gap-2">
        {/* <Separator orientation="vertical"/> */}
        <Card className="w-full" >
          <CardHeader>
            <CardTitle>Detalles de {recipient.first_name} {recipient.last_name}</CardTitle>
            <CardDescription>
              El Beneficiario cuenta con * asignaciones en los ultimos * años
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                {/* <Label htmlFor="name">Name</Label> */}
                  <p className="font-thin ">Asignacion de este mes: <span className="font-bold ml-2">{benefits.name}</span></p>
                  <Separator />
                  <p className="font-thin ">Fecha de Registro: 
                  <span className="font-bold ml-2">
                    {new Date(assignment.enrollment_date).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span></p>
                  <Separator />
                  <p className="font-thin ">Fecha de Vencimiento: 
                  <span className="font-bold ml-2">
                    {new Date(assignment.expiry_date).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span></p>
                  <Separator />
                  <p className="font-thin">
                    Estado de Asignación:
                    <span className={`font-bold ml-2 ${getStatusClass(assignment.status)}`}>
                      {assignment.status}
                    </span>
                  </p>
                  <Separator />
              </div>
              <div className="grid gap-3">
                  <CardTitle>Historial de Asignaciones</CardTitle>
                  <div className="flex justify-between">
                    <p className="font-thin ">Junio:</p>
                    <span className="font-bold">Alimentos</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <p className="font-thin ">Mayo:</p>
                    <span className="font-bold">Transporte</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <p className="font-thin ">Abril:</p>
                    <span className="font-bold">Alimentos</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <p className="font-thin ">Marzo:</p>
                    <span className="font-bold">Alimentos</span>
                  </div>
                  <Separator />
                  
              </div>
            
            </div>
          </CardContent>
        </Card>
        {/* <FormModalRecipient data={dataSelect} /> */}
        {/* <FormEditRecipient recipient={recipient} /> */}
        </div>
      </div>
    </div>
  );
}

