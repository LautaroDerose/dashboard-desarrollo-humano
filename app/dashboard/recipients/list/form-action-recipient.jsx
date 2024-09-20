// 'use client';

// import { useState } from "react";
// import { createRecipient, editRecipient, getData } from "@/actions/recipient-actions";
// import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "@/components/ui/multi-select";
// import { Button } from "@/components/ui/button";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import { FiCalendar } from "react-icons/fi";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import { es } from "date-fns/locale";

// export default async function FormActionRecipient({ recipient }) {
//   const [birthDate, setBirthDate] = useState(recipient?.birth_date ? new Date(recipient.birth_date) : null);
//   const [selectedSocialConditions, setSelectedSocialConditions] = useState(recipient?.recipientSocialConditions.map(c => c.social_condition.name) || []);

//   const { localities, socialConditions } = await getData();

//   const functionAction = recipient?.id ? editRecipient : createRecipient;

//   return (
//     <form action={functionAction} className="flex flex-col gap-y-4">
//       {recipient && <input type="hidden" name="id" value={recipient?.id} />}
//       <input
//         type="text"
//         name="first_name"
//         defaultValue={recipient?.first_name}
//         placeholder="Nombre"
//         className="w-full px-2 py-1 rounded-sm"
//       />
//       <input
//         type="text"
//         name="last_name"
//         defaultValue={recipient?.last_name}
//         placeholder="Apellido"
//         className="w-full px-2 py-1 rounded-sm"
//       />
//       <input
//         type="text"
//         name="dni"
//         defaultValue={recipient?.dni}
//         placeholder="DNI"
//         className="w-full px-2 py-1 rounded-sm"
//       />
//       <input type="hidden" name="birth_date" value={birthDate ? format(birthDate, 'yyyy-MM-dd') : ""} />
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button variant="outline" className={!birthDate && "text-muted-foreground"}>
//             <FiCalendar className="mr-2 h-4 w-4" />
//             {birthDate ? format(birthDate, "dd/MM/yyyy") : "Seleccione una fecha"}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent>
//           <Calendar
//             mode="single"
//             selected={birthDate}
//             onSelect={setBirthDate}
//           />
//         </PopoverContent>
//       </Popover>

//       <select name="sex" className="w-full px-2 py-1 rounded-sm">
//         <option value="">{recipient?.sex || "Seleccione el sexo"}</option>
//         <option value="Femenino">Femenino</option>
//         <option value="Masculino">Masculino</option>
//       </select>

//       <select name="locality" className="w-full px-2 py-1 rounded-sm">
//         <option value="">{recipient?.contact_info?.locality?.name || "Seleccione una localidad"}</option>
//         {localities.map((locality) => (
//           <option key={locality.id} value={locality.id}>
//             {locality.name}
//           </option>
//         ))}
//       </select>

//       <select name="street" className="w-full px-2 py-1 rounded-sm">
//         <option value="">{recipient?.contact_info?.street?.name || "Seleccione una calle"}</option>
//         {localities.find(l => l.id == recipient?.contact_info?.locality?.id)?.Street.map((street) => (
//           <option key={street.id} value={street.id}>
//             {street.name}
//           </option>
//         ))}
//       </select>

//       <input
//         type="text"
//         name="street_number"
//         defaultValue={recipient?.contact_info?.street_number}
//         placeholder="Número de Calle"
//         className="w-full px-2 py-1 rounded-sm"
//       />

//       <input
//         type="text"
//         name="email"
//         defaultValue={recipient?.contact_info?.email}
//         placeholder="Correo Electrónico"
//         className="w-full px-2 py-1 rounded-sm"
//       />

//       <input
//         type="text"
//         name="phone"
//         defaultValue={recipient?.contact_info?.phone}
//         placeholder="Teléfono"
//         className="w-full px-2 py-1 rounded-sm"
//       />

//       <MultiSelector onValuesChange={setSelectedSocialConditions} values={selectedSocialConditions}>
//         <MultiSelectorTrigger>
//           <MultiSelectorInput placeholder="Seleccione una o varias condiciones" />
//         </MultiSelectorTrigger>
//         <MultiSelectorContent>
//           <MultiSelectorList>
//             {socialConditions.map((condition) => (
//               <MultiSelectorItem key={condition.id} value={condition.name}>
//                 {condition.name}
//               </MultiSelectorItem>
//             ))}
//           </MultiSelectorList>
//         </MultiSelectorContent>
//       </MultiSelector>

//       <input type="hidden" name="social_conditions" value={JSON.stringify(selectedSocialConditions)} />

//       <Button type="submit">
//         {recipient?.id ? "Editar datos" : "Crear Beneficiario"}
//       </Button>
//     </form>
//   );
// }

'use client'

import { useState, useEffect } from "react";
import { createRecipient, editRecipient, getData } from "@/actions/recipient-actions";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { FiCalendar } from "react-icons/fi";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // Asegúrate de tener esta utilidad
import { es } from "date-fns/locale"


export default function FormActionRecipient({ recipient }) {
  const [localities, setLocalities] = useState([]);
  const [streets, setStreets] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState(recipient?.contact_info[0]?.locality?.id || "");
  const [birthDate, setBirthDate] = useState(recipient?.birth_date ? new Date(recipient.birth_date) : null);
  const [socialConditions, setSocialConditions] = useState([]);
  const [selectedSocialConditions, setSelectedSocialConditions] = useState(recipient?.recipientSocialConditions.map(c => c.social_condition.name) || []);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setLocalities(data.localities);
      setSocialConditions(data.socialConditions);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedLocality) {
      const locality = localities.find(l => l.id === parseInt(selectedLocality));
      setStreets(locality ? locality.Street : []);
    } else {
      setStreets([]);
    }
  }, [selectedLocality, localities]);

  const functionAction = recipient?.id ? editRecipient : createRecipient;
// console.log("que funcion es:",functionAction())
  return (
    <div>
      <form 
        action={functionAction}
        className="flex flex-col gap-y-4"
      >
        {
          recipient ? <input type="hidden" name="id" value={recipient?.id} /> : ""
        }

        <input
          type="text"
          name="first_name"
          defaultValue={recipient?.first_name}
          placeholder="Nombre"
          className="w-full px-2 py-1 rounded-sm"
        />
        <input
          type="text"
          name="last_name"
          defaultValue={recipient?.last_name}
          placeholder="Apellido"
          className="w-full px-2 py-1 rounded-sm"
        />
        <input
          type="text"
          name="dni"
          defaultValue={recipient?.dni}
          placeholder="DNI"
          className="w-full px-2 py-1 rounded-sm"
        />
        <input type="hidden" name="birth_date" value={birthDate ? format(birthDate, 'yyyy-MM-dd') : ""} />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-full h-10 justify-start text-left font-normal", !birthDate && "text-muted-foreground")}>
              <FiCalendar className="mr-2 h-4 w-4" />
              {birthDate ? format(birthDate, "dd/MM/yyyy") : "Seleccione una fecha"}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar
              mode="single"
              captionLayout="dropdown-buttons"
              selected={birthDate}
              onSelect={setBirthDate}
              fromYear={1960}
              toYear={2030}
            />
          </PopoverContent>
        </Popover>
       
        <select name="sex" className="w-full px-2 py-1 rounded-sm" >
          <option selected>
              {
                recipient?.id ? <p>{recipient?.sex}</p> : "Indique el sexo correspondiente"
              }
           </option>
          <option value="Femenino">Femenino</option>
          <option value="Masculino">Masculino</option>
        </select>

        <select
          name="locality"
          className="w-full px-2 py-1 rounded-sm"
          value={selectedLocality}
          onChange={(e) => setSelectedLocality(e.target.value)}
        >
           <option value="">
             {
               recipient?.id ? <p>{recipient?.contact_info.locality.name}</p> : "Seleccione una localidad"
             }
           </option>
          {localities.map((locality) => (
            <option key={locality.id} value={locality.id}>
              {locality.name}
            </option>
          ))}
        </select>
        <select
          name="street"
          className="w-full px-2 py-1 rounded-sm"
          disabled={!selectedLocality}
          defaultValue={recipient?.contact_info?.street?.id}
        >
          <option value="">
            {
              recipient?.id ? <p>{recipient?.contact_info.street.name}</p> : "Seleccione una calle"
            }
          </option>
          {streets.map((street) => (
            <option key={street.id} value={street.id}>
              {street.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="street_number"
          defaultValue={recipient?.contact_info?.street_number}
          placeholder="Número de Calle"
          className="w-full px-2 py-1 rounded-sm"
        />
        <input
          type="text"
          name="email"
          defaultValue={recipient?.contact_info?.email}
          placeholder="Correo Electrónico"
          className="w-full px-2 py-1 rounded-sm"
        />
        <input
          type="text"
          name="phone"
          defaultValue={recipient?.contact_info?.phone}
          placeholder="Teléfono"
          className="w-full px-2 py-1 rounded-sm"
        />
        <MultiSelector
          // name="social_conditions"
          onValuesChange={(values) => setSelectedSocialConditions(values)}
          values={selectedSocialConditions}
        >
          <MultiSelectorTrigger>
            <MultiSelectorInput placeholder="Seleccione una o varias condiciones" />
          </MultiSelectorTrigger>
          <MultiSelectorContent>
            <MultiSelectorList>
              <ScrollArea className="h-40">
                {Array.isArray(socialConditions) && socialConditions.length > 0 && socialConditions.map((condition) => (
                  <MultiSelectorItem key={condition.id} value={condition.name}>
                    <div className="flex items-center space-x-2">
                      <span>{condition.name}</span>
                    </div>
                  </MultiSelectorItem>
                ))}
              </ScrollArea>
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
        {/* Input hidden para enviar social_conditions */}
        <input
          type="hidden"
          name="social_conditions"
          value={JSON.stringify(selectedSocialConditions)}
        />
        <Button type="submit">
          {recipient?.id ? "Editar datos" : "Crear Beneficiario"}
        </Button>
      </form>
    </div>
  );
}
