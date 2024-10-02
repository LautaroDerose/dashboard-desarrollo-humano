'use client';
import React, { useState, useEffect } from 'react';
import { createFamilyGroup, getFamilyData, updateFamilyGroup } from '@/actions/recipient-actions';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function UpdateFamilyGroup({ recipients = [], recipientsWithFamilyId = [] }) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [selectedRecipientWithFamilyId, setSelectedRecipientWithFamilyId] = useState(null);

  const handleRecipientChange = (id) => {
    setSelectedRecipients((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRecipientIdChange = (id) => {
    setSelectedRecipientWithFamilyId(id);
  };

  return (
    <div className='flex flex-col mt-4'>
      <div className='flex  gap-2'>
        <Card className=" w-full">
          <CardHeader>
            <CardTitle>Seleccionar Persona del Grupo Familiar Existente</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedRecipientWithFamilyId || ''}
              onValueChange={setSelectedRecipientWithFamilyId}
            >
              <ScrollArea>
                <div className="flex flex-col h-[60vh] gap-4">
                    {recipientsWithFamilyId.map((recipient) => (
                      <div key={recipient.id} className="flex items-center justify-between space-x-2">
                        <div className=' w-2/5 flex items-center space-x-2'>
                          <RadioGroupItem value={recipient.family_group_id || ''} id={`family-${recipient.id}`} />
                          <Label htmlFor={`family-${recipient.id}`}>{`${recipient.first_name} ${recipient.last_name}`}</Label>
                        </div>
                        <Separator orientation="vertical" />
                        <div className='flex w-2/5 pr-4 gap-4 justify-between'>
                          <Label>{recipient.contact_info.locality.name}</Label>
                          <Label>{recipient.contact_info.street.name} {recipient.contact_info.street_number}</Label>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </RadioGroup>
          </CardContent>
        </Card>
        <Separator orientation="vertical" />
        <Card className=" w-full">
          <CardHeader>
            <CardTitle>Seleccionar al nuevo integrante</CardTitle>
          </CardHeader>
          <CardContent>
          <ScrollArea>
            <div className="flex flex-col h-[50vh] gap-4">
              {recipients.map((recipient) => (
                <div key={recipient.id} className="flex items-center justify-between space-x-2">
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id={`new-${recipient.id}`}
                      checked={selectedRecipients.includes(recipient.id)}
                      onCheckedChange={() => handleRecipientChange(recipient.id)}
                    />
                    <Label htmlFor={`new-${recipient.id}`}>{`${recipient.first_name} ${recipient.last_name}`}</Label>
                  </div>
                  <div className='flex w-2/5 pr-4 gap-4 justify-between'>
                    <Label>{recipient.contact_info.locality.name}</Label>
                    <Label>{recipient.contact_info.street.name} {recipient.contact_info.street_number}</Label>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <form action={updateFamilyGroup} className='flex items-center justify-end p-4'>
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
        <Button type="submit">Asignar Grupo Familiar</Button>
      </form>
    </div>
  );
}
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { createFamilyGroup, getFamilyData, updateFamilyGroup } from '@/actions/recipient-actions';
// import { Separator } from '@/components/ui/separator';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Label } from '@/components/ui/label';
// import { Checkbox } from '@/components/ui/checkbox';
// import { revalidatePath } from 'next/cache';
// import { Button } from '@/components/ui/button';

// export default function UpdateFamilyGroup() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [recipients, setRecipients] = useState([]);
//   const [recipientsWithFamilyId, setRecipientsWithFamilyId] = useState([]);
//   const [selectedRecipients, setSelectedRecipients] = useState([]);
//   const [selectedRecipientWithFamilyId, setSelectedRecipientWithFamilyId] = useState(null);
//   const [formSubmitted, setFormSubmitted] = useState(false); 

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await getFamilyData();
//         // Ordenar recipientsWithFamilyId por family_group_id
//         const sortedRecipientsWithFamilyId = data.recipientsWithFamilyId.sort((a, b) =>
//           (a.family_group_id || 0) - (b.family_group_id || 0)
//         );
//         setRecipients(data.recipients);
//         setRecipientsWithFamilyId(sortedRecipientsWithFamilyId);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setIsLoading(false);
//       }
//     }
//     fetchData();
//   }, [formSubmitted]); 

//   useEffect(() => {
//     if (formSubmitted) {
//       setSelectedRecipients([]);
//       setSelectedRecipientWithFamilyId(null);
//       revalidatePath('/dashboard/recipients/grupo-familiar');
//       setFormSubmitted(false);
//     }
//   }, [formSubmitted]);

//   const handleRecipientChange = (id) => {
//     setSelectedRecipients((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const handleRecipientIdChange = (id) => {
//     setSelectedRecipientWithFamilyId(id);
//   };

//   const handleFormSubmit = () => {
//     setFormSubmitted(true);
//   };

//   return (
//     <div className='flex flex-col mt-4'>
//       <div className='flex flex-col items-center justify-center gap-2'>
//         <div className='flex justify-center gap-2'>
//           <Card>
//             <CardHeader>
//               <CardTitle>Seleccionar Persona del Grupo Familiar Existente</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <RadioGroup
//                 value={selectedRecipientWithFamilyId || ''}
//                 onValueChange={setSelectedRecipientWithFamilyId}
//               >
//                 <div className="flex flex-col gap-4">
//                   {recipientsWithFamilyId.map((recipient) => (
//                     <div key={recipient.id} className="flex items-center space-x-2">
//                       <RadioGroupItem value={recipient.family_group_id || ''} id={`family-${recipient.id}`} />
//                       <Label htmlFor={`family-${recipient.id}`}>{`${recipient.first_name} ${recipient.last_name}`}</Label>
//                     </div>
//                   ))}
//                 </div>
//               </RadioGroup>
//             </CardContent>
//           </Card>
//           <Separator orientation="vertical" />
//           <Card>
//             <CardHeader>
//               <CardTitle>Seleccionar al nuevo integrante</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col gap-4">
//                 {recipients.map((recipient) => (
//                   <div key={recipient.id} className="flex items-center space-x-2">
//                     <Checkbox
//                       id={`new-${recipient.id}`}
//                       checked={selectedRecipients.includes(recipient.id)}
//                       onCheckedChange={() => handleRecipientChange(recipient.id)}
//                     />
//                     <Label htmlFor={`new-${recipient.id}`}>{`${recipient.first_name} ${recipient.last_name}`}</Label>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//         <form action={updateFamilyGroup} className='mt-4'>
//           <input
//             type="hidden"
//             name="selected_recipients"
//             value={JSON.stringify(selectedRecipients)}
//           />
//           <input
//             type="hidden"
//             name="family_group_id"
//             value={selectedRecipientWithFamilyId || ''}
//           />
//           <Button type="submit">Asignar Grupo Familiar</Button>
//         </form>
//       </div>
//     </div>
//   );
// }

// 'use client';
// import React, { useState, useEffect } from 'react';
// import { createFamilyGroup, getFamilyData, updateFamilyGroup } from '@/actions/recipient-actions';
// import { Separator } from '@/components/ui/separator';

// export default function UpdateFamilyGroup() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [recipients, setRecipients] = useState([]);
//   const [recipientsWithFamilyId, setRecipientsWithFamilyId] = useState([]);
//   const [selectedRecipients, setSelectedRecipients] = useState([]);
//   const [selectedRecipientWithFamilyId, setSelectedRecipientWithFamilyId] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await getFamilyData();
//         setRecipients(data.recipients);
//         setRecipientsWithFamilyId(data.recipientsWithFamilyId);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setIsLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   const handleRecipientChange = (id) => {
//     setSelectedRecipients((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const handleRecipientIdChange = (id) => {
//     setSelectedRecipientWithFamilyId(id);
//   };

//   return (
//     <div>
//       <h1>Asignar a Grupo Familiar</h1>
//       <div className='flex gap-10'>
//         <div className=' mr-10 border-r-2'>
//           <h2>Seleccionar Persona del Grupo Familiar Existente</h2>
//           <div className="grid grid-cols-5 gap-4">
//             {recipientsWithFamilyId.map((recipient) => (
//               <div key={recipient.id}>
//                 <input
//                   type="radio"
//                   checked={selectedRecipientWithFamilyId === recipient.family_group_id}
//                   onChange={() => handleRecipientIdChange(recipient.family_group_id)}
//                 />
//                 {recipient.first_name} {recipient.last_name}
//               </div>
//             ))}
//           </div>
//           <Separator orientation="vertical" />
//           <Separator orientation="vertical" />
//         </div>
//         <div>
//           <h2>Seleccionar al nuevo integrante</h2>
//           <div className="grid grid-cols-5 gap-4">
//             {recipients.map((recipient) => (
//               <div key={recipient.id}>
//                 <input
//                   type="checkbox"
//                   checked={selectedRecipients.includes(recipient.id)}
//                   onChange={() => handleRecipientChange(recipient.id)}
//                 />
//                 {recipient.first_name} {recipient.last_name}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <form action={updateFamilyGroup}>
//         <input
//           type="hidden"
//           name="selected_recipients"
//           value={JSON.stringify(selectedRecipients)}
//         />
//         <input
//           type="hidden"
//           name="family_group_id"
//           value={selectedRecipientWithFamilyId || ''}
//         />
//         <button type="submit">Asignar Grupo Familiar</button>
//       </form>
//     </div>
//   );
// }
