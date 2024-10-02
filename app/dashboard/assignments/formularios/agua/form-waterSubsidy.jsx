'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {  createSubsidyAssignment, getRecipientsAndBenefits } from "@/actions/assignment-actions";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { FiCalendar } from "react-icons/fi";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // Asegúrate de tener esta utilidad
import { createWaterSubsidy } from "@/actions/subsidy-actions/waterSubsidy-actions";


import { parse, isValid } from "date-fns"; // Utiliza date-fns para validar fechas

// const DateInput = ({ onDateChange }) => {
//   const [date, setDate] = useState("");

//   const handleDateChange = (e) => {
//     let value = e.target.value.replace(/\D/g, ""); // Remueve cualquier carácter no numérico
//     let day = value.slice(0, 2);
//     let month = value.slice(2, 4);
//     let year = value.slice(4, 8);

//     if (day > 31) day = "31"; // No mayor que 31 para día
//     if (month > 12) month = "12"; // No mayor que 12 para mes
//     if (year > 3000) year = "3000"; // No mayor que 3000 para año

//     let formattedDate = day;
//     if (month) formattedDate += "/" + month;
//     if (year) formattedDate += "/" + year;

//     setDate(formattedDate);

//     // Validar si la fecha es válida y convertir a Date
//     if (formattedDate.length === 10) {
//       const parsedDate = parse(formattedDate, "dd/MM/yyyy", new Date());
//       if (isValid(parsedDate)) {
//         onDateChange(parsedDate); // Enviar la fecha como objeto Date válido
//       }
//     }
//   };

//   return (
//     <input
//       name="period"
//       type="text"
//       placeholder="DD/MM/YYYY"
//       className="w-full px-2 py-1 rounded-sm"
//       value={date}
//       onChange={handleDateChange}
//       maxLength={10} // Limita el largo del input
//     />
//   );
// };

// const DateInput = () => {
//   const [date, setDate] = useState("");

//   const handleDateChange = (e) => {
//     const value = e.target.value.replace(/\D/g, ""); // Remueve cualquier carácter no numérico
//     const day = value.slice(0, 2);
//     const month = value.slice(2, 4);
//     const year = value.slice(4, 8);

//     let formattedDate = day;
//     if (month) formattedDate += "/" + month;
//     if (year) formattedDate += "/" + year;

//     setDate(formattedDate);
//   };

//   return (
//     <input
//       name="period"
//       type="text"
//       placeholder="DD/MM/YYYY"
//       className="w-full px-2 py-1 rounded-sm"
//       value={date}
//       onChange={handleDateChange}
//       maxLength={10} // Limita el largo del input
//     />
//   );
// };


export default function FormWaterSubsidy({recipients, benefits}) {
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  
  return (
    <div className="">
      <form action={createWaterSubsidy} className="flex flex-col gap-4">
        <select
          name="recipient"
          className="w-full px-2 py-1 rounded-sm"
          value={selectedRecipient}
          onChange={(e) => setSelectedRecipient(e.target.value)}
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
        <div className="grid grid-cols-2 gap-4">
          <input type="hidden" name="enrollment_date" value={enrollmentDate ? format(enrollmentDate, 'yyyy-MM-dd') : ""} />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full h-10 justify-start text-left font-normal", !enrollmentDate && "text-muted-foreground")}>
                <FiCalendar className="mr-2 h-4 w-4" />
                {enrollmentDate ? format(enrollmentDate, "dd/MM/yyyy") : "Seleccione una fecha"}
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
          <input type="hidden" name="expiry_date" value={expiryDate ? format(expiryDate, 'yyyy-MM-dd') : ""} />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full h-10 justify-start text-left font-normal", !expiryDate && "text-muted-foreground")}>
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
          
          {/* input para WaterSubsidy */}
          
          <input
            name="supply_number"
            type="text"
            placeholder="Numero de suministro"
            className="w-full px-2 py-1 rounded-sm"
          />
          <input
            name="supply_value"
            type="text"
            placeholder="Valor de Suministro"
            className="w-full px-2 py-1 rounded-sm"
          />
          <input
            name="user_number"
            type="text"
            placeholder="Numero de usuario"
            className="w-full px-2 py-1 rounded-sm"
          />
          <div>
            <label>Periodo</label>
            <input
              name="period"
              type="date"
              placeholder="Periodo"
              className="w-full px-2 py-1 rounded-sm"
            />
            {/* <DateInput /> */}
          </div>
          <div>
            <input
              name="first_expiry"
              type="date"
              placeholder="1° Vencimiento"
              className="w-full px-2 py-1 rounded-sm"
            />
          </div>
          <div>
            <label>2° Vencimiento</label>
            <input
              name="second_expiry"
              type="date"
              placeholder="2° Vencimiento"
              className="w-full px-2 py-1 rounded-sm"
            />
          </div>

        </div>

        {/* <label>Indique el estado de la asignación</label>
        <select name="status" className="w-full px-2 py-1 rounded-sm">
          <option selected>
           Indique el estado de la asignación
          </option>
          <option value="Rechazado">Rechazado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En proceso">En proceso</option>
          <option value="En revision">En revisión</option>
          <option value="Concretado">Concretado</option>
        </select> */}
        <Button type="submit">
          Crear Asignación
        </Button>
      </form>
    </div>
  );
}