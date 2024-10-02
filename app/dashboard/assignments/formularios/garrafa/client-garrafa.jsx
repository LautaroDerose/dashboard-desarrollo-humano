'use client'

import { getRecipientsAndBenefits } from "@/actions/assignment-actions";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { FiCalendar } from "react-icons/fi";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; 
import { createGarrafaAssignment } from "@/actions/subsidy-actions/garrafa-actions";
// import { createGarrafaSubsidy } from "@/actions/other-actions/garrafa-actions"; // Dejado comentado para pruebas

export default function FormGarrafa({ recipients }) {
  const [selectedRecipient, setSelectedRecipient] = useState(null); // Cambiado a null para almacenar recipient completo
  const [enrollmentDate, setEnrollmentDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Imprimir los datos del formulario en la consola para verificar
    console.log('Datos del formulario:', {
      recipient: formData.get("recipient"),
      dni: formData.get("dni"),
      amount: formData.get("amount"),
      provider: formData.get("provider"),
      enrollment_date: formData.get("enrollment_date"),
      expiry_date: formData.get("expiry_date")
    });

    // Envío de los datos comentado para pruebas
    // createGarrafaSubsidy(formData);
  };

  return (
    <div className="">
      <form action={createGarrafaAssignment}className="flex flex-col gap-4">
      {/* <form onSubmit={handleSubmit} className="flex flex-col gap-4"> */}
        {/* Selección de beneficiario */}
        <select
          name="recipient"
          className="w-full px-2 py-1 rounded-sm"
          value={selectedRecipient?.id || ""}
          onChange={(e) => {
            const recipient = recipients.find(r => r.id === parseInt(e.target.value));
            setSelectedRecipient(recipient);
          }}
        >
          <option value="">
            Seleccione un Beneficiario
          </option>
          {recipients.map((recipient) => (
            <option key={recipient.id} value={recipient.id}>
              {recipient.first_name} {recipient.last_name}
            </option>
          ))}
        </select>

        {/* Campo oculto para el DNI */}
        {selectedRecipient && (
          <input type="hidden" name="dni" value={selectedRecipient.dni} />
        )}

        {/* Monto */}
        <input
          type="text"
          name="amount"
          placeholder="Monto"
          className="w-full px-2 py-1 rounded-sm"
        />

        {/* Selección de proveedor */}
        <select name="provider" className="w-full px-2 py-1 rounded-sm">
          <option value="">Seleccione el proveedor</option>
          <option value="Provedor1">Provedor 1</option>
          <option value="Provedor2">Provedor 2</option>
        </select>

        {/* Fecha de registro */}
        <input
          type="hidden"
          name="enrollment_date"
          value={enrollmentDate ? format(enrollmentDate, 'yyyy-MM-dd') : ""}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-full h-10 justify-start text-left font-normal", !enrollmentDate && "text-muted-foreground")}>
              <FiCalendar className="mr-2 h-4 w-4" />
              {enrollmentDate ? format(enrollmentDate, "dd/MM/yyyy") : "Seleccione una fecha de registro"}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar
              mode="single"
              captionLayout="dropdown-buttons"
              selected={enrollmentDate}
              onSelect={setEnrollmentDate}
              fromYear={1960}
              toYear={2030}
            />
          </PopoverContent>
        </Popover>

        {/* Fecha de vencimiento */}
        <input
          type="hidden"
          name="expiry_date"
          value={expiryDate ? format(expiryDate, 'yyyy-MM-dd') : ""}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-full h-10 justify-start text-left font-normal", !expiryDate && "text-muted-foreground")}>
              <FiCalendar className="mr-2 h-4 w-4" />
              {expiryDate ? format(expiryDate, "dd/MM/yyyy") : "Seleccione una fecha de vencimiento"}
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

        {/* Botón de envío */}
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-sm">
          Crear Asignación
        </button>
      </form>
    </div>
  );
}