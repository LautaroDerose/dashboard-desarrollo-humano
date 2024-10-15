'use client';

import { useState, useEffect, useCallback } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter, } from '@/components/ui/table';
import { RxMixerHorizontal } from 'react-icons/rx'; // Asegúrate de importar correctamente los íconos
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { calculatePartialSums, calculateTotals, getBenefitsAssignments } from '@/actions/estadisticas-actions';

function BenefitVisibilityOptions({ benefits, visibleBenefits, onToggleBenefit }) {
  const half = Math.ceil(benefits.length / 2);
  const firstColumn = benefits.slice(0, half);
  const secondColumn = benefits.slice(half);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-10 lg:flex">
          <RxMixerHorizontal className="h-4 w-4 mr-2" />
          Beneficios
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]">
        <DropdownMenuLabel>Beneficios visibles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex">
          <div className="flex-1">
            {firstColumn.map((benefit) => (
              <DropdownMenuCheckboxItem
                key={benefit.id}
                className="capitalize"
                checked={visibleBenefits.includes(benefit.id)}
                onCheckedChange={() => onToggleBenefit(benefit.id)}
              >
                {benefit.name}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
          <div className="flex-1">
            {secondColumn.map((benefit) => (
              <DropdownMenuCheckboxItem
                key={benefit.id}
                className="capitalize"
                checked={visibleBenefits.includes(benefit.id)}
                onCheckedChange={() => onToggleBenefit(benefit.id)}
              >
                {benefit.name}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export default function DoubleEntryTable() {
  const [data, setData] = useState({ benefits: [], monthlyTotals: [] });
  const [year, setYear] = useState(new Date().getFullYear());
  const [localityId, setLocalityId] = useState(null);
  const [visibleMonths, setVisibleMonths] = useState(Array.from({ length: 12 }, (_, index) => index + 1));
  const [visibleBenefits, setVisibleBenefits] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const assignments = await getBenefitsAssignments(year, localityId);
      const partialSums = await calculatePartialSums(assignments, visibleBenefits, visibleMonths);
      const totals = await calculateTotals(partialSums, visibleMonths);
      setData({ benefits: partialSums, monthlyTotals: totals.monthlyTotals });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [year, localityId, visibleBenefits, visibleMonths]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data.benefits.length > 0 && visibleBenefits.length === 0) {
      setVisibleBenefits(data.benefits.map(benefit => benefit.benefitId));
    }
  }, [data.benefits, visibleBenefits.length]); // Añadimos visibleBenefits.length como dependencia

  const handleToggleMonthVisibility = useCallback((index) => {
    setVisibleMonths((prev) => {
      const newVisibility = prev.includes(index + 1)
        ? prev.filter(month => month !== index + 1)
        : [...prev, index + 1];
      return newVisibility;
    });
  }, []);

  const handleToggleBenefitVisibility = useCallback((benefitId) => {
    setVisibleBenefits((prev) => {
      const newVisibility = prev.includes(benefitId)
        ? prev.filter(id => id !== benefitId)
        : [...prev, benefitId];
      return newVisibility;
    });
  }, []);

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
            <option value="1">Carhué</option>
            <option value="2">San Miguel</option>
            <option value="3">Gascón</option>
            <option value="4">Rivera</option>
            <option value="5">Villa Maza</option>
            {/* Agrega más opciones según las localidades disponibles */}
          </select>
        </label>
      </div>
      <div className="flex space-x-2">
        <MonthVisibilityOptions
          months={months}
          visibleMonths={visibleMonths}
          onToggleMonth={handleToggleMonthVisibility}
        />
        <BenefitVisibilityOptions
          benefits={data.benefits.map((benefit) => ({ id: benefit.benefitId, name: benefit.benefitName }))}
          visibleBenefits={visibleBenefits}
          onToggleBenefit={handleToggleBenefitVisibility}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Beneficio</TableHead>
            {months.map((month, index) => (
              visibleMonths.includes(index + 1) && <TableHead key={month}>{month}</TableHead>
            ))}
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.benefits.map((benefit) => (
            visibleBenefits.includes(benefit.benefitId) && (
              <TableRow key={benefit.benefitId}>
                <TableCell>{benefit.benefitName}</TableCell>
                {months.map((month, monthIndex) => (
                  visibleMonths.includes(monthIndex + 1) && (
                    <TableCell key={month}>{benefit.monthlyAssignments[monthIndex]?.amount || 0}</TableCell>
                  )
                ))}
                <TableCell>{benefit.totalAmount}</TableCell>
              </TableRow>
            )
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total General</TableCell>
            {data.monthlyTotals.map(total => (
              visibleMonths.includes(total.month) && <TableCell key={total.month}>{total.amount}</TableCell>
            ))}
            <TableCell>{data.monthlyTotals.reduce((sum, total) => sum + total.amount, 0)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

function MonthVisibilityOptions({ months, visibleMonths, onToggleMonth }) {
  const half = Math.ceil(months.length / 2);
  const firstColumn = months.slice(0, half);
  const secondColumn = months.slice(half);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-10 lg:flex">
          <RxMixerHorizontal className="h-4 w-4 mr-2" />
          Mostrar Meses
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Meses visibles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex">
          <div className="flex-1">
            {firstColumn.map((month, index) => (
              <DropdownMenuCheckboxItem
                key={month}
                className="capitalize"
                checked={visibleMonths.includes(index + 1)}
                onCheckedChange={() => onToggleMonth(index)}
              >
                {month}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
          <div className="flex-1">
            {secondColumn.map((month, index) => (
              <DropdownMenuCheckboxItem
                key={month}
                className="capitalize"
                checked={visibleMonths.includes(half + index + 1)}
                onCheckedChange={() => onToggleMonth(half + index)}
              >
                {month}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------

























// ----------------------------------------USECALLBCK CASI SOLUCIONADO
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { getBenefitsAssignments, calculatePartialSums, calculateTotals } from '@/actions/estadisticas-actions';
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
//   TableFooter,
// } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger
// } from '@/components/ui/dropdown-menu';
// import { RxMixerHorizontal } from 'react-icons/rx';

// const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

// export default function DoubleEntryTable() {
//   const [data, setData] = useState({ benefits: [], monthlyTotals: [] });
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [localityId, setLocalityId] = useState(null);
//   const [visibleMonths, setVisibleMonths] = useState(Array.from({ length: 12 }, (_, index) => index + 1));
//   const [visibleBenefits, setVisibleBenefits] = useState([]);

//   const fetchData = useCallback(async () => {
//     try {
//       const assignments = await getBenefitsAssignments(year, localityId);
//       const partialSums = await calculatePartialSums(assignments, visibleBenefits, visibleMonths);
//       const totals = await calculateTotals(partialSums, visibleMonths);
//       setData({ benefits: partialSums, monthlyTotals: totals.monthlyTotals });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }, [year, localityId, visibleBenefits, visibleMonths]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   useEffect(() => {
//     if (data.benefits.length > 0 && visibleBenefits.length === 0) {
//       setVisibleBenefits(data.benefits.map(benefit => benefit.benefitId));
//     }
//   }, [data.benefits, visibleBenefits.length]);

//   const handleToggleMonthVisibility = useCallback((index) => {
//     setVisibleMonths((prev) => {
//       const newVisibility = prev.includes(index + 1)
//         ? prev.filter(month => month !== index + 1)
//         : [...prev, index + 1];
//       return newVisibility;
//     });
//   }, []);

//   const handleToggleBenefitVisibility = useCallback((benefitId) => {
//     setVisibleBenefits((prev) => {
//       const newVisibility = prev.includes(benefitId)
//         ? prev.filter(id => id !== benefitId)
//         : [...prev, benefitId];
//       return newVisibility;
//     });
//   }, []);

//   return (
//     <div>
//       <h1>Asignaciones por Beneficio y Mes</h1>
//       <div className="filters">
//         <label>
//           Año:
//           <select value={year} onChange={(e) => setYear(parseInt(e.target.value, 10))}>
//             {[...Array(5).keys()].map(i => (
//               <option key={i} value={2020 + i}>{2020 + i}</option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Localidad:
//           <select value={localityId || ''} onChange={(e) => setLocalityId(e.target.value ? parseInt(e.target.value, 10) : null)}>
//             <option value="">Todas las localidades</option>
//             <option value="1">Carhué</option>
//             <option value="2">San Miguel</option>
//             <option value="3">Gascón</option>
//             <option value="4">Rivera</option>
//             <option value="5">Villa Maza</option>
//             {/* Agrega más opciones según las localidades disponibles */}
//           </select>
//         </label>
//       </div>
//       <div className="flex space-x-2">
//         <MonthVisibilityOptions
//           months={months}
//           visibleMonths={visibleMonths}
//           onToggleMonth={handleToggleMonthVisibility}
//         />
//         <BenefitVisibilityOptions
//           benefits={data.benefits.map((benefit) => ({ id: benefit.benefitId, name: benefit.benefitName }))}
//           visibleBenefits={visibleBenefits}
//           onToggleBenefit={handleToggleBenefitVisibility}
//         />
//       </div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Beneficio</TableHead>
//             {months.map((month, index) => (
//               visibleMonths.includes(index + 1) && <TableHead key={month}>{month}</TableHead>
//             ))}
//             <TableHead>Total</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.benefits.map((benefit) => (
//             visibleBenefits.includes(benefit.benefitId) && (
//               <TableRow key={benefit.benefitId}>
//                 <TableCell>{benefit.benefitName}</TableCell>
//                 {months.map((month, monthIndex) => (
//                   visibleMonths.includes(monthIndex + 1) && (
//                     <TableCell key={month}>{benefit.monthlyAssignments[monthIndex]?.amount || 0}</TableCell>
//                   )
//                 ))}
//                 <TableCell>{benefit.totalAmount}</TableCell>
//               </TableRow>
//             )
//           ))}
//         </TableBody>
//         <TableFooter>
//           <TableRow>
//             <TableCell>Total General</TableCell>
//             {data.monthlyTotals.map(total => (
//               visibleMonths.includes(total.month) && <TableCell key={total.month}>{total.amount}</TableCell>
//             ))}
//             <TableCell>{data.monthlyTotals.reduce((sum, total) => sum + total.amount, 0)}</TableCell>
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </div>
//   );
// }

// function MonthVisibilityOptions({ months, visibleMonths, onToggleMonth }) {
//   const half = Math.ceil(months.length / 2);
//   const firstColumn = months.slice(0, half);
//   const secondColumn = months.slice(half);
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="sm" className="ml-auto h-10 lg:flex">
//           <RxMixerHorizontal className="h-4 w-4 mr-2" />
//           Mostrar Meses
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56">
//         <DropdownMenuLabel>Meses visibles</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <div className="flex">
//           <div className="flex-1">
//             {firstColumn.map((month, index) => (
//               <DropdownMenuCheckboxItem
//                 key={month}
//                 className="capitalize"
//                 checked={visibleMonths.includes(index + 1)}
//                 onCheckedChange={() => onToggleMonth(index)}
//               >
//                 {month}
//               </DropdownMenuCheckboxItem>
//             ))}
//           </div>
//           <div className="flex-1">
//             {secondColumn.map((month, index) => (
//               <DropdownMenuCheckboxItem
//                 key={month}
//                 className="capitalize"
//                 checked={visibleMonths.includes(half + index + 1)}
//                 onCheckedChange={() => onToggleMonth(half + index)}
//               >
//                 {month}
//               </DropdownMenuCheckboxItem>
//             ))}
//           </div>
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// function BenefitVisibilityOptions({ benefits, visibleBenefits, onToggleBenefit }) {
//   const half = Math.ceil(benefits.length / 2);
//   const firstColumn = benefits.slice(0, half);
//   const secondColumn = benefits.slice(half);
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="sm" className="ml-auto h-10 lg:flex">
//           <RxMixerHorizontal className="h-4 w-4 mr-2" />
//           Beneficios
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-[300px]">
//         <DropdownMenuLabel>Beneficios visibles</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <div className="flex">
//           <div className="flex-1">
//             {firstColumn.map((benefit) => (
//               <DropdownMenuCheckboxItem
//                 key={benefit.id}
//                 className="capitalize"
//                 checked={visibleBenefits.includes(benefit.id)}
//                 onCheckedChange={() => onToggleBenefit(benefit.id)}
//               >
//                 {benefit.name}
//               </DropdownMenuCheckboxItem>
//             ))}
//           </div>
//           <div className="flex-1">
//             {secondColumn.map((benefit) => (
//               <DropdownMenuCheckboxItem
//                 key={benefit.id}
//                 className="capitalize"
//                 checked={visibleBenefits.includes(benefit.id)}
//                 onCheckedChange={() => onToggleBenefit(benefit.id)}
//               >
//                 {benefit.name}
//               </DropdownMenuCheckboxItem>
//             ))}
//           </div>
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }











































// 'use client';

// import React, { useState, useEffect } from 'react';
// import { getBenefitsAssignments, calculatePartialSums, calculateTotals } from '@/actions/estadisticas-actions';
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
//   TableFooter,
// } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { RxMixerHorizontal } from 'react-icons/rx';

// const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

// export default function DoubleEntryTable() {
//   const [data, setData] = useState({ benefits: [], monthlyTotals: [] });
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [localityId, setLocalityId] = useState(null);
//   const [visibleMonths, setVisibleMonths] = useState(Array.from({ length: 12 }, (_, index) => index + 1));
//   const [visibleBenefits, setVisibleBenefits] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const assignments = await getBenefitsAssignments(year, localityId);
//         const partialSums = await calculatePartialSums(assignments, visibleBenefits, visibleMonths);
//         const totals = await calculateTotals(partialSums, visibleMonths);
//         setData({ benefits: partialSums, monthlyTotals: totals.monthlyTotals });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     fetchData();
//   }, [year, localityId, visibleBenefits, visibleMonths]);

//   const handleToggleMonthVisibility = (index) => {
//     setVisibleMonths((prev) => {
//       const newVisibility = prev.includes(index + 1)
//         ? prev.filter(month => month !== index + 1)
//         : [...prev, index + 1];
//       return newVisibility;
//     });
//   };

//   const handleToggleBenefitVisibility = (index) => {
//     setVisibleBenefits((prev) => {
//       const newVisibility = prev.includes(data.benefits[index].benefitId)
//         ? prev.filter(id => id !== data.benefits[index].benefitId)
//         : [...prev, data.benefits[index].benefitId];
//       return newVisibility;
//     });
//   };

//   return (
//     <div>
//       <h1>Asignaciones por Beneficio y Mes</h1>
//       <div className="filters">
//         <label>
//           Año:
//           <select value={year} onChange={(e) => setYear(parseInt(e.target.value, 10))}>
//             {[...Array(5).keys()].map(i => (
//               <option key={i} value={2020 + i}>{2020 + i}</option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Localidad:
//           <select value={localityId || ''} onChange={(e) => setLocalityId(e.target.value ? parseInt(e.target.value, 10) : null)}>
//             <option value="">Todas las localidades</option>
//             <option value="1">Carhué</option>
//             <option value="2">San Miguel</option>
//             <option value="3">Gascón</option>
//             <option value="4">Rivera</option>
//             <option value="5">Villa Maza</option>
//             {/* Agrega más opciones según las localidades disponibles */}
//           </select>
//         </label>
//       </div>
//       <div className="flex space-x-2">
//         <MonthVisibilityOptions
//           months={months}
//           visibleMonths={visibleMonths}
//           onToggleMonth={handleToggleMonthVisibility}
//         />
//         <BenefitVisibilityOptions
//           benefits={data.benefits.map((benefit) => benefit.benefitName)}
//           visibleBenefits={visibleBenefits}
//           onToggleBenefit={handleToggleBenefitVisibility}
//         />
//       </div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Beneficio</TableHead>
//             {months.map((month, index) => (
//               visibleMonths.includes(index + 1) && <TableHead key={month}>{month}</TableHead>
//             ))}
//             <TableHead>Total</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.benefits.map((benefit, benefitIndex) => (
//             visibleBenefits.includes(benefit.benefitId) && (
//               <TableRow key={benefit.benefitId}>
//                 <TableCell>{benefit.benefitName}</TableCell>
//                 {months.map((month, monthIndex) => (
//                   visibleMonths.includes(monthIndex + 1) && (
//                     <TableCell key={month}>{benefit.monthlyAssignments[monthIndex]?.amount || 0}</TableCell>
//                   )
//                 ))}
//                 <TableCell>{benefit.totalAmount}</TableCell>
//               </TableRow>
//             )
//           ))}
//         </TableBody>
//         <TableFooter>
//           <TableRow>
//             <TableCell>Total General</TableCell>
//             {data.monthlyTotals.map(total => (
//               visibleMonths.includes(total.month) && <TableCell key={total.month}>{total.amount}</TableCell>
//             ))}
//             <TableCell>{data.monthlyTotals.reduce((sum, total) => sum + total.amount, 0)}</TableCell>
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </div>
//   );
// }

// function MonthVisibilityOptions({ months, visibleMonths, onToggleMonth }) {
//   const half = Math.ceil(months.length / 2);
//   const firstColumn = months.slice(0, half);
//   const secondColumn = months.slice(half);
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="sm" className="ml-auto h-10 lg:flex" >
//           <RxMixerHorizontal className="h-4 w-4 mr-2" />
//           Mostrr Meses
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56">
//         <DropdownMenuLabel>Meses visibles</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         {/* {months.map((month, index) => (
//           <DropdownMenuCheckboxItem
//             key={month}
//             checked={visibleMonths.includes(index + 1)}
//             onCheckedChange={() => onToggleMonth(index)}
//           >
//             {month}
//           </DropdownMenuCheckboxItem>
//         ))} */}
//         <div className="flex">
//           <div className="flex-1">
//             {firstColumn.map((month, index) => (
//               <DropdownMenuCheckboxItem
//                 key={month}
//                 className="capitalize"
//                 checked={visibleMonths[index]}
//                 onCheckedChange={() => onToggleMonth(index)}
//               >
//                 {month}
//               </DropdownMenuCheckboxItem>
//             ))}
//           </div>
//           <div className="flex-1">
//             {secondColumn.map((month, index) => (
//               <DropdownMenuCheckboxItem
//                 key={month}
//                 className="capitalize"
//                 checked={visibleMonths[half + index]}
//                 onCheckedChange={() => onToggleMonth(half + index)}
//               >
//                 {month}
//               </DropdownMenuCheckboxItem>
//             ))}
//           </div>
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// function BenefitVisibilityOptions({ benefits, visibleBenefits, onToggleBenefit }) {
//   const half = Math.ceil(benefits.length / 2);
//   const firstColumn = benefits.slice(0, half);
//   const secondColumn = benefits.slice(half);
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           size="sm"
//           className="ml-auto h-10 lg:flex"
//         >
//           <RxMixerHorizontal className="h-4 w-4 mr-2" />
//           Beneficios
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-[300px]">
//         <DropdownMenuLabel>Beneficios visibles</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         {/* {benefits.map((benefit, index) => (
//           <DropdownMenuCheckboxItem
//             key={index}
//             checked={visibleBenefits.includes(index)}
//             onCheckedChange={() => onToggleBenefit(index)}
//           >
//             {benefit}
//           </DropdownMenuCheckboxItem>
//         ))} */}
//         <div className="flex">
//           <div className="flex-1">
//             {firstColumn.map((benefit, index) => (
//               <DropdownMenuCheckboxItem
//                 key={benefit}
//                 className="capitalize"
//                 checked={visibleBenefits[index]}
//                 onCheckedChange={() => onToggleBenefit(index)}
//               >
//                 {benefit}
//               </DropdownMenuCheckboxItem>
//             ))}
//           </div>
//           <div className="flex-1">
//             {secondColumn.map((benefit, index) => (
//               <DropdownMenuCheckboxItem
//                 key={benefit}
//                 className="capitalize"
//                 checked={visibleBenefits[half + index]}
//                 onCheckedChange={() => onToggleBenefit(half + index)}
//               >
//                 {benefit}
//               </DropdownMenuCheckboxItem>
//             ))}
//           </div>
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// function BenefitVisibilityOptions({ benefits, visibleBenefits, onToggleBenefit }) {
//   // Divide los beneficios en dos columnas
//   const half = Math.ceil(benefits.length / 2);
//   const firstColumn = benefits.slice(0, half);
//   const secondColumn = benefits.slice(half);

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           size="sm"
//           className="ml-auto h-10 lg:flex"
//         >
//           <RxMixerHorizontal className="mr-2 h-4 w-4" />
//           Beneficios
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-[300px]">
//         <DropdownMenuLabel>Beneficios visibles</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <div className="flex">
//           <div className="flex-1">
//             {firstColumn.map((benefit, index) => (
//               <DropdownMenuCheckboxItem
//                 key={benefit}
//                 className="capitalize"
//                 checked={visibleBenefits[index]}
//                 onCheckedChange={() => onToggleBenefit(index)}
//               >
//                 {benefit}
//               </DropdownMenuCheckboxItem>
//             ))}
//           </div>
//           <div className="flex-1">
//             {secondColumn.map((benefit, index) => (
//               <DropdownMenuCheckboxItem
//                 key={benefit}
//                 className="capitalize"
//                 checked={visibleBenefits[half + index]}
//                 onCheckedChange={() => onToggleBenefit(half + index)}
//               >
//                 {benefit}
//               </DropdownMenuCheckboxItem>
//             ))}
//           </div>
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// --------------tabla previo a el action de visibilidads
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { getBenefitsAssignments } from '@/actions/estadisticas-actions';
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
//   TableFooter,
// } from '@/components/ui/table'; // Suponiendo que tienes estos componentes
// import { Button } from '@/components/ui/button';
// import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { RxMixerHorizontal } from 'react-icons/rx';

// const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

// export default function DoubleEntryTable() {
//   const [data, setData] = useState({ benefits: [], monthlyTotals: [] });
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [localityId, setLocalityId] = useState(null);
//   const [visibleMonths, setVisibleMonths] = useState(months.map(() => true));
//   const [visibleBenefits, setVisibleBenefits] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const results = await getBenefitsAssignments(year, localityId);
//         setData(results);
//         setVisibleBenefits(results.benefits.map(() => true));
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     fetchData();
//   }, [year, localityId]);

//   const handleToggleMonthVisibility = (index) => {
//     setVisibleMonths((prev) => {
//       const newVisibility = [...prev];
//       newVisibility[index] = !newVisibility[index];
//       return newVisibility;
//     });
//   };

//   const handleToggleBenefitVisibility = (index) => {
//     setVisibleBenefits((prev) => {
//       const newVisibility = [...prev];
//       newVisibility[index] = !newVisibility[index];
//       return newVisibility;
//     });
//   };

//   return (
//     <div>
//       <h1>Asignaciones por Beneficio y Mes</h1>
//       <div className="filters">
//         <label>
//           Año:
//           <select value={year} onChange={(e) => setYear(parseInt(e.target.value, 10))}>
//             {[...Array(5).keys()].map(i => (
//               <option key={i} value={2020 + i}>{2020 + i}</option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Localidad:
//           <select value={localityId || ''} onChange={(e) => setLocalityId(e.target.value ? parseInt(e.target.value, 10) : null)}>
//             <option value="">Todas las localidades</option>
//             {/* Aquí deberías mapear tus localidades */}
//             <option value="1">Carhue</option>
//             <option value="2">San Miguel</option>
//             <option value="3">Gascon</option>
//             <option value="4">Rivera</option>
//             <option value="5">Villa Maza</option>
//             {/* Agrega más opciones según las localidades disponibles */}
//           </select>
//         </label>
//       </div>
//       <div className="flex space-x-2">
//         <MonthVisibilityOptions
//           months={months}
//           visibleMonths={visibleMonths}
//           onToggleMonth={handleToggleMonthVisibility}
//         />
//         <BenefitVisibilityOptions
//           benefits={data.benefits.map((benefit) => benefit.benefitName)}
//           visibleBenefits={visibleBenefits}
//           onToggleBenefit={handleToggleBenefitVisibility}
//         />
//       </div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Beneficio</TableHead>
//             {months.map((month, index) => (
//               visibleMonths[index] && <TableHead key={month}>{month}</TableHead>
//             ))}
//             <TableHead>Total</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.benefits.map((benefit, benefitIndex) => (
//             visibleBenefits[benefitIndex] && (
//               <TableRow key={benefit.benefitId}>
//                 <TableCell>{benefit.benefitName}</TableCell>
//                 {months.map((month, monthIndex) => {
//                   const monthlyAssignment = benefit.monthlyAssignments.find(
//                     (assignment) => assignment.month === monthIndex + 1
//                   );
//                   return (
//                     visibleMonths[monthIndex] && (
//                       <TableCell key={monthIndex}>
//                         {monthlyAssignment ? monthlyAssignment.amount : "-"}
//                       </TableCell>
//                     )
//                   );
//                 })}
//                 <TableCell>{benefit.totalAmount}</TableCell>
//               </TableRow>
//             )
//           ))}
//           <TableRow>
//             <TableCell>Total</TableCell>
//             {data.monthlyTotals.map((total, index) => (
//               visibleMonths[index] && (
//                 <TableCell key={index}>
//                   {total.amount}
//                 </TableCell>
//               )
//             ))}
//             <TableCell>
//               {data.monthlyTotals.reduce((sum, total) => sum + total.amount, 0)}
//             </TableCell>
//           </TableRow>
//         </TableBody>
//         <TableFooter>
//           <TableRow>
//             <TableHead>Beneficio</TableHead>
//             {months.map((month) => (
//               visibleMonths[months.indexOf(month)] && <TableHead key={month}>{month}</TableHead>
//             ))}
//             <TableHead>Total</TableHead>
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </div>
//   );
// }

// function MonthVisibilityOptions({ months, visibleMonths, onToggleMonth }) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           size="sm"
//           className="ml-auto h-10 lg:flex"
//         >
//           <RxMixerHorizontal className="mr-2 h-4 w-4" />
//           Meses
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-[150px]">
//         <DropdownMenuLabel>Meses visibles</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         {months.map((month, index) => (
//           <DropdownMenuCheckboxItem
//             key={month}
//             className="capitalize"
//             checked={visibleMonths[index]}
//             onCheckedChange={() => onToggleMonth(index)}
//           >
//             {month}
//           </DropdownMenuCheckboxItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// // function BenefitVisibilityOptions({ benefits, visibleBenefits, onToggleBenefit }) {
// //   return (
// //     <DropdownMenu>
// //       <DropdownMenuTrigger asChild>
// //         <Button
// //           variant="outline"
// //           size="sm"
// //           className="ml-auto h-10 lg:flex"
// //         >
// //           <RxMixerHorizontal className="mr-2 h-4 w-4" />
// //           Beneficios
// //         </Button>
// //       </DropdownMenuTrigger>
// //       <DropdownMenuContent className="w-[150px]">
// //         <DropdownMenuLabel>Beneficios visibles</DropdownMenuLabel>
// //         <DropdownMenuSeparator />
// //         {benefits.map((benefit, index) => (
// //           <DropdownMenuCheckboxItem
// //             key={benefit}
// //             className="capitalize"
// //             checked={visibleBenefits[index]}
// //             onCheckedChange={() => onToggleBenefit(index)}
// //           >
// //             {benefit}
// //           </DropdownMenuCheckboxItem>
// //         ))}
// //       </DropdownMenuContent>
// //     </DropdownMenu>
// //   );
// // }
// function BenefitVisibilityOptions({ benefits, visibleBenefits, onToggleBenefit }) {
//   // Divide los beneficios en dos columnas
//   const half = Math.ceil(benefits.length / 2);
//   const firstColumn = benefits.slice(0, half);
//   const secondColumn = benefits.slice(half);

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           size="sm"
//           className="ml-auto h-10 lg:flex"
//         >
//           <RxMixerHorizontal className="mr-2 h-4 w-4" />
//           Beneficios
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-[300px]">
//         <DropdownMenuLabel>Beneficios visibles</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <div className="flex">
//           <div className="flex-1">
//             {firstColumn.map((benefit, index) => (
//               <DropdownMenuCheckboxItem
//                 key={benefit}
//                 className="capitalize"
//                 checked={visibleBenefits[index]}
//                 onCheckedChange={() => onToggleBenefit(index)}
//               >
//                 {benefit}
//               </DropdownMenuCheckboxItem>
//             ))}
//           </div>
//           <div className="flex-1">
//             {secondColumn.map((benefit, index) => (
//               <DropdownMenuCheckboxItem
//                 key={benefit}
//                 className="capitalize"
//                 checked={visibleBenefits[half + index]}
//                 onCheckedChange={() => onToggleBenefit(half + index)}
//               >
//                 {benefit}
//               </DropdownMenuCheckboxItem>
//             ))}
//           </div>
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }









// ---SIN VISIBILIDAD
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
//   TableFooter,
// } from '@/components/ui/table'; // Suponiendo que tienes estos componentes

// export default function DoubleEntryTable() {
//   const [data, setData] = useState({ benefits: [], monthlyTotals: [] });
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [localityId, setLocalityId] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const results = await getBenefitsAssignments(year, localityId);
//         setData(results);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     fetchData();
//   }, [year, localityId]);

//   const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

//   return (
//     <div>
//       <h1>Asignaciones por Beneficio y Mes</h1>
//       <div className="filters">
//         <label>
//           Año:
//           <select value={year} onChange={(e) => setYear(parseInt(e.target.value, 10))}>
//             {[...Array(5).keys()].map(i => (
//               <option key={i} value={2020 + i}>{2020 + i}</option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Localidad:
//           <select value={localityId || ''} onChange={(e) => setLocalityId(e.target.value ? parseInt(e.target.value, 10) : null)}>
//             <option value="">Todas las localidades</option>
//             {/* Aquí deberías mapear tus localidades */}
//             <option value="1">Carhue</option>
//             <option value="2">San Miguel</option>
//             <option value="3">Gascon</option>
//             <option value="4">Rivera</option>
//             <option value="5">Villa Maza</option>
//             {/* Agrega más opciones según las localidades disponibles */}
//           </select>
//         </label>
//       </div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Beneficio</TableHead>
//             {months.map((month) => (
//               <TableHead key={month}>{month}</TableHead>
//             ))}
//             <TableHead>Total</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.benefits.map((benefit) => (
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
//               <TableCell>{benefit.totalAmount}</TableCell>
//             </TableRow>
//           ))}
//           <TableRow>
//             <TableCell>Total</TableCell>
//             {data.monthlyTotals.map((total, index) => (
//               <TableCell key={index}>
//                 {total.amount}
//               </TableCell>
//             ))}
//             <TableCell>
//               {data.monthlyTotals.reduce((sum, total) => sum + total.amount, 0)}
//             </TableCell>
//           </TableRow>
//         </TableBody>
//         <TableFooter>
//           <TableRow>
//             <TableHead>Beneficio</TableHead>
//             {months.map((month) => (
//               <TableHead key={month}>{month}</TableHead>
//             ))}
//             <TableHead>Total</TableHead>
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </div>
//   );
// }
