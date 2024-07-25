'use client';

import { getBenefitsAssignments } from '@/actions/estadisticas-actions';
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
} from '@/components/ui/table'; // Suponiendo que tienes estos componentes

export default function DoubleEntryTable() {
  const [data, setData] = useState({ benefits: [], monthlyTotals: [] });
  const [year, setYear] = useState(new Date().getFullYear());
  const [localityId, setLocalityId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const results = await getBenefitsAssignments(year, localityId);
        setData(results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [year, localityId]);

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  return (
    <div>
      <h1>Asignaciones por Beneficio y Mes</h1>
      <div className="filters">
        <label>
          Año:
          <select value={year} onChange={(e) => setYear(parseInt(e.target.value, 10))}>
            {[...Array(5).keys()].map(i => (
              <option key={i} value={2020 + i}>{2020 + i}</option>
            ))}
          </select>
        </label>
        <label>
          Localidad:
          <select value={localityId || ''} onChange={(e) => setLocalityId(e.target.value ? parseInt(e.target.value, 10) : null)}>
            <option value="">Todas las localidades</option>
            {/* Aquí deberías mapear tus localidades */}
            <option value="1">Carhue</option>
            <option value="2">San Miguel</option>
            <option value="3">Gascon</option>
            <option value="4">Rivera</option>
            <option value="5">Villa Maza</option>
            {/* Agrega más opciones según las localidades disponibles */}
          </select>
        </label>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Beneficio</TableHead>
            {months.map((month) => (
              <TableHead key={month}>{month}</TableHead>
            ))}
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.benefits.map((benefit) => (
            <TableRow key={benefit.benefitId}>
              <TableCell>{benefit.benefitName}</TableCell>
              {months.map((month, index) => {
                const monthlyAssignment = benefit.monthlyAssignments.find(
                  (assignment) => assignment.month === index + 1
                );
                return (
                  <TableCell key={index}>
                    {monthlyAssignment ? monthlyAssignment.amount : "-"}
                  </TableCell>
                );
              })}
              <TableCell>{benefit.totalAmount}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Total</TableCell>
            {data.monthlyTotals.map((total, index) => (
              <TableCell key={index}>
                {total.amount}
              </TableCell>
            ))}
            <TableCell>
              {data.monthlyTotals.reduce((sum, total) => sum + total.amount, 0)}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHead>Beneficio</TableHead>
            {months.map((month) => (
              <TableHead key={month}>{month}</TableHead>
            ))}
            <TableHead>Total</TableHead>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

// 'use client';

// import { getBenefitsAssignments } from '@/actions/estadisticas-actions';
// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
// } from '@/components/ui/table'; // Suponiendo que tienes estos componentes

// export default function DoubleEntryTable() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const results = await getBenefitsAssignments();
//         setData(results);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     fetchData();
//   }, []);

//   const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

//   return (
//     <div>
//       <h1>Asignaciones por Beneficio y Mes</h1>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Beneficio</TableHead>
//             {months.map((month) => (
//               <TableHead key={month}>{month}</TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.map((benefit) => (
//             <TableRow key={benefit.benefitId}>
//               <TableCell>{benefit.benefitName}</TableCell>
//               {months.map((month, index) => {
//                 const monthlyAssignment = benefit.monthlyAssignments.find(
//                   (assignment) => assignment.month === index + 1
//                 );
//                 return (
//                   <TableCell key={index}>
//                     {monthlyAssignment ? monthlyAssignment.amount : "-"}
//                   </TableCell>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }