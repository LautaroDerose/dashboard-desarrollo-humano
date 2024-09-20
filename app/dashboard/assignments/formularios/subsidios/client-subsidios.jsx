'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {  createSubsidyAssignment, getRecipientsAndBenefits } from "@/actions/assignment-actions";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { FiCalendar } from "react-icons/fi";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // Asegúrate de tener esta utilidad

export default function FormSubsidy({ recipients, benefits, assignment }) {
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [selectedBenefit, setSelectedBenefit] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [selectedBenefitCategory, setSelectedBenefitCategory] = useState(null);


  useEffect(() => {
    const selectedBenefitObj = benefits.find(b => b.id === selectedBenefit);
    if (selectedBenefitObj) {
      setSelectedBenefitCategory(selectedBenefitObj.category_id);
    }
  }, [selectedBenefit, benefits]);

  // Filtrar los beneficios que tienen category_id 1
  const filteredBenefits = benefits.filter(benefit => benefit.category_id === 1);

  return (
    <div>
      <form action={createSubsidyAssignment} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <select
            name="recipient"
            className="w-full px-2 py-1 rounded-sm"
            value={selectedRecipient}
            onChange={(e) => setSelectedRecipient(e.target.value)}
          >
            <option value="">Seleccione un Beneficiario </option>
            {recipients.map((recipient) => (
              <option key={recipient.id} value={recipient.id}>
                {recipient.first_name} {recipient.last_name}
              </option>
            ))}
          </select>
          <select
            name="benefit"
            className="w-full px-2 py-1 rounded-sm"
            value={selectedBenefit}
            onChange={(e) => setSelectedBenefit(e.target.value)}
          >
            <option value="">Seleccione un Beneficio </option>
            {filteredBenefits.map((benefit) => (
              <option key={benefit.id} value={benefit.id}>
                {benefit.name}
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

          {/* input para SubsidyStage */}
          <input
            type="hidden"
            name="doc_type"
            value="NOTE_DOC"
          />
          <input
            type="text"
            name="detail_benefit"
            placeholder="Detalle de subsidio"
            className="w-full px-2 py-1 rounded-sm"
          />
          <input
            type="text"
            name="doc_number"
            placeholder="Número de nota"
            className="w-full px-2 py-1 rounded-sm"
          />
          <input
            type="hidden"
            name="created_at"
            value={new Date().toISOString()}
          />
          <input
            type="hidden"
            name="doc_created_at"
            value={new Date().toISOString()}
          />
        </div>
        <Button type="submit">
          Crear Asignación
        </Button>
      </form>
    </div>
  );
}

// 'use client'

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import { FiCalendar } from "react-icons/fi";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils"; // Asegúrate de tener esta utilidad
// import { es } from "date-fns/locale"
// import { createAssignment, getRecipientsAndBenefits } from "@/actions/assignment-actions";


// export default function FormSubsidy({ recipients, benefits }) {
//   const [selectedRecipient, setSelectedRecipient] = useState("");
//   const [selectedBenefit, setSelectedBenefit] = useState("");
//   const [enrollmentDate, setEnrollmentDate] = useState(null);
//   const [expiryDate, setExpiryDate] = useState(null);


// // console.log(selectedBenefit)

//   // Filtrar los beneficios que tienen category_id 1
//   const filteredBenefits = benefits.filter(benefit => benefit.category_id === 1);

//   return (
//     <div>
//       <form action={createAssignment} className=" flex flex-col gap-4" >
//         <div className="grid grid-cols-2 gap-4" >
//           <select
//               name="recipient"
//               className="w-full px-2 py-1 rounded-sm"
//               value={selectedRecipient}
//               onChange={(e) => setSelectedRecipient(e.target.value)}
//             >
//               <option value=""> Seleccione un Beneficiario</option>
//             {recipients.map((recipient) => (
//               <option key={recipient.id} value={recipient.id}>
//                {recipient.first_name}{" "}{recipient.last_name}
//               </option>
//             ))}
//           </select>
//           <select
//             name="benefit"
//             className="w-full px-2 py-1 rounded-sm"
//             value={selectedBenefit}
//             onChange={(e) => setSelectedBenefit(e.target.value)}
//           >
//             <option value="">Seleccione un Beneficio</option>
//             {filteredBenefits.map((benefit) => (
//               <option key={benefit.id} value={benefit.id}>
//                 {benefit.name}
//               </option>
//             ))}
//           </select>
//           <input
//             type="text"
//             name="quantity"
//             placeholder="Cantidad"
//             className="w-full px-2 py-1 rounded-sm"
//           />
//           <input
//             type="text"
//             name="amount"
//             placeholder="Monto"
//             className="w-full px-2 py-1 rounded-sm"
//           />
//           <input type="hidden" name="enrollment_date" value={enrollmentDate ? format(enrollmentDate, 'yyyy-MM-dd') : ""} />
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button variant="outline" className={cn("w-full h-10 justify-start text-left font-normal", !enrollmentDate && "text-muted-foreground")}>
//                 <FiCalendar className="mr-2 h-4 w-4" />
//                 {enrollmentDate ? format(enrollmentDate, "dd/MM/yyyy") : "Seleccione una fecha"}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent align="start" className="w-auto p-0">
//               <Calendar
//                 mode="single"
//                 captionLayout="dropdown-buttons"
//                 selected={enrollmentDate}
//                 onSelect={setEnrollmentDate}
//                 fromYear={1960}
//                 toYear={2030}
//               />
//             </PopoverContent>
//           </Popover>
//           <input type="hidden" name="expiry_date" value={expiryDate ? format(expiryDate, 'yyyy-MM-dd') : ""} />
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button variant="outline" className={cn("w-full h-10 justify-start text-left font-normal", !expiryDate && "text-muted-foreground")}>
//                 <FiCalendar className="mr-2 h-4 w-4" />
//                 {expiryDate ? format(expiryDate, "dd/MM/yyyy") : "Seleccione una fecha"}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent align="start" className="w-auto p-0">
//               <Calendar
//                 mode="single"
//                 captionLayout="dropdown-buttons"
//                 selected={expiryDate}
//                 onSelect={setExpiryDate}
//                 fromYear={1960}
//                 toYear={2030}
//               />
//             </PopoverContent>
//           </Popover>
          
//         </div>       
//         <textarea
//           name="detail"
//           placeholder="Si hace falta ingrese el detalle de la asignacion"
//           className="w-full h-[10vh] p-3 rounded-sm"
//         />
//         <Button type="submit">
//           Crear Asignacion
//         </Button>
//       </form>
//     </div>
//   );
// }