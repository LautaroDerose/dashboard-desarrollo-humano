'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2Icon, XCircleIcon, AlertCircleIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormattedDate from '@/components/formatted-data'

export default function GarrafaAssignments({ proximosVencimientos, entregasRecientes, onConfirm }) {
  const [confirming, setConfirming] = useState(null)

  const handleConfirm = async (id) => {
    setConfirming(id)
    try {
      await onConfirm(id)
    } catch (error) {
      console.error("Error confirming assignment:", error)
    } finally {
      setConfirming(null)
    }
  }

  const renderAssignment = (assignment, showConfirmButton) => (
    <Card key={assignment.id} className="w-full mb-4">
      <CardHeader>
        <CardTitle className="text-lg">
        {/* {assignment.recipient.first_name} {" "} {assignment.recipient.last_name} */}
        <div className='grid grid-cols-2'>
        <p >Nombre: {assignment.recipient.first_name} {" "} {assignment.recipient.last_name} </p>
          <p >DNI: {assignment.recipient.dni}</p>
        </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2'>
          {/* <p className="text-sm text-gray-600 mb-2">Nombre: {assignment.recipient.first_name} {" "} {assignment.recipient.last_name} </p>
          <p className="text-sm text-gray-600 mb-2">DNI: {assignment.recipient.dni}</p> */}
          <p className="text-sm text-gray-600 mb-2">
            Fecha de inscripción: {new Date(assignment.enrollment_date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Fecha de vencimiento: {new Date(assignment.expiry_date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            {assignment.GarrafaSubsidy.is_confirm ? (
              <div className="text-green-600 flex gap-4 " >
                <span className="text-green-600 flex items-center">
                  <CheckCircle2Icon className="w-4 h-4 mr-1" /> Entregado en la fecha:
                </span>
                  <FormattedDate date={assignment.GarrafaSubsidy.confirmed_at} />
                {/* <span></span> */}
              </div>
            ) : (
              <span className="text-orange-600 flex items-center">
                <AlertCircleIcon className="w-4 h-4 mr-1" /> Pendiente
              </span>
            )}
          </span>
          {showConfirmButton && !assignment.GarrafaSubsidy.is_confirm && (
            <Button
              onClick={() => handleConfirm(assignment.id)}
              disabled={confirming === assignment.id}
            >
              {confirming === assignment.id ? 'Confirmando...' : 'Confirmar Entrega'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Tabs defaultValue="pendientes" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
        <TabsTrigger value="recientes">Recientes</TabsTrigger>
      </TabsList>
      <TabsContent value="pendientes">
        <h2 className="text-2xl font-bold mb-4">Entregas Pendientes</h2>
        {proximosVencimientos.length === 0 ? (
          <p className="text-center text-gray-500">No hay entregas pendientes</p>
        ) : (
          proximosVencimientos.map(assignment => renderAssignment(assignment, true))
        )}
      </TabsContent>
      <TabsContent value="recientes">
        <h2 className="text-2xl font-bold mb-4">Entregas Recientes</h2>
        {entregasRecientes.length === 0 ? (
          <p className="text-center text-gray-500">No hay entregas recientes</p>
        ) : (
          entregasRecientes.map(assignment => renderAssignment(assignment, false))
        )}
      </TabsContent>
    </Tabs>
  )
}

// 'use client'

// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { CheckCircle2Icon, XCircleIcon } from "lucide-react"


// export default function GarrafaAssignments({ assignments, onConfirm }) {
//   const [confirming, setConfirming] = useState(null)

//   const handleConfirm = async (id) => {
//     setConfirming(id)
//     try {
//       await onConfirm(id)
//     } catch (error) {
//       console.error("Error confirming assignment:", error)
//     } finally {
//       setConfirming(null)
//     }
//   }

//   return (
//     <div className="space-y-4 p-4">
//       <h2 className="text-2xl font-bold mb-4">Pending Garrafa Assignments</h2>
//       {assignments.length === 0 ? (
//         <p className="text-center text-gray-500">No pending assignments</p>
//       ) : (
//         assignments.map((assignment) => (
//           <Card key={assignment.id} className="w-full">
//             <CardHeader>
//               <CardTitle className="text-lg">
//                 {assignment.recipient.name}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-gray-600 mb-2">Nombre: {assignment.recipient.first_name} {" "} {assignment.recipient.last_name}</p>
//               <p className="text-sm text-gray-600 mb-2">DNI: {assignment.recipient.dni}</p>
//               <p className="text-sm text-gray-600 mb-4">
//                 Date: {new Date(assignment.enrollment_date).toLocaleDateString()}
//               </p>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm font-medium">
//                   {assignment.GarrafaSubsidy.is_confirm ? (
//                     <span className="text-green-600 flex items-center">
//                       <CheckCircle2Icon className="w-4 h-4 mr-1" /> Confirmed
//                     </span>
//                   ) : (
//                     <span className="text-orange-600 flex items-center">
//                       <XCircleIcon className="w-4 h-4 mr-1" /> Pending
//                     </span>
//                   )}
//                 </span>
//                 {!assignment.GarrafaSubsidy.is_confirm && (
//                   <Button
//                     onClick={() => handleConfirm(assignment.id)}
//                     disabled={confirming === assignment.id}
//                   >
//                     {confirming === assignment.id ? 'Confirming...' : 'Confirm Delivery'}
//                   </Button>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))
//       )}
//     </div>
//   )
// }