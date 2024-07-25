'use client'
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MdCheck, MdClose, MdMoreHoriz, MdOutlinePause, MdOutlinePriorityHigh } from "react-icons/md"
import { getInfoCards } from "@/actions/assignment-actions"

export default function StatusCardAssignments() {

  const [rechazados, setRechazados] = useState()
  const [pendientes, setPendientes] = useState()
  const [enProceso, setEnProceso] = useState()
  const [concretado, setConcretado] = useState()
  const [revision, setRevision] = useState()


  useEffect(() => {
    async function fetchData(){
      try {
        const data = await getInfoCards();
        setRechazados(data.rechazados)
        setPendientes(data.pendientes)
        setEnProceso(data.enProcesos)
        setConcretado(data.concretados)
        setRevision(data.enRevision)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [])

  return(
    <div className="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-5 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Revision
              </CardTitle>
              <div className=" flex items-center justify-center border-2 p-1  border-orange-500 w-6 h-6 rounded-full">
                <MdOutlinePriorityHigh className="text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{revision} Asignaciones</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
              <CardTitle className="text-sm font-medium">
                Rechazdos
              </CardTitle>
              <div className=" flex items-center justify-center border-2 p-1  border-red-200 w-6 h-6 rounded-full">
                <MdClose className="text-red-200" />
              </div>
                {/* <MdInfoOutline  /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rechazados} Asignacion/es</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
              <CardTitle className="text-sm font-medium">
                Pendientes
              </CardTitle>
              {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
              <div className=" flex items-center justify-center border-2 p-1  border-yellow-200 w-6 h-6 rounded-full">
                <MdOutlinePause className="text-yellow-200" />
              </div>

            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendientes} Asignacion/es</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
              <CardTitle className="text-sm font-medium">En procesos</CardTitle>
              <div className=" flex items-center justify-center border-2 p-1  border-blue-200 w-6 h-6 rounded-full">
                <MdMoreHoriz className="text-blue-200" />
              </div>
              {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enProceso} Asignacion/es</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
              <CardTitle className="text-sm font-medium">Concretado</CardTitle>
              <div className=" flex items-center justify-center border-2 p-1  border-green-200 w-6 h-6 rounded-full">
                <MdCheck className="text-green-200" />
              </div>
              {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{concretado} Asignacion/es</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
  )
}