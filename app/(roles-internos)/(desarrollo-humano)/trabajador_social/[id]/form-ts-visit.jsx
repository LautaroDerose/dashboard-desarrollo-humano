"use client";

import { useState } from "react";
import { createHomeVisit } from "@/actions/other-actions/credencial-actions";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // Asegúrate de tener esta utilidad

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { FiCalendar } from "react-icons/fi";

export default function FormTsVisit({ assignmentId }) {
  const [error, setError] = useState(null);
  const [visitDate, setVisitDate] = useState(null);

  return (
    <form
      action={async (formData) => {
        setError(null);
        try {
          await createHomeVisit(formData);
          alert("Visita registrada con éxito.");
        } catch (error) {
          setError(error.message);
          alert(error.message); // Mostrar el mensaje de error al usuario
        }
      }}
      className="flex flex-col mt-2"
    >
      <input type="hidden" name="assignmentId" value={assignmentId} />
      <div className="flex gap-2 items-center justify-between">
        <div>
          <label>Indique el estado de la asignacion</label>
          <select
            name="visiting_shift"
            className="w-full px-2 py-1 rounded-sm"
          >
            <option value="Manana">Manana</option>
            <option value="Mediodia">Mediodia</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
          </select>
        </div>
        <div>
          <label>Cambiar de TS</label>
          <select
            name="ts_name"
            className="w-full px-2 py-1 rounded-sm"
          >
            <option value="TS 1">TS 1</option>
            <option value="TS 2">TS 2</option>
            <option value="TS 3">TS 3</option>
          </select>
        </div>
        <div>
          <input type="hidden" name="visit_date" value={visitDate ? format(visitDate, 'yyyy-MM-dd') : ""} />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full h-10 justify-start text-left font-normal", !visitDate && "text-muted-foreground")}>
                <FiCalendar className="mr-2 h-4 w-4" />
                {visitDate ? format(visitDate, "dd/MM/yyyy") : "Seleccione una fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                captionLayout="dropdown-buttons"
                selected={visitDate}
                onSelect={setVisitDate}
                fromYear={1960}
                toYear={2030}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button type="submit" className="">
          Regitrar Visita
        </Button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { createDecreeDoc } from "@/actions/doc-actions/doc-subse-actions";

// export default function CreateDecreeDocForm({ assignmentId }) {
//   return (
//     <form action={createDecreeDoc} className="flex mt-2">
//       <div className="flex gap-2 items-center justify-between">
//         <input type="hidden" name="assignmentId" value={assignmentId} />
//         <div>
//           <Input
//             type="text"
//             name="doc_number"
//             placeholder="Número de Decreto"
//             required
//           />
//         </div>
//         <Button type="submit" className="">
//           Crear Decreto
//         </Button>
//       </div>
//     </form>
//   );
// }