'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetTsData } from "@/actions/subsidy-actions/credencial-actions";
import { useEffect, useState } from "react";

export default function ClientHomeSec() {
  const [tsData, setTsData] = useState({});
  const [totalPerMonth, setTotalPerMonth] = useState();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => currentYear - i); // Ajusta el rango de años según necesites

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
        <Card >
          <CardHeader>
            <CardTitle>
              Visitas Domiciliarias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <div className="flex gap-2">
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
                </div>

                <div className="flex gap-2">
                  <label htmlFor="year-select">Seleccionar año: </label>
                  <select
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex">
                <h1 className="mr-4">Total visitas del mes seleccionado:</h1>
                <p>{totalPerMonth}</p>
              </div>

            </div>
            <div className="flex gap-4 mt-4">
              {Object.keys(tsData).map((tsName) => (
                <Card key={tsName} className="w-[800px] flex flex-col mx-auto justify-center">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-2xl font-bold">
                      {tsName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <div className="flex gap-2">
                        <h1>Visitas realizadas este mes:</h1>
                        <span>{tsData[tsName]?.currentMonthVisits}</span>
                      </div>
                      <div className="flex gap-2">
                        <h2>Visitas realizadas el mes anterior:</h2>
                        <span>{tsData[tsName]?.previousMonthVisits}</span>
                      </div>
                      <div className="flex gap-2">
                        <h2>Total de visitas:</h2>
                        <span>{tsData[tsName]?.totalVisits}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>     
    </div>
  );
}