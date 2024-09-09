"use client";

import { useState } from "react";
import { createCredentialObservation } from "@/actions/other-actions/credencial-actions"; // Tu server action
import { Button } from "@/components/ui/button";

export default function FormTsObservation({ assignmentId, recipientId, closeModal }) {
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para manejar la confirmación
  const [formData, setFormData] = useState({
    author: "",
    subject: "",
    text: "",
  });

  // Manejador del formulario
  const handleSubmit = async (formData) => {
    setError(null);
    try {
      await createCredentialObservation(formData); // Server action
      alert("Observación creada con éxito.");
      setFormData({
        author: "",
        subject: "",
        text: "",
      });
      setShowConfirmation(false)
      closeModal()
    } catch (error) {
      setError(error.message);
      alert(error.message); // Mostrar el mensaje de error al usuario
    }
  };

  // Controlar inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      {/* Campos ocultos */}
      <input type="hidden" name="assignmentId" value={assignmentId} />
      <input type="hidden" name="recipientId" value={recipientId} />

      {/* Autor y asunto */}
      <div className="flex gap-4 items-center justify-between">
        <input
          type="text"
          name="author"
          placeholder="Autor"
          className="w-full px-4 py-2"
          value={formData.author}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Asunto"
          className="w-full px-4 py-2"
          value={formData.subject}
          onChange={handleInputChange}
        />
      </div>

      {/* Texto */}
      <textarea
        name="text"
        placeholder="Texto"
        className="w-full px-4 py-2"
        value={formData.text}
        onChange={handleInputChange}
      />

      {/* Botón para abrir la confirmación */}
      <Button onClick={handleConfirm} className="">
        Guardar Obsevacion
      </Button>

      {/* Mostrar errores si los hay */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2>Confirmar Observación</h2>
            <p className="text-slate-700"><strong>Autor:</strong> {formData.author}</p>
            <p className="text-slate-700"><strong>Asunto:</strong> {formData.subject}</p>
            <p className="text-slate-700"><strong>Texto:</strong> {formData.text}</p>

            {/* Confirmar o cancelar */}
            <div className="flex justify-between mt-4">
              <Button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-500"
              >
                Editar
              </Button>
              <Button
                type="submit"
                className="bg-blue-500"
              >
                Confirmar
                
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
// "use client";

// import { useState } from "react";
// import { createHomeVisit } from "@/actions/other-actions/credencial-actions";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils"; // Asegúrate de tener esta utilidad

// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// import { FiCalendar } from "react-icons/fi";

// export default function FormTsObservation({ assignmentId, recipientId }) {
//   const [error, setError] = useState(null);
//   const [visitDate, setVisitDate] = useState(null);

//   return (
//     <form
//       action={async (formData) => {
//         setError(null);
//         try {
//           await createHomeVisit(formData);
//           alert("Documento de decreto creado con éxito.");
//         } catch (error) {
//           setError(error.message);
//           alert(error.message); // Mostrar el mensaje de error al usuario
//         }
//       }}
//       className="flex flex-col gap-2 mt-2"
//     >
//       <input type="hidden" name="assignmentId" value={assignmentId} />
//       <input type="hidden" name="recipientId" value={recipientId} />

//       <div className="flex gap-4 items-center justify-between">
//         <input type="text" name="author" placeholder="autor" className="w-full px-4 py-2" />
//         <input type="text" name="subject" placeholder="Asunto" className="w-full px-4 py-2" />
//       </div>
//       <div>
//       </div>
//       <textarea name="text" placeholder="texto" />
      
//       <Button type="submit" className="">
//         Regitrar Visita
//       </Button>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </form>
//   );
// }