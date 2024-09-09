'use client';

import { useState, useEffect } from 'react';
import { getRecipientsAndBenefits } from '@/actions/other-actions/pasajes-actions';
import { createAssignmentWithTravelSubsidy } from '@/actions/other-actions/passages-actions';

export default function PassagesForm() {
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    async function fetchData() {
      const data = await getRecipientsAndBenefits();
      setRecipients(data.recipients);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // Validación del beneficiario
    if (!selectedRecipient) {
      errors.recipient = "Debe seleccionar un beneficiario";
    }

    // Validación de los campos obligatorios
    const travelSubsidy1 = {
      destination: e.target.destination1.value,
      date: e.target.date1.value,
      passengerType: e.target.passenger_type1.value,
      name: e.target.name1.value,
      dni: e.target.dni1.value,
      amount: e.target.amount1.value,
      provider: e.target.provider1.value,
    };

    if (Object.values(travelSubsidy1).some(value => !value)) {
      errors.travelSubsidy1 = "Todos los campos en la sección 1 son obligatorios";
    }

    // Validación opcional de los campos con sufijos 2, 3, 4
    const travelSubsidies = [2, 3, 4];
    travelSubsidies.forEach(suffix => {
      const subsidy = {
        destination: e.target[`destination${suffix}`].value,
        date: e.target[`date${suffix}`].value,
        passengerType: e.target[`passenger_type${suffix}`].value,
        name: e.target[`name${suffix}`].value,
        dni: e.target[`dni${suffix}`].value,
        amount: e.target[`amount${suffix}`].value,
        provider: e.target[`provider${suffix}`].value,
      };

      if (Object.values(subsidy).some(value => value)) {
        if (Object.values(subsidy).some(value => !value)) {
          errors[`travelSubsidy${suffix}`] = `Todos los campos en la sección ${suffix} deben estar completos si se rellenó alguno`;
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Si no hay errores, proceder con la acción de creación
    await createAssignmentWithTravelSubsidy(new FormData(e.target));
  };

  return (
    <form onSubmit={handleSubmit} className='w-fit'>
      {formErrors.recipient && <p className="text-red-500">{formErrors.recipient}</p>}
      {formErrors.travelSubsidy1 && <p className="text-red-500">{formErrors.travelSubsidy1}</p>}
      {formErrors.travelSubsidy2 && <p className="text-red-500">{formErrors.travelSubsidy2}</p>}
      {formErrors.travelSubsidy3 && <p className="text-red-500">{formErrors.travelSubsidy3}</p>}
      {formErrors.travelSubsidy4 && <p className="text-red-500">{formErrors.travelSubsidy4}</p>}

      {/* Recipient select */}
      <select
        name="recipient_id"
        className="w-full px-2 py-1 rounded-sm my-4"
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
      <div className='flex gap-3'>
        {[1, 2, 3, 4].map((suffix) => (
          <div key={suffix} className="flex flex-col mb-4 gap-2">
            <select name={`destination${suffix}`}>
              <option value="">Seleccione Destino</option>
              <option value="bahia blanca">Bahía Blanca</option>
              <option value="carhue">Carhué</option>
            </select>
            <input type="date" name={`date${suffix}`} />
            <select name={`passenger_type${suffix}`}>
              <option value="">Seleccione tipo de acompañante</option>
              <option value="unico">Único</option>
              <option value="acompanante">Acompañante</option>
            </select>
            <input type="text" name={`name${suffix}`} placeholder="Name" />
            <input type="text" name={`dni${suffix}`} placeholder="DNI" />
            <input type="number" name={`amount${suffix}`} placeholder="Amount" />
            <select name={`provider${suffix}`}>
              <option value="">Seleccione Proveedor</option>
              <option value="empresa1">Empresa 1</option>
              <option value="empresa2">Empresa 2</option>
            </select>
          </div>
        ))}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Crear Assignment con Travel Subsidies</button>
    </form>
  );
}
// 'use client';

// import { useState, useEffect } from 'react';
// import { getRecipientsAndBenefits} from '@/actions/other-actions/pasajes-actions';
// import { createAssignmentWithTravelSubsidy } from '@/actions/other-actions/passages-actions';

// export default function PassagesForm() {
//   const [recipients, setRecipients] = useState([]);
//   const [selectedRecipient, setSelectedRecipient] = useState("");


//   useEffect(() => {
//     async function fetchData() {
//       const data = await getRecipientsAndBenefits();
//       setRecipients(data.recipients);
//     }
//     fetchData();
//   }, []);

//   return (
//     // <form onSubmit={handleSubmit} className='w-fit'>
//     <form action={createAssignmentWithTravelSubsidy} className='w-fit'>
//       {/* Recipient select */}
//       <select
//         name="recipient_id"
//         className="w-full px-2 py-1 rounded-sm my-4"
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
//         <div className='flex gap-3'>
//           <div className="flex flex-col mb-4 gap-2">
//             <select name={`destination1`}>
//               <option value="">Seleccione Destino</option>
//               <option value="bahia blanca">Bahía Blanca</option>
//               <option value="carhue">Carhué</option>
//             </select>

//             <input type="date" name={`date1`} />

//             <select name={`passenger_type1`}>
//               <option value="">Seleccione tipo de acompañante</option>
//               <option value="unico">Único</option>
//               <option value="acompanante">Acompañante</option>
//             </select>

//             <input type="text" name={`name1`} placeholder="Name" />
//             <input type="text" name={`dni1`} placeholder="DNI" />
//             <input type="number" name={`amount1`} placeholder="Amount" />

//             <select name={`provider1`}>
//               <option value="">Seleccione Proveedor</option>
//               <option value="empresa1">Empresa 1</option>
//               <option value="empresa2">Empresa 2</option>
//             </select>
//           </div>
          
//           {/* TravelSubsidy fields 2 */}

//           <div className="flex flex-col mb-4 gap-2">
//             <select name={`destination2`}>
//               <option value="">Seleccione Destino</option>
//               <option value="bahia blanca">Bahía Blanca</option>
//               <option value="carhue">Carhué</option>
//             </select>

//             <input type="date" name={`date2`} />

//             <select name={`passenger_type2`}>
//               <option value="">Seleccione tipo de acompañante</option>
//               <option value="unico">Único</option>
//               <option value="acompanante">Acompañante</option>
//             </select>

//             <input type="text" name={`name2`} placeholder="Name" />
//             <input type="text" name={`dni2`} placeholder="DNI" />
//             <input type="number" name={`amount2`} placeholder="Amount" />

//             <select name={`provider2`}>
//               <option value="">Seleccione Proveedor</option>
//               <option value="empresa1">Empresa 1</option>
//               <option value="empresa2">Empresa 2</option>
//             </select>
//           </div>
//           {/* TravelSubsidy fields 3 */}
//           <div className="flex flex-col mb-4 gap-2">
//             <select name={`destination3`}>
//               <option value="">Seleccione Destino</option>
//               <option value="bahia blanca">Bahía Blanca</option>
//               <option value="carhue">Carhué</option>
//             </select>

//             <input type="date" name={`date3`} />

//             <select name={`passenger_type3`}>
//               <option value="">Seleccione tipo de acompañante</option>
//               <option value="unico">Único</option>
//               <option value="acompanante">Acompañante</option>
//             </select>

//             <input type="text" name={`name3`} placeholder="Name" />
//             <input type="text" name={`dni3`} placeholder="DNI" />
//             <input type="number" name={`amount3`} placeholder="Amount" />

//             <select name={`provider3`}>
//               <option value="">Seleccione Proveedor</option>
//               <option value="empresa1">Empresa 1</option>
//               <option value="empresa2">Empresa 2</option>
//             </select>
//           </div>
//           {/* TravelSubsidy fields 4 */}
//           <div className="flex flex-col mb-4 gap-2">
//             <select name={`destination4`} >
//               <option value="">Seleccione Destino</option>
//               <option value="bahia blanca">Bahía Blanca</option>
//               <option value="carhue">Carhué</option>
//             </select>

//             <input type="date" name={`date4`}  />

//             <select name={`passenger_type4`} >
//               <option value="">Seleccione tipo de acompañante</option>
//               <option value="unico">Único</option>
//               <option value="acompanante">Acompañante</option>
//             </select>

//             <input type="text" name={`name4`}  placeholder="Name" />
//             <input type="text" name={`dni4`}  placeholder="DNI" />
//             <input type="number" name={`amount4`}  placeholder="Amount" />

//             <select name={`provider4`} >
//               <option value="">Seleccione Proveedor</option>
//               <option value="empresa1">Empresa 1</option>
//               <option value="empresa2">Empresa 2</option>
//             </select>
//           </div>
//         </div>

      
      
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Crear Assignment con Travel Subsidies</button>
//     </form>
//   );
// }

