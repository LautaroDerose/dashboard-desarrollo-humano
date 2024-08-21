'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { FiCalendar } from "react-icons/fi";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // Asegúrate de tener esta utilidad
import { es } from "date-fns/locale"
import { createAssignment, getRecipientsAndBenefits } from "@/actions/assignment-actions";


export default function FormActionAssignment({ recipient, benefit, assignment }) {
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(recipient?.id || "");
  const [benefits, setBenefits] = useState([]);
  const [selectedBenefit, setSelectedBenefit] = useState(benefit?.id || "");
  const [enrollmentDate, setEnrollmentDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getRecipientsAndBenefits();
      setRecipients(data.recipients);
      setBenefits(data.benefits);
    }
    fetchData();
  }, []);
// console.log(selectedBenefit)

  // Filtrar los beneficios que tienen category_id 1
  const filteredBenefits = benefits.filter(benefit => benefit.category_id !== 1);

  return (
    <div>
      <form action={createAssignment} className=" flex flex-col gap-4" >
        <div className="grid grid-cols-2 gap-4" >
          <select
              name="recipient"
              className="w-full px-2 py-1 rounded-sm"
              value={selectedRecipient}
              onChange={(e) => setSelectedRecipient(e.target.value)}
            >
              <option value="">
                {
                  recipient ? <p>{recipient?.first_name} {recipient?.laast_name}</p> : "Seleccione un Beneficiario"
                }
              </option>
            {recipients.map((recipient) => (
              <option key={recipient.id} value={recipient.id}>
                <p>{recipient.first_name}{" "}{recipient.last_name}</p>
              </option>
            ))}
          </select>
          <select
              name="benefit"
              className="w-full px-2 py-1 rounded-sm"
              value={selectedBenefit}
              onChange={(e) => setSelectedBenefit(e.target.value)}
            >
              <option value="">
                {
                  benefit ? <p>{benefit?.name} </p> : "Seleccione un Beneficio"
                }
              </option>
            {filteredBenefits.map((benefit) => (
              <option key={benefit.id} value={benefit.id}>
                <p>{benefit.name}</p>
              </option>
            ))}
          </select>
          <input
            type="text"
            name="quantity"
            placeholder="Cantidad"
            className="w-full px-2 py-1 rounded-sm"
          />
          <input
            type="text"
            name="amount"
            placeholder="Monto"
            className="w-full px-2 py-1 rounded-sm"
          />
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
          
        </div>       
        

        <label>Indique el estado de la asignacion</label>
        <select name="status" className="w-full px-2 py-1 rounded-sm" >
          <option selected>
              {
                assignment?.id ? <p>{assignment?.status}</p> : "Indique el estado de la asignacion"
              }
           </option>
          <option value="Rechazado">Rechazado</option>
          <option value="Pendiente"  >Pendiente</option>
          <option value="En proceso">En proceso</option>
          <option value="En revision">En revision</option>
          <option value="En Concretado">Concretado</option>
        </select>
        <Button type="submit">
          Crear Asignacion
        </Button>
      </form>
    </div>
  );
}