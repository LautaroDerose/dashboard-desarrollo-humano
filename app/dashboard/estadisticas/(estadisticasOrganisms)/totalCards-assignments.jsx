'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MdCheck, MdClose, MdMoreHoriz, MdOutlinePause, MdOutlinePriorityHigh } from "react-icons/md"
import { getAssignmentsForLocalities } from '@/actions/estadisticas-actions';
import React, { useState, useEffect } from 'react';

export default function TotalCards() {
    const [results, setResults] = useState([]);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const data = await getAssignmentsForLocalities();
          if (Array.isArray(data)) {
            setResults(data);
          } else {
            console.error('Expected data to be an array:', data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchData();
    }, []);
  
    return (
      <div className="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-5 mt-4">
        {results.map((result) => (
          <Card key={result.localityId} >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
              {result.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{result.count} Asignaciones</div>
              {/* <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p> */}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  //   const [results, setResults] = useState([]);
  
  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         const data = await getAssignmentsForLocalities();
  //         if (Array.isArray(data)) {
  //           setResults(data);
  //         } else {
  //           console.error('Expected data to be an array:', data);
  //         }
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     }
  //     fetchData();
  //   }, []);
  
  //   return (
  //     <div>
  //       <h1>Asignaciones por localidad</h1>
  //       <ul>
  //         {results.map((result) => (
  //           <li key={result.localityId}>
  //             Localidad {result.name}: {result.count} asignaciones
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // }




// export default function TotalCards() {
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await getAssignmentsForLocalities();
//         if (Array.isArray(data)) {
//           setResults(data);
//         } else {
//           console.error('Expected data to be an array:', data);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Asignaciones por localidad</h1>
//       <ul>
//         {results.map((result) => (
//           <li key={result.localityId}>
//             Localidad {result.localityId}: {result.count} asignaciones
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }