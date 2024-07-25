'use client'
import { getFilteredAssignmentsCount, getInfoForGraphics } from '@/actions/estadisticas-actions';
import React, { useState, useEffect } from 'react';

export default function Calculator() {
  const [list, setList] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState(1);

  const localities = [
    { id: 1, name: 'Carhue' },
    { id: 2, name: 'San Miguel' },
    { id: 3, name: 'Gascon' },
    { id: 4, name: 'Rivera' },
    { id: 5, name: 'Villa Maza' },
  ];

  useEffect(() => {
    async function fetchData(localityId) {
      try {
        const data = await getInfoForGraphics(localityId);
        setList(data.totalAssignmentsByLocality);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData(selectedLocality);
  }, [selectedLocality]);

  const handleLocalityChange = (event) => {
    setSelectedLocality(Number(event.target.value));
  };

  return (
    <div>
      <h1>Asignaciones por localidad</h1>
      <select value={selectedLocality} onChange={handleLocalityChange}>
        {localities.map((locality) => (
          <option key={locality.id} value={locality.id}>
            {locality.name}
          </option>
        ))}
      </select>
      <p>{list !== null ? list : 'Cargando...'}</p>
    </div>
  );
}

// export default function Calculator () {
//   const [list, setList] = useState([])

//   useEffect(() => {
//     async function getList(){
//       try {
//         const data = await getInfoForGraphics()
//         setList(data.totalLastMonthAssignments)
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//     getList()
//   }, [])
  
//   return(
//     <div>
//     <h1>Asignaciones por localidad</h1>
//       <p>{list}</p>
//     </div>
//   );
// };

// const [benefitId, setBenefitId] = useState(null);
//   const [withWithdrawal, setWithWithdrawal] = useState(false);
//   const [timeFilter, setTimeFilter] = useState({ type: '', value: null });
//   const [count, setCount] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     if (!benefitId) {
//       setError("Please select a benefit");
//       return;
//     }
    
//     setError(null);
//     try {
//       console.log('Fetching data with:', { benefitId, timeFilter, withWithdrawal });
//       const count = await getFilteredAssignmentsCount({ benefitId, timeFilter, withWithdrawal });
//       console.log('Fetched count:', count);
//       setCount(count);
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setError("An error occurred while fetching data");
//     }
//   };

//   return (
//     <div>
//       <h1>Filter Assignments</h1>

//       <label>
//         Benefit:
//         <select onChange={(e) => setBenefitId(Number(e.target.value))} value={benefitId || ''}>
//           <option value="">Select Benefit</option>
//           <option value={1}>Alimentos</option>
//           <option value={2}>Agua</option>
//           {/* Add all benefits here */}
//         </select>
//       </label>

//       <label>
//         With Withdrawal:
//         <input
//           type="checkbox"
//           checked={withWithdrawal}
//           onChange={() => setWithWithdrawal(!withWithdrawal)}
//         />
//       </label>

//       <label>
//         Time Filter:
//         <select onChange={(e) => setTimeFilter({ type: e.target.value, value: timeFilter.value })}>
//           <option value="">No Filter</option>
//           <option value="lastMonth">Last Month</option>
//           <option value="lastYear">Last Year</option>
//           <option value="specificMonth">Specific Month</option>
//         </select>
//       </label>

//       {timeFilter.type === 'specificMonth' && (
//         <label>
//           Select Month and Year:
//           <input
//             type="month"
//             onChange={(e) => setTimeFilter({ type: timeFilter.type, value: e.target.value })}
//           />
//         </label>
//       )}

//       <div>
//         <button onClick={fetchData}>Fetch Count</button>
//       </div>

//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       {count !== null && <div>Assignments Count: {count}</div>}
//     </div>