'use client'
import { useState } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";

import { format } from "date-fns";
import { es } from "date-fns/locale"

import FormActionRecipient from "../form-action-recipient";
import RecipientDeleteButton from "@/components/recipient-delete-button";

import { MdCheck, MdOutlineInsertDriveFile, MdClose, MdInfoOutline, MdMoreHoriz, MdOutlinePause, MdArrowOutward, MdAssignmentAdd, MdOutlinePriorityHigh, MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import ProfileDataSheet from "./(client-components)/profile-dataSheet";


export default function DetailView({ recipient }) {
  // console.log(recipient)

  const assignment = recipient.Assignment[0] 
  const benefits = assignment?.benefit || [];
  // console.log(assignment)
  // const benefitNames = benefits.map((benefit) => benefit.name );
  // const [selectedBenefit, setSelectedBenefit] = useState("");
  
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

  return (
    <div>
      {/* --  Nav  -- */}
      <Card className="p-4">
        <div className="ml-auto flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-10 gap-1">
              <MdOutlineInsertDriveFile className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Exportar Datos</span>
            </Button>
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
      <div className="flex gap-3 mt-3">
        {/* --  Perfil  -- */}
        <ProfileDataSheet recipient={recipient} />
        
        {/* --  Actividad  -- */}
        <div className="w-3/4 flex flex-row gap-2">
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
                <p className="font-thin ">Asignacion de este mes: <span className="font-bold ml-2">{benefits.name}</span></p>
                <Separator />
                <p className="font-thin ">Fecha de Registro: 
                  <span className="font-bold ml-2">
                    {new Date(assignment?.enrollment_date).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </p>
                <Separator />
                <p className="font-thin ">Fecha de Vencimiento: 
                  <span className="font-bold ml-2">
                    {new Date(assignment?.expiry_date).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </p>
                <Separator />
                <p className="font-thin"> Estado de Asignación:
                  <span className={`font-bold ml-2 ${getStatusClass(assignment?.status)}`}>
                    {assignment?.status}
                  </span>
                </p>
                <Separator />
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}
// export default function DetailView({ recipient }) {
//   // console.log(recipient)

//   const assignment = recipient.Assignment[0] 
//   const benefits = assignment?.benefit || [];
//   // console.log(assignment)
//   // const benefitNames = benefits.map((benefit) => benefit.name );
//   // const [selectedBenefit, setSelectedBenefit] = useState("");
  
//   const getStatusClass = (status) => {
//     switch (status) {
//       case "En Proceso":
//         return "text-yellow-500";
//       case "Pendiente":
//         return "text-red-500";
//       case "Concretado":
//         return "text-green-500";
//       default:
//         return "";
//     }
//   };
//   const [openEditModal, setOpenEditModal] = useState(false);

//   return (
//     <div>
//       {/* --  Nav  -- */}
//       <Card className="p-4">
//         <div className="ml-auto flex items-center justify-between ">
//           <div className="flex items-center gap-2">
//             <Button size="sm" variant="outline" className="h-10 gap-1">
//               <MdOutlineInsertDriveFile className="h-3.5 w-3.5" />
//               <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Exportar Datos</span>
//             </Button>
//             <Dialog className="max-w-4xl" open={openEditModal} onOpenChange={setOpenEditModal} >
//               <DialogTrigger asChild>
//                 <Button><MdOutlineEdit className="h-5 w-5 mr-2" /><p>Editar Datos</p></Button>
//               </DialogTrigger>
//               <DialogContent className="z-50">
//                 <DialogHeader>
//                   <DialogTitle>Edicion de Beneficiario</DialogTitle>
//                   <DialogDescription>Asegurese de que no se encuentre en la lista antes de agregar una persona</DialogDescription>
//                 </DialogHeader>
//                 <FormActionRecipient recipient={recipient} />
//               </DialogContent>
//             </Dialog>
//           </div>
//           <RecipientDeleteButton recipientId={recipient.id} />
//         </div>
//       </Card>
//       <div className="flex gap-3 mt-3">
//         {/* --  Perfil  -- */}
//         <ProfileDataSheet recipient={recipient} />
        
//         {/* --  Actividad  -- */}
//         <div className="w-3/4 flex flex-row gap-2">
//         <Card className="w-full" >
//           <CardHeader>
//             <CardTitle>Detalles de {recipient.first_name} {recipient.last_name}</CardTitle>
//             <CardDescription>
//               El Beneficiario cuenta con * asignaciones en los ultimos * años
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-6">
//               <div className="grid gap-3">
//                 <p className="font-thin ">Asignacion de este mes: <span className="font-bold ml-2">{benefits.name}</span></p>
//                 <Separator />
//                 <p className="font-thin ">Fecha de Registro: 
//                   <span className="font-bold ml-2">
//                     {new Date(assignment?.enrollment_date).toLocaleDateString("es-ES", {
//                       day: "2-digit",
//                       month: "2-digit",
//                       year: "numeric",
//                     })}
//                   </span>
//                 </p>
//                 <Separator />
//                 <p className="font-thin ">Fecha de Vencimiento: 
//                   <span className="font-bold ml-2">
//                     {new Date(assignment?.expiry_date).toLocaleDateString("es-ES", {
//                       day: "2-digit",
//                       month: "2-digit",
//                       year: "numeric",
//                     })}
//                   </span>
//                 </p>
//                 <Separator />
//                 <p className="font-thin"> Estado de Asignación:
//                   <span className={`font-bold ml-2 ${getStatusClass(assignment?.status)}`}>
//                     {assignment?.status}
//                   </span>
//                 </p>
//                 <Separator />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


{/* <div className="grid gap-3">
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
</div> */}