'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MdCheck, MdClose, MdMoreHoriz, MdOutlinePause, MdOutlinePriorityHigh } from "react-icons/md"

export default function StatusCardRecipients({ menoresDe18, entre18Y35, entre18Y25, entre26Y35, entre36Y50, entre50Y60, mayoresDe60, masculino, femenino, recipientsWithLocalitiesNames}) {

  return(
    <div className="flex flex-col">
      <div className="w-full flex gap-4 mt-4">
        <Card className="w-full p-4 flex items-center gap-2">
          <div className="h-8 w-8 p-2 flex items-center justify-center rounded-full bg-slate-200 text-slate-800 font-bold ">
            {menoresDe18}
          </div>
          <h2 className=""> Personas menores de 18 </h2>
        </Card>
        <Card className="w-full p-4 flex items-center gap-2">
          <div className="h-8 w-8 p-2 flex items-center justify-center rounded-full bg-slate-200 text-slate-800 font-bold ">
            {entre18Y35}
          </div>
          <h2 className=""> Personas entre 18 y 35 </h2>
        </Card>
        {/* <Card className="w-full p-4 flex items-center gap-2">
          <div className="h-8 w-8 p-2 flex items-center justify-center rounded-full bg-slate-200 text-slate-800 font-bold ">
            {entre18Y25}
          </div>
          <h2 className=""> Personas entre 18 y 25 </h2>
        </Card>
        <Card className="w-full p-4 flex items-center gap-2">
          <div className="h-8 w-8 p-2 flex items-center justify-center rounded-full bg-slate-200 text-slate-800 font-bold ">
            {entre26Y35}
          </div>
          <h2 className=""> Personas entre 26 y 35 </h2>
        </Card> */}
        <Card className="w-full p-4 flex items-center gap-2">
          <div className="h-8 w-8 p-2 flex items-center justify-center rounded-full bg-slate-200 text-slate-800 font-bold ">
            {entre36Y50}
          </div>
          <h2 className=""> Personas entre 36 y 50 </h2>
        </Card>
        <Card className="w-full p-4 flex items-center gap-2">
          <div className="h-8 w-8 p-2 flex items-center justify-center rounded-full bg-slate-200 text-slate-800 font-bold ">
            {entre50Y60}
          </div>
          <h2 className=""> Personas entre 50 y 60 </h2>
        </Card>
        <Card className="w-full p-4 flex items-center gap-2">
          <div className="h-8 w-8 p-2 flex items-center justify-center rounded-full bg-slate-200 text-slate-800 font-bold ">
            {mayoresDe60}
          </div>
          <h2 className=""> Personas mayores de 60 </h2>
        </Card>
      </div>
      <div className="flex gap-3 ">
        <div className="flex gap-4 mt-4">
          {recipientsWithLocalitiesNames.map((locality) => (
            <Card key={locality.locality_id} className="p-4 flex items-center gap-2">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-800 font-bold ">
              {locality.count}
            </div> 
            <h2 className=""> {locality.localityName} </h2>
            </Card>
          ))}   
          <Separator orientation="vertical" />
        </div>
        <div className="flex gap-4 mt-4">
          <Card className="w-full p-4 flex items-center gap-2">
            <div className="h-8 w-8 p-2 flex items-center justify-center rounded-full bg-slate-200 text-slate-800 font-bold ">
              {masculino}
            </div>
            <h2 className="">Hombres</h2>
          </Card>
          <Card className="w-full p-4 flex items-center gap-2">
            <div className="h-8 w-8 p-2 flex items-center justify-center rounded-full bg-slate-200 text-slate-800 font-bold ">
              {femenino}
            </div>
            <h2 className=""> Mujeres</h2>
          </Card>
        </div>
      </div>
    </div>
  )
}
// 'use client'
// import { useEffect, useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { MdCheck, MdClose, MdMoreHoriz, MdOutlinePause, MdOutlinePriorityHigh } from "react-icons/md"
// import { getInfoCards } from "@/actions/assignment-actions"

// export default function StatusCardAssignments() {

//   const [rechazados, setRechazados] = useState()
//   const [pendientes, setPendientes] = useState()
//   const [enProceso, setEnProceso] = useState()
//   const [concretado, setConcretado] = useState()
//   const [revision, setRevision] = useState()


//   useEffect(() => {
//     async function fetchData(){
//       try {
//         const data = await getInfoCards();
//         setRechazados(data.rechazados)
//         setPendientes(data.pendientes)
//         setEnProceso(data.enProcesos)
//         setConcretado(data.concretados)
//         setRevision(data.enRevision)
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//     fetchData();
//   }, [])

//   return(
//     <div className="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-5 mt-4">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">
//             Revision
//           </CardTitle>
//           <div className=" flex items-center justify-center border-2 p-1  border-orange-500 w-6 h-6 rounded-full">
//             <MdOutlinePriorityHigh className="text-orange-500" />
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{revision} Asignaciones</div>
//           <p className="text-xs text-muted-foreground">
//             +20.1% from last month
//           </p>
//         </CardContent>
//       </Card>
//       <Card >
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
//           <CardTitle className="text-sm font-medium">
//             Rechazdos
//           </CardTitle>
//           <div className=" flex items-center justify-center border-2 p-1  border-red-200 w-6 h-6 rounded-full">
//             <MdClose className="text-red-200" />
//           </div>
//             {/* <MdInfoOutline  /> */}
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{rechazados} Asignacion/es</div>
//           <p className="text-xs text-muted-foreground">
//             +20.1% from last month
//           </p>
//         </CardContent>
//       </Card>
//       <Card >
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
//           <CardTitle className="text-sm font-medium">
//             Pendientes
//           </CardTitle>
//           {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
//           <div className=" flex items-center justify-center border-2 p-1  border-yellow-200 w-6 h-6 rounded-full">
//             <MdOutlinePause className="text-yellow-200" />
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{pendientes} Asignacion/es</div>
//           <p className="text-xs text-muted-foreground">
//             +180.1% from last month
//           </p>
//         </CardContent>
//       </Card>
//       <Card >
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
//           <CardTitle className="text-sm font-medium">En procesos</CardTitle>
//           <div className=" flex items-center justify-center border-2 p-1  border-blue-200 w-6 h-6 rounded-full">
//             <MdMoreHoriz className="text-blue-200" />
//           </div>
//           {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{enProceso} Asignacion/es</div>
//           <p className="text-xs text-muted-foreground">
//             +19% from last month
//           </p>
//         </CardContent>
//       </Card>
//       <Card >
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
//           <CardTitle className="text-sm font-medium">Concretado</CardTitle>
//           <div className=" flex items-center justify-center border-2 p-1  border-green-200 w-6 h-6 rounded-full">
//             <MdCheck className="text-green-200" />
//           </div>
//           {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{concretado} Asignacion/es</div>
//           <p className="text-xs text-muted-foreground">
//             +201 since last hour
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }