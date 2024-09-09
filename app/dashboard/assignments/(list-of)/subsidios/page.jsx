import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import StepperSubsidy from "../../../../../components/stepper-subsidyStage";

export default async function SubsidiosPage() {

  try {
    const [assignments, benefits, recipients ] = await Promise.all([
      prisma.assignment.findMany({ 
        where: {
          benefit: {
            category_id: 1,
          },
          OR: [
            { withdrawal_date: null },
            { withdrawal_date: undefined },
          ],
          expiry_date: {
            gte: new Date(),
          },
          status: {
            notIn: ["Concretado", "En Revision", "Rechazado"],
          },
        },
        orderBy: {
          expiry_date: 'asc'
        },
        include: { 
          recipient: true,
          benefit: true,
          subsidy_stage: {
            include: {
              note_doc: true,
              decree_doc: true,
              expense_doc: true,
              payment_doc: true,
              check_doc: true,
            },
          },
        },
      }),
      prisma.benefit.findMany(),
      prisma.recipient.findMany(),
    ]);

    const result = {
      assignments, benefits, recipients
    };

    if (!result ) {
      return <div>Error loading data</div>;
    }

    return (
      <div className="my-4">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row py-2 items-center">
            <div className="grid gap-2">
              <CardTitle className="mt-2">Estado de subsidios</CardTitle>
            </div>
            {/* <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/subsecretaria/list">
                Ver mas
                <MdArrowOutward className="h-4 w-4" />
              </Link>
            </Button> */}
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tipo de Beneficios</TableHead>
                  <TableHead>Persona</TableHead>
                  <TableHead>Registro</TableHead>
                  <TableHead>Documentos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium">{item.id}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{item.benefit.name}</div>
                    </TableCell>
                    <TableCell>
                      {`${item.recipient.first_name} ${item.recipient.last_name}`} 
                    </TableCell>
                    <TableCell>
                      {new Date(item.enrollment_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {item.subsidy_stage ? (
                        <StepperSubsidy subsidyStage={item.subsidy_stage} />
                      ) : (
                        <p className="text-gray-500">Sin documentos</p>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("Error in RecipientsListPage:", error);
    return <div>Error loading data: {error.message}</div>;
  }
}

// import prisma from "@/lib/prisma";
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import Link from "next/link"
// // import { useEffect, useState } from "react"
// import { MdArrowOutward } from "react-icons/md"


// export default async function SubsidiosPage() {

//   try {
//     const [assignments, benefits, recipients ] = await Promise.all([
//       prisma.assignment.findMany({ 
//         where: {
//           benefit: {
//             category_id: 1,
//           },
//           OR: [
//             { withdrawal_date: null },
//             { withdrawal_date: undefined },
//           ],
//           expiry_date: {
//             gte: new Date(), // gte significa 'greater than or equal', es decir, hoy o en el futuro
//           },
//           status: {
//             notIn: ["Concretado", "En Revision", "Rechazado"],
//           },
//         },
//         orderBy: {
//           expiry_date: 'asc' // Ordenar de vencimientos más cercanos a más lejanos
//         },
//         include: { 
//           benefit: true,
//           recipient: true,
//           subsidy_stage: {
//             include: {
//               note_doc: true,
//               decree_doc: true,
//               expense_doc: true,
//               payment_doc: true,
//               check_doc: true,
//             },
//           },
//         },
//       }),
//       prisma.benefit.findMany(),
//       prisma.recipient.findMany(),
//     ]);

//     const result = {
//       assignments, benefits, recipients
//     }

//     if (!result ) {
//     // if (!result || !columns) {
//       return <div>Error loading data</div>;
//     }

//     return(
//       <div>
//         Subsidios
//         <Card className="xl:col-span-2">
//       <CardHeader className="flex flex-row py-2 items-center">
//         <div className="grid gap-2">
//           <CardTitle>Asignaciones recientes</CardTitle>
//         </div>
//         <Button asChild size="sm" className="ml-auto gap-1">
//           <Link href="/subsecretaria/list">
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
//               <TableHead>Registro</TableHead>
//               <TableHead>Suministro físico</TableHead>
//               {/* <TableHead>Monto</TableHead>
//               <TableHead>Cantidad</TableHead> */}
//               {/* <TableHead>Acciones</TableHead> */}
//             </TableRow>
//           </TableHeader>
//           {/* {isLoading ? (
//             <TableBody>
//               <TableRow>
//                 <TableCell colSpan={7}>Cargando...</TableCell>
//               </TableRow>
//             </TableBody>
//           ) : ( */}
//             <TableBody>
//               {assignments.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell>
//                     <div className="font-medium">{item.benefit.name}</div>
//                   </TableCell>
//                   <TableCell>
//                     {`${item.recipient.first_name} ${item.recipient.last_name}`} 
//                   </TableCell>
//                   <TableCell>
//                     {new Date(item.enrollment_date).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell className="">
//                     {item.subsidy_stage && item.subsidy_stage.note_doc ? (
//                       <button
//                         // onClick={() => handleToggleConfirmation(item.id, item.subsidy_stage.note_doc.is_confirm)}
//                         className={item.subsidy_stage.note_doc.is_confirm ? "text-green-400 font-bold p-2 rounded" : "text-red-400 font-bold p-2 rounded"}
//                       >
//                         {item.subsidy_stage.note_doc.is_confirm ? "Disponible" : "En espera"}
//                       </button>
//                     ) : (
//                       <p className="text-gray-500">No disponible</p> // O cualquier mensaje que desees mostrar si los datos no están presentes
//                     )}
//                   </TableCell>
//                   {/* <TableCell>
//                     {item.amount}
//                   </TableCell>
//                   <TableCell>
//                     {item.quantity}
//                   </TableCell> */}
//                   {/* <TableCell>
//                     <Link href={`/subsecretaria/${item.id}`}>
//                       <Button>Ver en detalle</Button>
//                     </Link>
//                   </TableCell> */}
//                 </TableRow>
//               ))}
//             </TableBody>
//           {/* )} */}
//         </Table>
//       </CardContent>
//     </Card>
//         <pre>
//         {
//           JSON.stringify(assignments, null, 2)
//         }
//       </pre>
//       </div>
//     )
//   } catch (error) {
//     console.error("Error in RecipientsListPage:", error);
//     return <div>Error loading data: {error.message}</div>;
//   }
// }