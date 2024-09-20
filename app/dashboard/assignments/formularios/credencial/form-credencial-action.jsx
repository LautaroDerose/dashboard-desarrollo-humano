'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { FiCalendar } from "react-icons/fi";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { createAssignmentWithCredential } from "@/actions/subsidy-actions/credencial-actions";

export default function FormCredencial({recipients}) {

  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await createAssignmentWithCredential(formData);
      setExpiryDate(null); // Limpiar la fecha después de la creación exitosa
      window.location.reload(); // Recargar la página
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col w-fit gap-2">
          <select
            name="recipient"
            className="w-full px-2 py-1 rounded-sm"
            value={selectedRecipient}
            onChange={(e) => setSelectedRecipient(e.target.value)}
          >
            <option value="">
              {"Seleccione un Beneficiario"}
            </option>
            {recipients.map((recipient) => (
              <option key={recipient.id} value={recipient.id}>
                {`${recipient.first_name} ${recipient.last_name}`}
              </option>
            ))}
          </select>

          <input type="hidden" name="expiry_date" value={expiryDate ? format(expiryDate, 'yyyy-MM-dd') : ""} />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={`w-full h-10 justify-start text-left font-normal ${!expiryDate ? "text-muted-foreground" : ""}`}>
                <FiCalendar className="mr-2 h-4 w-4" />
                {expiryDate ? format(expiryDate, "dd/MM/yyyy") : "Seleccione una fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                captionLayout="dropdown-buttons"
                selected={expiryDate}
                onSelect={setExpiryDate}
                fromYear={1960}
                toYear={2030}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button type="submit">
          Crear Asignación
        </Button>
      </form>
    </div>
  );
}