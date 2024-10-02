'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createFamilyGroup } from '@/actions/recipient-actions';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

export default function CreateFamilyGroup({ recipients }) {
  const [selectedRecipients, setSelectedRecipients] = useState([]);

  const handleRecipientChange = (id) => {
    setSelectedRecipients((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Seleccionar Destinatarios sin Grupo Familiar</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Seleccionar</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Localidad</TableHead>
                <TableHead>Calle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipients.map((recipient) => (
                <TableRow key={recipient.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRecipients.includes(recipient.id)}
                      onCheckedChange={() => handleRecipientChange(recipient.id)}
                    />
                  </TableCell>
                  <TableCell>{`${recipient.first_name} ${recipient.last_name}`}</TableCell>
                  <TableCell>{recipient.contact_info.locality.name}</TableCell>
                  <TableCell>
                    {recipient.contact_info.street.name} {recipient.contact_info.street_number}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <form action={createFamilyGroup} className="flex items-center justify-end p-4">
        <input type="hidden" name="selected_recipients" value={JSON.stringify(selectedRecipients)} />
        <Button type="submit">Asignar Grupo Familiar</Button>
      </form>
    </div>
  );
}

// 'use client';
// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


// import { createFamilyGroup } from '@/actions/recipient-actions';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Separator } from '@/components/ui/separator';


// export default function CreateFamilyGroup({ recipients }) {

//   const [selectedRecipients, setSelectedRecipients] = useState([]);

//   const handleRecipientChange = (id) => {
//     setSelectedRecipients((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };
  
//   return (
//     <div className='mt-4'>
//       <Card>
//         <CardHeader>
//           <CardTitle>
//             Seleccionar Destinatarios sin Grupo Familiar
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className='flex flex-col gap-4'>
//             {recipients.map((recipient) => (
//               <div key={recipient.id} className="flex items-center space-x-2">
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     checked={selectedRecipients.includes(recipient.id)}
//                     onCheckedChange={() => handleRecipientChange(recipient.id)}
//                   />
//                   <Label>
//                     {recipient.first_name} {recipient.last_name}
//                   </Label>
//                 </div>
//                 <Separator orientation="vertical" />
//                 <Label>
//                   {recipient.contact_info.locality.name}
//                 </Label>
//                 <Separator orientation="vertical" />
//                 <Label>
//                   {recipient.contact_info.street.name} {" "}
//                   {recipient.contact_info.street_number} {" "}
//                 </Label>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//       <form action={createFamilyGroup} className='flex items-center justify-end p-4' >
//         <input
//           type="hidden"
//           name="selected_recipients"
//           value={JSON.stringify(selectedRecipients)}
//         />
//         <Button type='submit' className="" >Asignar Grupo Familiar</Button>
//       </form>
//     </div>
//   );
// }
// 'use client';
// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


// import { createFamilyGroup } from '@/actions/recipient-actions';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Separator } from '@/components/ui/separator';


// export default function CreateFamilyGroup({ recipients }) {

//   const [selectedRecipients, setSelectedRecipients] = useState([]);

//   const handleRecipientChange = (id) => {
//     setSelectedRecipients((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };
  
//   return (
//     <div className='mt-4'>
//       <Card>
//         <CardHeader>
//           <CardTitle>
//             Seleccionar Destinatarios sin Grupo Familiar
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className='flex flex-col gap-4'>
//             {recipients.map((recipient) => (
//               <div key={recipient.id} className="flex items-center space-x-2">
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     checked={selectedRecipients.includes(recipient.id)}
//                     onCheckedChange={() => handleRecipientChange(recipient.id)}
//                   />
//                   <Label>
//                     {recipient.first_name} {recipient.last_name}
//                   </Label>
//                 </div>
//                 <Separator orientation="vertical" />
//                 <Label>
//                   {recipient.contact_info.locality.name}
//                 </Label>
//                 <Separator orientation="vertical" />
//                 <Label>
//                   {recipient.contact_info.street.name} {" "}
//                   {recipient.contact_info.street_number} {" "}
//                 </Label>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//       <form action={createFamilyGroup} className='flex items-center justify-end p-4' >
//         <input
//           type="hidden"
//           name="selected_recipients"
//           value={JSON.stringify(selectedRecipients)}
//         />
//         <Button type='submit' className="" >Asignar Grupo Familiar</Button>
//       </form>
//     </div>
//   );
// }
