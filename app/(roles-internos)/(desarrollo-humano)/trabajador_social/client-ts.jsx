'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetTsData } from "@/actions/subsidy-actions/credencial-actions";
import { useEffect, useState } from "react";
import RecentsCredentials from "./recent-credentials";

export default function ClientHomeTs() {
  const [tsData, setTsData] = useState({});
  const [totalPerMonth, setTotalPerMonth] = useState();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await GetTsData(selectedMonth, selectedYear);
        setTsData(data.results);
        setTotalPerMonth(data.totalPerMonth);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [selectedMonth, selectedYear]);

  return (
    <div>
      {/* <div>
        <label htmlFor="month-select">Seleccionar mes: </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString('es-ES', { month: 'long' })}
            </option>
          ))}
        </select>

        <label htmlFor="year-select">Seleccionar año: </label>
        <input
          type="number"
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          min="2000"
          max={new Date().getFullYear()}
        />
      </div> */}

      <Card className="m-2">
        <CardHeader>
          <CardTitle>Total visitas del mes: <span>{totalPerMonth}</span></CardTitle>
        </CardHeader>
      </Card>
      <div className="flex gap-2 p-2">
        {Object.keys(tsData).map((tsName) => (
          <Card key={tsName} className="w-[800px] flex flex-col mx-auto justify-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-2xl font-bold">
                {tsName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <h1>Visitas realizadas el mes de: {`${(selectedMonth + 1).toString().padStart(2, '0')}/${selectedYear}`}</h1>
                <span>{tsData[tsName]?.currentMonthVisits}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
        <div className=" gap-4 p-2">
          <RecentsCredentials />
          {/* <NextCardAssignments /> */}
        </div>
    </div>
  );
}
// 'use client';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { GetTsData } from "@/actions/other-actions/credencial-actions";
// import { useEffect, useState } from "react";

// export default function ClientHomeTs() {
//   const [tsData, setTsData] = useState({});
//   const [totalPerMonth, setTotalPerMonth] = useState();

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await GetTsData();
//         setTsData(data.results);
//         setTotalPerMonth(data.totalPerMonth)
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <div>
//     <div>
//       <h1>Total</h1>
//       <p>{totalPerMonth}</p>
//     </div>
//       {Object.keys(tsData).map(tsName => (
//         <Card key={tsName} className="w-[800px] flex flex-col mx-auto justify-center">
//           <CardHeader>
//             <CardTitle className="flex items-center justify-between text-2xl font-bold">
//               {tsName}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div>
//               <h1>Visitas realizadas este mes:</h1>
//               <span>{tsData[tsName]?.currentMonthVisits}</span>
//               <h2>Visitas realizadas el mes anterior:</h2>
//               <span>{tsData[tsName]?.previousMonthVisits}</span>
//               <h2>Total de visitas:</h2>
//               <span>{tsData[tsName]?.totalVisits}</span>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }
