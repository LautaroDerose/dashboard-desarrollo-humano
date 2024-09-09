'use client';



import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { FiCalendar } from 'react-icons/fi';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { es } from 'date-fns/locale';
import { createAssignmentWithTravelSubsidies, createTravelSubsidyWithAssignment, getRecipientsAndBenefits, testAssignmentWithTravelSubsidies } from '@/actions/other-actions/pasajes-actions';

export default function AssignmentForm() {
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [travelSubsidies, setTravelSubsidies] = useState([{ destination: "", date: "", direction: "", passenger: "", name: "", dni: "", amount: "", provider: "" }]);
  
    const removeTravelSubsidy = (index) => {
      setTravelSubsidies(travelSubsidies.filter((_, i) => i !== index));
    };

    const addTravelSubsidy = () => {
      setTravelSubsidies([...travelSubsidies, { destination: "", date: "", direction: "", passenger: "", name: "", dni: "", amount: "", provider: "" }]);
    };
  
    const handleInputChange = (index, event) => {
      const { name, value } = event.target;
      const fieldName = name.split('_')[0];
      const updatedSubsidies = [...travelSubsidies];
      updatedSubsidies[index][fieldName] = value;
      setTravelSubsidies(updatedSubsidies);
    };

  useEffect(() => {
    async function fetchData() {
      const data = await getRecipientsAndBenefits();
      setRecipients(data.recipients);
    }
    fetchData();
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await createAssignmentWithTravelSubsidies({
  //     recipient_id: selectedRecipient,
  //     travelSubsidies,
  //   });
  // };

  return (
    <form action={createAssignmentWithTravelSubsidies} className='w-fit'>
      {/* Recipient select */}
      <select
        name="recipient_id"
        className="w-full px-2 py-1 rounded-sm"
        value={selectedRecipient}
        onChange={(e) => setSelectedRecipient(e.target.value)}
      >
        <option value="">
          {selectedRecipient ? `${selectedRecipient.first_name} ${selectedRecipient.last_name}` : "Seleccione un Beneficiario"}
        </option>
        {recipients.map((recipient) => (
          <option key={recipient.id} value={recipient.id}>
            {recipient.first_name} {recipient.last_name}
          </option>
        ))}
      </select>

      {/* TravelSubsidy fields */}
      {travelSubsidies.map((subsidy, index) => (
        <div key={index} className="flex flex-col">
          <select name={`destination_${index}`} value={subsidy.destination} onChange={(e) => handleInputChange(index, e)}>
            <option value="">Seleccione Destino</option>
            <option value="bahia blanca">Bahía Blanca</option>
            <option value="carhue">Carhué</option>
          </select>

          <input type="date" name={`date_${index}`} value={subsidy.date} onChange={(e) => handleInputChange(index, e)} placeholder="Date" />

          <select name={`direction_${index}`} value={subsidy.direction} onChange={(e) => handleInputChange(index, e)}>
            <option value="">Seleccione Dirección</option>
            <option value="ida">Ida</option>
            <option value="vuelta">Vuelta</option>
            <option value="ida y vuelta">Ida y Vuelta</option>
          </select>

          <select name={`passenger_${index}`} value={subsidy.passenger} onChange={(e) => handleInputChange(index, e)}>
            <option value="">Seleccione tipo de acompañante</option>
            <option value="unico">Único</option>
            <option value="acompanante">Acompañante</option>
          </select>

          <input type="text" name={`name_${index}`} value={subsidy.name} onChange={(e) => handleInputChange(index, e)} placeholder="Name" />
          <input type="text" name={`dni_${index}`} value={subsidy.dni} onChange={(e) => handleInputChange(index, e)} placeholder="DNI" />
          <input type="number" name={`amount_${index}`} value={subsidy.amount} onChange={(e) => handleInputChange(index, e)} placeholder="Amount" />

          <select name={`provider_${index}`} value={subsidy.provider} onChange={(e) => handleInputChange(index, e)}>
            <option value="">Seleccione Proveedor</option>
            <option value="empresa1">Empresa 1</option>
            <option value="empresa2">Empresa 2</option>
          </select>

          <button type="button" onClick={() => removeTravelSubsidy(index)}>Eliminar</button>
        </div>
      ))}

      <button type="button" onClick={addTravelSubsidy}>Agregar Travel Subsidy</button>
      <button type="submit">Crear Assignment con Travel Subsidies</button>
    </form>
  );
}

// export default function AssignmentForm() {
//   const [recipients, setRecipients] = useState([]);
//   const [selectedRecipient, setSelectedRecipient] = useState("");
//   const [travelSubsidies, setTravelSubsidies] = useState([{ destination: "", date: "", direction: "", passenger: "", name: "", dni: "", amount: "", provider: "" }]);

//   const addTravelSubsidy = () => {
//     setTravelSubsidies([...travelSubsidies, { destination: "", date: "", direction: "", passenger: "", name: "", dni: "", amount: "", provider: "" }]);
//   };

//   const removeTravelSubsidy = (index) => {
//     setTravelSubsidies(travelSubsidies.filter((_, i) => i !== index));
//   };

//   const handleInputChange = (index, event) => {
//     const { name, value } = event.target;
//     const fieldName = name.split('_')[0]; // Obtén el nombre del campo sin el índice
//     const values = [...travelSubsidies];
//     values[index][fieldName] = value;
//     setTravelSubsidies(values);
//   };

//   useEffect(() => {
//     async function fetchData() {
//       const data = await getRecipientsAndBenefits();
//       setRecipients(data.recipients);
//     }
//     fetchData();
//   }, []);

 
//   return (
//     // <form onSubmit={async (e) => {
//     //     e.preventDefault();
//     //     await createAssignmentWithTravelSubsidies({
//     //       recipient_id: selectedRecipient,
//     //       travelSubsidies
//     //     });
//     //   }} 
//     //   className='w-fit'
//     // >
//     <form action={createAssignmentWithTravelSubsidies} 
//       className='w-fit'
//     >
//       {/* Recipient select */}
//       <select
//         name="recipient_id"
//         className="w-full px-2 py-1 rounded-sm"
//         value={selectedRecipient}
//         onChange={(e) => setSelectedRecipient(e.target.value)}
//       >
//         <option value="">
//           {selectedRecipient ? `${selectedRecipient.first_name} ${selectedRecipient.last_name}` : "Seleccione un Beneficiario"}
//         </option>
//         {recipients.map((recipient) => (
//           <option key={recipient.id} value={recipient.id}>
//             {recipient.first_name} {recipient.last_name}
//           </option>
//         ))}
//       </select>

//       {/* TravelSubsidy fields */}
//       {travelSubsidies.map((subsidy, index) => (
//         <div key={index} className='flex flex-col'>
//           <select name={`destination_${index}`} value={subsidy.destination} onChange={(e) => handleInputChange(index, e)} >
//             <option value="">Seleccione Destino</option>
//             <option value="bahia blanca">Bahía Blanca</option>
//             <option value="carhue">Carhué</option>
//           </select>

//           <input type="date" name={`date_${index}`} value={subsidy.date} onChange={(e) => handleInputChange(index, e)} placeholder="Date" />

//           <select name={`direction_${index}`} value={subsidy.direction} onChange={(e) => handleInputChange(index, e)} >
//             <option value="">Seleccione Dirección</option>
//             <option value="ida">Ida</option>
//             <option value="vuelta">Vuelta</option>
//             <option value="ida y vuelta">Ida y Vuelta</option>
//           </select>
          
//           <select name={`passenger_${index}`} value={subsidy.passenger} onChange={(e) => handleInputChange(index, e)} >
//             <option value="">Seleccione tipo de acompañante</option>
//             <option value="unico">Unico</option>
//             <option value="acompanante">Acompañante</option>
//           </select>

//           <input type="text" name={`name_${index}`} value={subsidy.name} onChange={(e) => handleInputChange(index, e)} placeholder="Name" />
//           <input type="text" name={`dni_${index}`} value={subsidy.dni} onChange={(e) => handleInputChange(index, e)} placeholder="DNI" />
//           <input type="number" name={`amount_${index}`} value={subsidy.amount} onChange={(e) => handleInputChange(index, e)} placeholder="Amount" />

//           <select name={`provider_${index}`} value={subsidy.provider} onChange={(e) => handleInputChange(index, e)} >
//             <option value="">Seleccione Proveedor</option>
//             <option value="empresa1">Empresa 1</option>
//             <option value="empresa2">Empresa 2</option>
//           </select>

//           <button type="button" onClick={() => removeTravelSubsidy(index)}>Eliminar</button>
//         </div>
//       ))}

//       <button type="button" onClick={addTravelSubsidy}>Agregar Travel Subsidy</button>
//       <button type="submit">Crear Assignment con Travel Subsidies</button>
//     </form>
//   );
// }
// ------------------------------------------------------------------------
// 'use client';



// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
// import { FiCalendar } from 'react-icons/fi';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { cn } from '@/lib/utils';
// import { es } from 'date-fns/locale';
// import { createTravelSubsidyWithAssignment, getRecipientsAndBenefits } from '@/actions/other-actions/pasajes-actions';

// export default function FormActionCredencial({ recipient, benefit, assignment }) {
//   const [recipients, setRecipients] = useState([]);
//   const [selectedRecipient, setSelectedRecipient] = useState('');
//   const [tickets, setTickets] = useState([{ type: 'principal', name: '', dni: '', direction: 'IDA', date: null, provider: '', amount: '' }]);

//   useEffect(() => {
//     async function fetchData() {
//       const data = await getRecipientsAndBenefits();
//       setRecipients(data.recipients);
//     }
//     fetchData();
//   }, []);

//   const addTicket = () => {
//     setTickets([...tickets, { type: 'principal', name: '', dni: '', direction: 'IDA', date: null, provider: '', amount: '' }]);
//   };

//   const removeTicket = (index) => {
//     const newTickets = tickets.filter((_, i) => i !== index);
//     setTickets(newTickets);
//   };

//   const updateTicket = (index, field, value) => {
//     const newTickets = tickets.map((ticket, i) => {
//       if (i === index) {
//         return { ...ticket, [field]: value };
//       }
//       return ticket;
//     });
//     setTickets(newTickets);
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const formData = new FormData(e.target);
//   //   await createTravelSubsidyWithAssignment(formData);
//   // }

//   return (
//     <div className="mt-6">
//       <form action={createTravelSubsidyWithAssignment} className="flex flex-col gap-4">
//       {/* <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-4"> */}
//         <div className="grid grid-cols-2 gap-4">
//           <select
//             name="recipient"
//             className="w-full px-2 py-1 rounded-sm"
//             value={selectedRecipient}
//             onChange={(e) => setSelectedRecipient(e.target.value)}
//           >
//             <option value="">
//               {recipient ? `${recipient?.first_name} ${recipient?.last_name}` : 'Seleccione un Beneficiario'}
//             </option>
//             {recipients.map((recipient) => (
//               <option key={recipient.id} value={recipient.id}>
//                 {recipient.first_name} {recipient.last_name}
//               </option>
//             ))}
//           </select>
//           <div>
//             <div className="flex">
//               <span>Tipo de beneficio:</span><p className="ml-4">Pasajes</p>
//             </div>
//           </div>
//           <div>
//             <label>Cantidad de pasajes</label>
//             <input
//               name="total_tickets"
//               type="text"
//               value={tickets.length}
//               readOnly
//               className="w-full px-2 py-1 rounded-sm"
//             />
//           </div>
//           <div>
//             <label>Destino</label>
//             <input
//               type="text"
//               name="destination"
//               placeholder="Ej.: Bahia Blanca"
//               className="w-full px-2 py-1 rounded-sm"
//             />
//           </div>
//         </div>

//         {tickets.map((ticket, index) => (
//           <div key={index} className="border p-4 rounded-sm">
//             <div className="flex justify-between items-center">
//               <h3>Ticket {index + 1}</h3>
//               <Button type="button" onClick={() => removeTicket(index)}>Eliminar</Button>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <select
//                 name={`tickets_type[]`}
//                 value={ticket.type}
//                 onChange={(e) => updateTicket(index, 'type', e.target.value)}
//                 className="w-full px-2 py-1 rounded-sm"
//               >
//                 <option value="principal">Principal</option>
//                 <option value="acompanante">Acompañante</option>
//               </select>
//               <input
//                 type="text"
//                 name={`tickets_name[]`}
//                 value={ticket.name}
//                 placeholder="Nombre del pasajero"
//                 onChange={(e) => updateTicket(index, 'name', e.target.value)}
//                 className="w-full px-2 py-1 rounded-sm"
//               />
//               <input
//                 type="text"
//                 name={`tickets_dni[]`}
//                 value={ticket.dni}
//                 placeholder="DNI del pasajero"
//                 onChange={(e) => updateTicket(index, 'dni', e.target.value)}
//                 className="w-full px-2 py-1 rounded-sm"
//               />
//               <select
//                 name={`tickets_direction[]`}
//                 value={ticket.direction}
//                 onChange={(e) => updateTicket(index, 'direction', e.target.value)}
//                 className="w-full px-2 py-1 rounded-sm"
//               >
//                 <option value="IDA">Ida</option>
//                 <option value="VUELTA">Vuelta</option>
//               </select>
//               <input type="hidden" name={`tickets_date[${index}]`} value={ticket.date ? format(ticket.date, 'yyyy-MM-dd') : ""} />

//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="outline" className={cn("w-full h-10 justify-start text-left font-normal", !ticket.date && "text-muted-foreground")}>
//                     <FiCalendar className="mr-2 h-4 w-4" />
//                     {ticket.date ? format(ticket.date, 'dd/MM/yyyy', { locale: es }) : 'Seleccione una fecha'}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent align="start" className="w-auto p-0">
//                   <Calendar
//                     mode="single"
//                     captionLayout="dropdown-buttons"
//                     selected={ticket.date}
//                     onSelect={(date) => updateTicket(index, 'date', date)}
//                     fromYear={2020}
//                     toYear={2030}
//                   />
//                 </PopoverContent>
//               </Popover>

//               <select
//                 name={`tickets_provider[]`}
//                 value={ticket.provider}
//                 onChange={(e) => updateTicket(index, 'provider', e.target.value)}
//                 className="w-full px-2 py-1 rounded-sm"
//               >
//                 <option value="">Seleccione un Proveedor</option>
//                 <option value="Proveedor1">Proveedor 1</option>
//                 <option value="Proveedor2">Proveedor 2</option>
//                 <option value="Proveedor3">Proveedor 3</option>
//               </select>
//               <input
//                 type="text"
//                 name={`tickets_amount[]`}
//                 value={ticket.amount}
//                 placeholder="Monto"
//                 onChange={(e) => updateTicket(index, 'amount', e.target.value)}
//                 className="w-full px-2 py-1 rounded-sm"
//                 required
//               />
//             </div>
//           </div>
//         ))}

//         <Button type="button" onClick={addTicket}>
//           Agregar Ticket
//         </Button>

//         <Button type="submit">
//           Crear Asignación
//         </Button>
//       </form>
//     </div>
//   );
// }

// 'use client'

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import { FiCalendar } from "react-icons/fi";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { es } from "date-fns/locale";
// import { createPassage, getRecipientsAndBenefits } from "@/actions/other-actions/pasajes-actions";

// export default function FormActionCredencial({ recipient, benefit, assignment }) {
//   const [recipients, setRecipients] = useState([]);
//   const [selectedRecipient, setSelectedRecipient] = useState(recipient?.id || "");
//   // const [benefits, setBenefits] = useState([]);
//   const [tickets, setTickets] = useState([{ type: "principal", name: "", dni: "", direction: "IDA", date: null, provider: "" }]);

//   useEffect(() => {
//     async function fetchData() {
//       const data = await getRecipientsAndBenefits();
//       setRecipients(data.recipients);
//       // setBenefits(data.benefits);
//     }
//     fetchData();
//   }, []);

//   // Filtrar los beneficios que tienen category_id 1
//   // const filteredBenefits = benefits.filter(benefit => benefit.id === 13);

//   const addTicket = () => {
//     setTickets([...tickets, { type: "principal", name: "", dni: "", direction: "IDA", date: null, provider: "" }]);
//   };

//   const removeTicket = (index) => {
//     const newTickets = tickets.filter((_, i) => i !== index);
//     setTickets(newTickets);
//   };

//   const updateTicket = (index, field, value) => {
//     const newTickets = tickets.map((ticket, i) => {
//       if (i === index) {
//         return { ...ticket, [field]: value };
//       }
//       return ticket;
//     });
//     setTickets(newTickets);
//   };

//   return (
//     <div className="mt-6">
//       <form action={createPassage} className="flex flex-col gap-4">
//         <div className="grid grid-cols-2 gap-4">
//           <select
//             name="recipient"
//             className="w-full px-2 py-1 rounded-sm"
//             value={selectedRecipient}
//             onChange={(e) => setSelectedRecipient(e.target.value)}
//           >
//             <option value="">
//               {
//                 recipient ? <p>{recipient?.first_name} {recipient?.last_name}</p> : "Seleccione un Beneficiario"
//               }
//             </option>
//             {recipients.map((recipient) => (
//               <option key={recipient.id} value={recipient.id}>
//                 {recipient.first_name} {recipient.last_name}
//               </option>
//             ))}
//           </select>
          
//           <input
//             type="hidden"
//             name="benefit"
//             // placeholder="Pasajes"
//             value={13}
//             className="w-full px-2 py-1 rounded-sm"
//           />
          
//           <div>
//             <div className="flex">
//               <span>Tipo de beneficio:</span><p className="ml-4">Pasajes</p>
//             </div>
//             <div className="flex">
//               <span>Destino:</span><p className="ml-4">Bahía Blanca</p>
//             </div>
//           </div>

//           <div>
//             <label>Cantidad de pasajes</label>
//             <input
//               type="text"
//               name="total_tickets"
//               value={tickets.length}
//               readOnly
//               className="w-full px-2 py-1 rounded-sm"
//             />
//           </div>
//         </div>

//         {tickets.map((ticket, index) => (
//           <div key={index} className="border p-4 rounded-sm">
//             <div className="flex justify-between items-center">
//               <h3>Ticket {index + 1}</h3>
//               <Button type="button" onClick={() => removeTicket(index)}>Eliminar</Button>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <select
//                 name={`tickets[${index}][type]`}
//                 value={ticket.type}
//                 onChange={(e) => updateTicket(index, "type", e.target.value)}
//                 className="w-full px-2 py-1 rounded-sm"
//               >
//                 <option value="principal">Principal</option>
//                 <option value="acompanante">Acompañante</option>
//               </select>
//               <input
//                 type="text"
//                 name={`tickets[${index}][name]`}
//                 value={ticket.name}
//                 placeholder="Nombre del pasajero"
//                 onChange={(e) => updateTicket(index, "name", e.target.value)}
//                 className="w-full px-2 py-1 rounded-sm"
//               />
//               <input
//                 type="text"
//                 name={`tickets[${index}][dni]`}
//                 value={ticket.dni}
//                 placeholder="DNI del pasajero"
//                 onChange={(e) => updateTicket(index, "dni", e.target.value)}
//                 className="w-full px-2 py-1 rounded-sm"
//               />
//               <select
//                 name={`tickets[${index}][direction]`}
//                 value={ticket.direction}
//                 onChange={(e) => updateTicket(index, "direction", e.target.value)}
//                 className="w-full px-2 py-1 rounded-sm"
//               >
//                 <option value="IDA">Ida</option>
//                 <option value="VUELTA">Vuelta</option>
//               </select>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="outline" className={cn("w-full h-10 justify-start text-left font-normal", !ticket.date && "text-muted-foreground")}>
//                     <FiCalendar className="mr-2 h-4 w-4" />
//                     {ticket.date ? format(ticket.date, "dd/MM/yyyy") : "Seleccione una fecha"}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent align="start" className="w-auto p-0">
//                   <Calendar
//                     mode="single"
//                     captionLayout="dropdown-buttons"
//                     selected={ticket.date}
//                     onSelect={(date) => updateTicket(index, "date", date)}
//                     fromYear={1960}
//                     toYear={2030}
//                   />
//                 </PopoverContent>
//               </Popover>
//               <input
//                 type="text"
//                 name={`tickets[${index}][provider]`}
//                 value={ticket.provider}
//                 placeholder="Proveedor"
//                 onChange={(e) => updateTicket(index, "provider", e.target.value)}
//                 className="w-full px-2 py-1 rounded-sm"
//               />
//             </div>
//           </div>
//         ))}

//         <Button type="button" onClick={addTicket}>
//           Agregar Ticket
//         </Button>

//         <Button type="submit">
//           Crear Asignación
//         </Button>
//       </form>
//     </div>
//   );
// }
