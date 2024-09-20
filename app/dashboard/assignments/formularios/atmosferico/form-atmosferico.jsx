'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { FiCalendar } from "react-icons/fi";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // Asegúrate de tener esta utilidad
import { createAtmosferic} from "@/actions/subsidy-actions/atmosferico-actions";

export default function FormAtmosferico({ recipients }) {
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState(null);
  const [desireDate, setDesireDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);

  return (
    <div className="mt-6">
      <form action={createAtmosferic} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
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
          <div>
            {/* <label>Fecha deseada</label> */}
            {/* <input
              name="desire_service_date"
              type="date"
              className="w-full 
              px-2 py-1 rounded-sm"
            /> */}
            <h2>Fecha Deseada</h2>
            <input type="hidden" name="desire_service_date" value={desireDate ? format(desireDate, 'yyyy-MM-dd') : ""} />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full h-10 justify-start text-left font-normal", !desireDate && "text-muted-foreground")}>
                  <FiCalendar className="mr-2 h-4 w-4" />
                  {desireDate ? format(desireDate, "dd/MM/yyyy") : "Seleccione una fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  selected={desireDate}
                  onSelect={setDesireDate}
                  fromYear={1960}
                  toYear={2030}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <h2>Fecha de registro</h2>
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
          </div>
          <div>
          <h2>Fecha de Vencimiento</h2>
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
          </div>
        </div>
        <Button type="submit">
          Crear Asignación
        </Button>
      </form>
    </div>
  );
}