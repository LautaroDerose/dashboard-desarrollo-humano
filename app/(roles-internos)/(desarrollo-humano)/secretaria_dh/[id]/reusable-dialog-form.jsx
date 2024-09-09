'use client'
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MdAssignmentAdd } from "react-icons/md";
import { Button } from "@/components/ui/button";

export default function ReusableDialogForm({ 
  nameButton, 
  dialogTitle, 
  dialogDescription, 
  phone, 
  FormComponent, 
  assignmentId,
  recipientId 
}) {
  const [openModal, setOpenModal] = useState(false);
  // Función para cerrar el modal
  const closeModal = () => setOpenModal(false);


  return (
    <div className="">
      <Dialog className="max-w-4xl" open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <Button>
            <MdAssignmentAdd className="h-5 w-5 mr-2" />
            {nameButton || "Llenar formulario"} {/* Botón dinámico */}
          </Button>
        </DialogTrigger>
        <DialogContent className="z-50">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle> {/* Título dinámico */}
            <DialogDescription>
              {dialogDescription || `Recuerde que antes de registrar la visita debe acordar con la persona previamente al siguiente número ${phone}`}
            </DialogDescription> {/* Descripción dinámica */}
          </DialogHeader>
          <FormComponent assignmentId={assignmentId} recipientId={recipientId} closeModal={closeModal} /> {/* Componente de formulario dinámico */}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// 'use client'
// import { useState } from "react"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { MdAssignmentAdd } from "react-icons/md";
// import { Button } from "@/components/ui/button";
// import FormTsVisit from "./form-ts-visit";

// export default function aDetailForm({assignmentId, phone}) {
//   const [openModal, setOpenModal] = useState(false)

//   return(
//     <div className="">
//       <Dialog className="max-w-4xl" open={openModal} onOpenChange={setOpenModal} >
//         <DialogTrigger asChild>
//           <Button>
//             <MdAssignmentAdd className="h-5 w-5 mr-2" />
//             Editar datos
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="z-50">
//           <DialogHeader>
//             <DialogTitle>Crear de Visita Domiciliaria</DialogTitle>
//             <DialogDescription>Informar al siguiente numero {phone}</DialogDescription>
//           </DialogHeader>
//           <FormTsVisit assignmentId={assignmentId}  />
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }