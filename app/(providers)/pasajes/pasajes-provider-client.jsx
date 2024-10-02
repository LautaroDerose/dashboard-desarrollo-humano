'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2Icon, AlertCircleIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TravelSubsidies({ pendingSubsidies, recentSubsidies, onComplete }) {
  const [completing, setCompleting] = useState(null)

  const handleComplete = async (id) => {
    setCompleting(id)
    try {
      await onComplete(id)
    } catch (error) {
      console.error("Error completing subsidy:", error)
    } finally {
      setCompleting(null)
    }
  }

  const renderTicket = (ticket, index) => (
    <div key={index} className="border-t pt-2 mt-2">
      <h4 className="font-semibold">Ticket {index + 1}</h4>
      <p className="text-sm">Destino: {ticket.destination}</p>
      <p className="text-sm">Fecha: {new Date(ticket.date).toLocaleDateString()}</p>
      <p className="text-sm">Tipo de pasajero: {ticket.passenger_type}</p>
      <p className="text-sm">Nombre: {ticket.name}</p>
      <p className="text-sm">DNI: {ticket.dni}</p>
      <p className="text-sm">Monto: ${ticket.amount.toFixed(2)}</p>
      <p className="text-sm">Proveedor: {ticket.provider}</p>
    </div>
  )

  const renderSubsidy = (assignment, showCompleteButton) => {
    const subsidy = assignment.TravelSubsidy[0]
    if (!subsidy) return null

    const tickets = [1, 2, 3, 4].map(i => ({
      destination: subsidy[`destination${i}`],
      date: subsidy[`date${i}`],
      passenger_type: subsidy[`passenger_type${i}`],
      name: subsidy[`name${i}`],
      dni: subsidy[`dni${i}`],
      amount: subsidy[`amount${i}`],
      provider: subsidy[`provider${i}`],
    })).filter(ticket => ticket.destination && ticket.date)

    return (
      <Card key={assignment.id} className="w-full mb-4">
        <CardHeader>
          <CardTitle className="text-lg flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <p className="mb-2 sm:mb-0">{assignment.recipient.first_name} {assignment.recipient.last_name}</p> 
            <p className="text-sm sm:text-base">DNI: {assignment.recipient.dni}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4'>
            <p className="text-sm text-gray-600">
              Fecha de inscripción: {new Date(assignment.enrollment_date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              Fecha de vencimiento: {new Date(assignment.expiry_date).toLocaleDateString()}
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {tickets.map((ticket, index) => renderTicket(ticket, index))}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2">
            <span className="text-sm font-medium">
              {subsidy.is_complete ? (
                <span className="text-green-600 flex items-center">
                  <CheckCircle2Icon className="w-4 h-4 mr-1" /> Completado
                </span>
              ) : (
                <span className="text-orange-600 flex items-center">
                  <AlertCircleIcon className="w-4 h-4 mr-1" /> Pendiente
                </span>
              )}
            </span>
            {showCompleteButton && !subsidy.is_complete && (
              <Button
                onClick={() => handleComplete(subsidy.id)}
                disabled={completing === subsidy.id}
                className="w-full sm:w-auto"
              >
                {completing === subsidy.id ? 'Completando...' : 'Marcar como Completado'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Tabs defaultValue="pendientes" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
        <TabsTrigger value="recientes">Recientes</TabsTrigger>
      </TabsList>
      <TabsContent value="pendientes">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Subsidios de Viaje Pendientes</h2>
        {pendingSubsidies.length === 0 ? (
          <p className="text-center text-gray-500">No hay subsidios pendientes</p>
        ) : (
          pendingSubsidies.map(assignment => renderSubsidy(assignment, true))
        )}
      </TabsContent>
      <TabsContent value="recientes">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Subsidios de Viaje Recientes</h2>
        {recentSubsidies.length === 0 ? (
          <p className="text-center text-gray-500">No hay subsidios recientes</p>
        ) : (
          recentSubsidies.map(assignment => renderSubsidy(assignment, false))
        )}
      </TabsContent>
    </Tabs>
  )
}

// 'use client'

// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { CheckCircle2Icon, AlertCircleIcon } from "lucide-react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// export default function TravelSubsidies({ pendingSubsidies, recentSubsidies, onComplete }) {
//   const [completing, setCompleting] = useState(null)

//   const handleComplete = async (id) => {
//     setCompleting(id)
//     try {
//       await onComplete(id)
//     } catch (error) {
//       console.error("Error completing subsidy:", error)
//     } finally {
//       setCompleting(null)
//     }
//   }

//   const renderTicket = (ticket, index) => (
//     <div key={index} className="border-t pt-2 mt-2">
//       <h4 className="font-semibold">Ticket {index + 1}</h4>
//       <p>Destino: {ticket.destination}</p>
//       <p>Fecha: {new Date(ticket.date).toLocaleDateString()}</p>
//       <p>Tipo de pasajero: {ticket.passenger_type}</p>
//       <p>Nombre: {ticket.name}</p>
//       <p>DNI: {ticket.dni}</p>
//       <p>Monto: ${ticket.amount.toFixed(2)}</p>
//       <p>Proveedor: {ticket.provider}</p>
//     </div>
//   )

//   const renderSubsidy = (assignment, showCompleteButton) => {
//     const subsidy = assignment.TravelSubsidy[0]
//     if (!subsidy) return null

//     const tickets = [1, 2, 3, 4].map(i => ({
//       destination: subsidy[`destination${i}`],
//       date: subsidy[`date${i}`],
//       passenger_type: subsidy[`passenger_type${i}`],
//       name: subsidy[`name${i}`],
//       dni: subsidy[`dni${i}`],
//       amount: subsidy[`amount${i}`],
//       provider: subsidy[`provider${i}`],
//     })).filter(ticket => ticket.destination && ticket.date)

//     return (
//       <Card key={assignment.id} className="w-full mb-4">
//         <CardHeader>
//           <CardTitle className="text-lg flex gap-6">
//             <p>{assignment.recipient.first_name} {assignment.recipient.last_name}</p> 
//             <p>DNI: {assignment.recipient.dni}</p>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
          
//           <div className='grid grid-cols-2'>
//             <p className="text-sm text-gray-600 mb-2">
//               Fecha de inscripción: {new Date(assignment.enrollment_date).toLocaleDateString()}
//             </p>
//             <p className="text-sm text-gray-600 mb-4">
//               Fecha de vencimiento: {new Date(assignment.expiry_date).toLocaleDateString()}
//             </p>
//           </div>
//           <div className='grid grid-cols-4'>
//             {tickets.map((ticket, index) => renderTicket(ticket, index))}
//           </div>
//           <div className="flex justify-between items-center mt-4">
//             <span className="text-sm font-medium">
//               {subsidy.is_complete ? (
//                 <span className="text-green-600 flex items-center">
//                   <CheckCircle2Icon className="w-4 h-4 mr-1" /> Completado
//                 </span>
//               ) : (
//                 <span className="text-orange-600 flex items-center">
//                   <AlertCircleIcon className="w-4 h-4 mr-1" /> Pendiente
//                 </span>
//               )}
//             </span>
//             {showCompleteButton && !subsidy.is_complete && (
//               <Button
//                 onClick={() => handleComplete(subsidy.id)}
//                 disabled={completing === subsidy.id}
//               >
//                 {completing === subsidy.id ? 'Completando...' : 'Marcar como Completado'}
//               </Button>
//             )}
//           </div>
          
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Tabs defaultValue="pendientes" className="w-full">
//       <TabsList className="grid w-full grid-cols-2">
//         <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
//         <TabsTrigger value="recientes">Recientes</TabsTrigger>
//       </TabsList>
//       <TabsContent value="pendientes">
//         <h2 className="text-2xl font-bold mb-4">Subsidios de Viaje Pendientes</h2>
//         {pendingSubsidies.length === 0 ? (
//           <p className="text-center text-gray-500">No hay subsidios pendientes</p>
//         ) : (
//           pendingSubsidies.map(assignment => renderSubsidy(assignment, true))
//         )}
//       </TabsContent>
//       <TabsContent value="recientes">
//         <h2 className="text-2xl font-bold mb-4">Subsidios de Viaje Recientes</h2>
//         {recentSubsidies.length === 0 ? (
//           <p className="text-center text-gray-500">No hay subsidios recientes</p>
//         ) : (
//           recentSubsidies.map(assignment => renderSubsidy(assignment, false))
//         )}
//       </TabsContent>
//     </Tabs>
//   )
// }
