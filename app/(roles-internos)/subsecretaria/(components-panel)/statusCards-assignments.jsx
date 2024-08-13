'use client'
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MdCheck, MdClose, MdMoreHoriz, MdOutlinePause, MdOutlinePriorityHigh } from "react-icons/md"
import { getInfoCards } from "@/actions/subse-actions"

export default function StatusCardAssignments() {

  const [luz, setLuz] = useState()
  const [gas, setGas] = useState()
  const [consulta, setConsulta] = useState()
  const [estudio, setEstudio] = useState()
  const [traslados, setTraslados] = useState()
  const [materiales, setMateriales] = useState()
  const [alquiler, setAlquiler] = useState()
  const [necesidades, setNecesidades] = useState()


  useEffect(() => {
    async function fetchData(){
      try {
        const data = await getInfoCards();
        setLuz(data.luz)
        setGas(data.gas)
        setConsulta(data.consulta)
        setEstudio(data.estudio)
        setTraslados(data.traslados)
        setTraslados(data.traslados)
        setMateriales(data.materiales)
        setAlquiler(data.alquiler)
        setNecesidades(data.necesidades)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [])

  return(
    // <div className="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-5 mt-4">
    <div className="flex mx-auto gap-2 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Luz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{luz} </div>
            </CardContent>
          </Card>
          <Card cl >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
              <CardTitle className="text-sm font-medium">
                gas
              </CardTitle>
              {/* <Users className="h-4 w-4 text-muted-foreground" /> */}

            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gas} </div>
            </CardContent>
          </Card>
          <Card cl >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
              <CardTitle className="text-sm font-medium">Consulta Medica</CardTitle>
              {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{consulta} </div>
            </CardContent>
          </Card>
          <Card cl >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
              <CardTitle className="text-sm font-medium">Estudio Medico</CardTitle>
              {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estudio} </div>
            </CardContent>
          </Card>
          <Card cl >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
              <CardTitle className="text-sm font-medium">
                Traslados
              </CardTitle>
                {/* <MdInfoOutline  /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{traslados} </div>
            </CardContent>
          </Card>
          <Card cl >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
              <CardTitle className="text-sm font-medium">
                Materiales
              </CardTitle>
                {/* <MdInfoOutline  /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{materiales} </div>
            </CardContent>
          </Card>
          
          <Card cl >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
              <CardTitle className="text-sm font-medium">
                Alquileres
              </CardTitle>
                {/* <MdInfoOutline  /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alquiler} </div>
            </CardContent>
          </Card>
          <Card cl >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
              <CardTitle className="text-sm font-medium">
                Necesidades Basicas
              </CardTitle>
                {/* <MdInfoOutline  /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{necesidades} </div>
            </CardContent>
          </Card>
          
          
        </div>
  )
}