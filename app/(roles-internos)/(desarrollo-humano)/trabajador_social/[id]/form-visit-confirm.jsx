"use client";

import { useState } from "react";
import { confirmVisit } from "@/actions/other-actions/credencial-actions"; // Tu server action
import { Button } from "@/components/ui/button";

export default function FormVisitConfirm({ assignmentId, recipientId, closeModal }) {
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para manejar la confirmación
 

  // Manejador del formulario
  const handleSubmit = async (formData) => {
    setError(null);
    try {
      await confirmVisit(formData); // Server action
      alert("Observación creada con éxito.");
      setShowConfirmation(false)
      closeModal();
    } catch (error) {
      setError(error.message);
      alert(error.message); // Mostrar el mensaje de error al usuario
    }
  };

  // Mostrar el modal de confirmación
  const handleConfirm = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  return (
    <form
    action={async (formData) => {
      handleSubmit(formData); // Enviar los datos al servidor cuando se confirme
    }}
    className="flex flex-col gap-2 mt-2"
  >
    <input type="hidden" name="assignmentId" value={assignmentId} />

    {/* Botón para abrir la confirmación */}
    <Button onClick={handleConfirm} className="bg-primary text-primary-foreground">
      Confirmar Visita
    </Button>

    {/* Mostrar errores si los hay */}
    {error && <p className="text-destructive mt-2">{error}</p>}

    {/* Modal de confirmación */}
    {showConfirmation && (
      <div className=" modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-card p-6 rounded-lg shadow-lg ">
          <h2 className="text-xl font-bold text-card-foreground">Recuerde..</h2>
          <p className="text-muted-foreground mt-2">¿Has enviado el informe socio-economico a Secretaria?</p>

          {/* Confirmar o cancelar */}
          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setShowConfirmation(false)}
              className="bg-muted text-muted-foreground"
            >
              No, Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground"
            >
              Sí, Confirmar
            </Button>
          </div>
        </div>
      </div>
    )}
  </form>

    // <form
    //   action={async (formData) => {
    //     handleSubmit(formData); // Enviar los datos al servidor cuando se confirme
    //   }}
    //   className="flex flex-col gap-2 mt-2"
    // >
    //   <input type="hidden" name="assignmentId" value={assignmentId} />

    //   {/* Botón para abrir la confirmación */}
    //   <Button onClick={handleConfirm} className="">
    //     Confirmar Visita
    //   </Button>

    //   {/* Mostrar errores si los hay */}
    //   {error && <p className="text-red-500 mt-2">{error}</p>}

    //   {/* Modal de confirmación */}
    //   {showConfirmation && (
    //     <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    //       <div className="bg-white p-6 rounded shadow-lg">
    //         <h2>Recuerde..</h2>
    //         <p>¿Has enviado el informe socio-economico a Secretaria?</p>

    //         {/* Confirmar o cancelar */}
    //         <div className="flex justify-between mt-4">
    //           <Button
    //             onClick={() => setShowConfirmation(false)}
    //             className="bg-gray-500"
    //           >
    //             No, Cancelar
    //           </Button>
    //           <Button
    //             type="submit"
    //             className="bg-blue-500"
    //           >
    //             Si, Confirmar
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </form>
  );
}