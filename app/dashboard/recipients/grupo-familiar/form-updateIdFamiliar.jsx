'use client';
import React, { useState, useEffect } from 'react';
import { createFamilyGroup, getFamilyData, updateFamilyGroup } from '@/actions/recipient-actions';

export default function UpdateFamilyGroup() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipients, setRecipients] = useState([]);
  const [recipientsWithFamilyId, setRecipientsWithFamilyId] = useState([]);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [selectedRecipientWithFamilyId, setSelectedRecipientWithFamilyId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFamilyData();
        setRecipients(data.recipients);
        setRecipientsWithFamilyId(data.recipientsWithFamilyId);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleRecipientChange = (id) => {
    setSelectedRecipients((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRecipientIdChange = (id) => {
    setSelectedRecipientWithFamilyId(id);
  };

  return (
    <div>
      <h1>Asignar a Grupo Familiar</h1>
      <div>
        <h2>Seleccionar Persona del Grupo Familiar Existente</h2>
        <div className="grid grid-cols-5 gap-4">
          {recipientsWithFamilyId.map((recipient) => (
            <div key={recipient.id}>
              <input
                type="radio"
                checked={selectedRecipientWithFamilyId === recipient.family_group_id}
                onChange={() => handleRecipientIdChange(recipient.family_group_id)}
              />
              {recipient.first_name} {recipient.last_name}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Seleccionar al nuevo integrante</h2>
        <div className="grid grid-cols-5 gap-4">
          {recipients.map((recipient) => (
            <div key={recipient.id}>
              <input
                type="checkbox"
                checked={selectedRecipients.includes(recipient.id)}
                onChange={() => handleRecipientChange(recipient.id)}
              />
              {recipient.first_name} {recipient.last_name}
            </div>
          ))}
        </div>
      </div>
      <form action={updateFamilyGroup}>
        <input
          type="hidden"
          name="selected_recipients"
          value={JSON.stringify(selectedRecipients)}
        />
        <input
          type="hidden"
          name="family_group_id"
          value={selectedRecipientWithFamilyId || ''}
        />
        <button type="submit">Asignar Grupo Familiar</button>
      </form>
    </div>
  );
}

//--------------------------------------------------------------------------------------
// const handleAssignFamilyGroup = async () => {
//   if (selectedRecipients.length < 1) {
//     alert('Selecciona mas de un destinatario.');
//     return;
//   }

//   try {
//     await assignFamilyGroupToRecipients(parseInt(selectedFamilyGroup), selectedRecipients);
//     alert('Grupo familiar asignado con éxito.');
//   } catch (error) {
//     alert('Error al asignar el grupo familiar.');
//   }
// };


{/* <h2>Seleccionar o Crear Grupo Familiar</h2> */}
{/* <select
value={selectedFamilyGroup}
onChange={(e) => setSelectedFamilyGroup(e.target.value)}
>
<option value="">Seleccionar Grupo Familiar</option>
{familyGroups.map((group) => (
  <option key={group.id} value={group.id}>
  {group.id}
  </option>
  ))}
  </select>
<button onClick={handleCreateFamilyGroup}>Crear Nuevo Grupo Familiar</button> */}

//--------------------------------------------------------------------------------------

// 'use client'
// import React, { useState, useEffect } from 'react';

// // Fetch data functions (these would be replaced by your actual API calls)
// import { getRecipients, getFamilyGroups, createFamilyGroup, assignFamilyGroupToRecipients, updateRecipientFamilyGroup } from '@/actions/recipient-actions';

// function FamilyGroupForm() {
  //   const [recipients, setRecipients] = useState([]);
  //   const [familyGroups, setFamilyGroups] = useState([]);
  //   const [selectedRecipients, setSelectedRecipients] = useState([]);
  //   const [selectedFamilyGroup, setSelectedFamilyGroup] = useState('');
//   const [newFamilyGroupName, setNewFamilyGroupName] = useState('');

//   useEffect(() => {
//     async function fetchData() {
//       const { recipients } = await getRecipients();
//       const { familyGroups } = await getFamilyGroups();
//       setRecipients(recipients);
//       setFamilyGroups(familyGroups);
//     }
//     fetchData();
//   }, []);

//   const handleRecipientChange = (id) => {
//     setSelectedRecipients((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const handleFamilyGroupChange = (event) => {
//     setSelectedFamilyGroup(event.target.value);
//   };

//   const handleCreateFamilyGroup = async () => {
//     if (newFamilyGroupName.trim()) {
//       try {
//         const newFamilyGroup = await createFamilyGroup(newFamilyGroupName);
//         const { familyGroups } = await getFamilyGroups();
//         setFamilyGroups(familyGroups);
//         setSelectedFamilyGroup(newFamilyGroup.id.toString()); // Convert ID to string for select
//         setNewFamilyGroupName('');
//       } catch (error) {
//         alert('Error al crear el grupo familiar.');
//       }
//     }
//   };

//   const handleAssignFamilyGroup = async () => {
//     if (selectedRecipients.length === 0) {
//       alert('Por favor, selecciona al menos un destinatario.');
//       return;
//     }

//     if (selectedFamilyGroup) {
//       try {
//         await assignFamilyGroupToRecipients(parseInt(selectedFamilyGroup), selectedRecipients);
//         alert('Grupo familiar asignado a los destinatarios con éxito.');
//       } catch (error) {
//         alert('Error al asignar el grupo familiar.');
//       }
//     } else {
//       alert('Por favor, selecciona un grupo familiar o crea uno nuevo.');
//     }
//   };

//   return (
//     <div>
//       <h1>Asignar Grupo Familiar</h1>
//       <div>
//         <h2>Seleccionar Destinatarios</h2>
//         <div className='grid grid-cols-5 gap-4'>
//           {recipients.map((recipient) => (
//             <div key={recipient.id}>
//               <input
//                 type="checkbox"
//                 checked={selectedRecipients.includes(recipient.id)}
//                 onChange={() => handleRecipientChange(recipient.id)}
//               />
//               {recipient.id} {recipient.first_name} {recipient.last_name}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div>
//         <h2>Seleccionar o Crear Grupo Familiar</h2>
//         <select
//           value={selectedFamilyGroup}
//           onChange={handleFamilyGroupChange}
//         >
//           <option value="">Seleccionar Grupo Familiar</option>
//           {familyGroups.map((group) => (
//             <option key={group.id} value={group.id}>
//               {group.id}
//             </option>
//           ))}
//         </select>
//         <input
//           type="text"
//           value={newFamilyGroupName}
//           onChange={(e) => setNewFamilyGroupName(e.target.value)}
//           placeholder="Nuevo Nombre de Grupo Familiar"
//         />
//         <button onClick={handleCreateFamilyGroup}>Crear Grupo Familiar</button>
//       </div>
//       <button onClick={handleAssignFamilyGroup}>Asignar Grupo Familiar</button>
//     </div>
//   );
// }

// export default FamilyGroupForm;

