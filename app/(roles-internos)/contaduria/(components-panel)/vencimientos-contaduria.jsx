'use client'

import { confirmDoc } from "@/actions/doc-actions/doc-subse-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useState } from "react"
import { BsArrowRepeat } from "react-icons/bs"
import { MdArrowOutward } from "react-icons/md"

export default function TablaSubseVencimientos({ proximosVencimientos }) {
  const [vencimientos, setVencimientos] = useState(proximosVencimientos || [])

  const handleToggleConfirmation = async (id, currentStatus) => {
    try {
      // Actualiza optimistamente el estado local
      setVencimientos((prevVencimientos) =>
        prevVencimientos.map((item) =>
          item.id === id
            ? { ...item, subsidy_stage: { ...item.subsidy_stage, decree_doc: { is_confirm: !currentStatus } } }
            : item
        )
      );

      // Llama al servidor para confirmar la actualización
      await confirmDoc(id, currentStatus);
    } catch (error) {
      console.error("Error al actualizar la confirmación del documento:", error);
      // Maneja la reversión en caso de error, si es necesario
    }
  };


  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row py-2 items-center">
        <div className="grid gap-2">
          <CardTitle>Asignaciones recientes</CardTitle>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/contaduria/list">
            Ver más
            <MdArrowOutward className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo de Beneficios</TableHead>
              <TableHead>Persona</TableHead>
              <TableHead>Suministro físico</TableHead>
              <TableHead>Registro</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {vencimientos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>No hay datos disponibles</TableCell>
              </TableRow>
          ) : (
              vencimientos.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item.benefit.name}</div>
                  </TableCell>
                  <TableCell>
                    {`${item.recipient.first_name} ${item.recipient.last_name}`}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <BsArrowRepeat />
                      {item.subsidy_stage && item.subsidy_stage.decree_doc ? (
                        <button
                          onClick={() => handleToggleConfirmation(item.id, item.subsidy_stage.decree_doc.is_confirm)}
                          className={item.subsidy_stage.decree_doc.is_confirm ? "text-green-400 font-bold p-2 rounded" : "text-red-400 font-bold p-2 rounded"}
                        >
                          {item.subsidy_stage.decree_doc.is_confirm ? "Disponible" : "En espera"}
                        </button>
                      ) : (
                        <p className="text-gray-500">No disponible</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(item.enrollment_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {item.amount}
                  </TableCell>
                  <TableCell>
                    {item.quantity}
                  </TableCell>
                  <TableCell>
                    <Link href={`/contaduria/${item.id}`}>
                      <Button>Ver en detalle</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// 'use client'

// import { getInfoCards } from "@/actions/roles-actions/conta-actions"
// import { confirmDoc } from "@/actions/doc-actions/doc-subse-actions"
// // import { getInfoCards } from "@/actions/subse-actions"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import Link from "next/link"
// import { useEffect, useState } from "react"
// import { MdArrowOutward } from "react-icons/md"

// export default function TablaSubseVencimientos({proximosVencimientos}) {
//   const [vencimientos, setVencimientos] = useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   // useEffect(() => {
//   //   async function fetchData(){
//   //     try {
//   //       const data = await getInfoCards()
//   //       setVencimientos(data.proximosVencimientos)
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error)
//   //     } finally {
//   //       setIsLoading(false)
//   //     }
//   //   }
//   //   fetchData()
//   // }, [])

//   const handleToggleConfirmation = async (id, currentStatus) => {
//     try {
//       await confirmDoc(id, currentStatus)
//       setVencimientos((prevVencimientos) =>
//         prevVencimientos.map((item) =>
//           item.id === id ? { ...item, subsidy_stage: { ...item.subsidy_stage, note_doc: { is_confirm: !currentStatus } } } : item
//         )
//       )
//     } catch (error) {
//       console.error("Error updating document confirmation:", error)
//     }
//   }

//   return(
//     <Card className="xl:col-span-2">
//       <CardHeader className="flex flex-row py-2 items-center">
//         <div className="grid gap-2">
//           <CardTitle>Asignaciones recientes</CardTitle>
//         </div>
//         <Button asChild size="sm" className="ml-auto gap-1">
//           <Link href="/contaduria/list">
//             Ver mas
//             <MdArrowOutward className="h-4 w-4" />
//           </Link>
//         </Button>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Tipo de Beneficios</TableHead>
//               <TableHead>Persona</TableHead>
//               <TableHead>Suministro físico</TableHead>
//               <TableHead>Registro</TableHead>
//               <TableHead>Monto</TableHead>
//               <TableHead>Cantidad</TableHead>
//               <TableHead>Acciones</TableHead>
//             </TableRow>
//           </TableHeader>
//           {isLoading ? (
//             <TableBody>
//               <TableRow>
//                 <TableCell colSpan={7}>Cargando...</TableCell>
//               </TableRow>
//             </TableBody>
//           ) : (
//             <TableBody>
//               {proximosVencimientos.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell>
//                     <div className="font-medium">{item.benefit.name}</div>
//                   </TableCell>
//                   <TableCell>
//                     {`${item.recipient.first_name} ${item.recipient.last_name}`} 
//                   </TableCell>
//                   <TableCell className="">
//                     {item.subsidy_stage && item.subsidy_stage.decree_doc ? (
//                       <button
//                         onClick={() => handleToggleConfirmation(item.id, item.subsidy_stage.decree_doc.is_confirm)}
//                         className={item.subsidy_stage.decree_doc.is_confirm ? "text-green-400 font-bold p-2 rounded" : "text-red-400 font-bold p-2 rounded"}
//                       >
//                         {item.subsidy_stage.decree_doc.is_confirm ? "Disponible" : "En espera"}
//                       </button>
//                     ) : (
//                       <p className="text-gray-500">No disponible</p> // O cualquier mensaje que desees mostrar si los datos no están presentes
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     {new Date(item.enrollment_date).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>
//                     {item.amount}
//                   </TableCell>
//                   <TableCell>
//                     {item.quantity}
//                   </TableCell>
//                   <TableCell>
//                     <Link href={`/contaduria/${item.id}`}>
//                       <Button>Ver en detalle</Button>
//                     </Link>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           )}
//         </Table>
//       </CardContent>
//     </Card>
//   )
// }
