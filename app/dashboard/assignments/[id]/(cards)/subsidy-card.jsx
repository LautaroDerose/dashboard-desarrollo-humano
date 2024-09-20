'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

export default function SubsidyCard({ assignment }) {
  const { subsidy_stage } = assignment;

  // Verifica que `subsidy_stage` no sea nulo o indefinido
  if (!subsidy_stage) {
    return <p>No hay - sobre el subsidio.</p>;
  }

  const formatDocumentDate = (date) => date ? format(new Date(date), "dd/MM/yyyy") : "-";

  return (
    <div>
      <Card className="w-[800px] flex flex-col mx-auto justify-center">
        <CardHeader>
          <CardTitle className="flex justify-around">
            Detalle del subsidio
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <div className="flex">
                <h2 className="mr-4 text-slate-400">Documento Nota</h2>
                <p>{subsidy_stage.note_doc?.doc_number || "-"}</p>
              </div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400"> Fecha de emision </h2>
                <p>{formatDocumentDate(subsidy_stage.note_doc?.doc_created_at)}</p>
              </div>
              <div className="flex">
                {
                  subsidy_stage.note_doc?.is_congirm 
                  ? <div>
                      <h2 className="mr-4 text-slate-400"> Fecha de Recepcion </h2>
                      <p>{formatDocumentDate(subsidy_stage.note_doc?.confirmed_at)}</p>
                    </div>
                  : ""
                }
              </div>
              <Separator />
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <h2 className="mr-4 text-slate-400">Documento Decreto</h2>
                <p>{subsidy_stage.decree_doc?.doc_number || "-"}</p>
              </div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400"> Fecha de emision </h2>
                <p>{formatDocumentDate(subsidy_stage.decree_doc?.doc_created_at)}</p>
              </div>
              <div className="flex">
                {
                  subsidy_stage.decree_doc?.is_congirm 
                  ? <div>
                      <h2 className="mr-4 text-slate-400"> Fecha de Recepcion </h2>
                      <p>{formatDocumentDate(subsidy_stage.decree_doc?.confirmed_at)}</p>
                    </div>
                  : ""
                }
              </div>
            <Separator />
            </div>
            <div>
              <div className="flex flex-col">
                <div className="flex">
                  <h2 className="mr-4 text-slate-400">Documento Gasto</h2>
                  <p>{subsidy_stage.expense_doc?.doc_number || "-"}</p>
                </div>
                <div className="flex">
                  <h2 className="mr-4 text-slate-400"> Fecha de emision </h2>
                  <p>{formatDocumentDate(subsidy_stage.expense_doc?.doc_created_at)}</p>
                </div>
              </div>
              <div className="flex">
                {
                  subsidy_stage.expense_doc?.is_congirm 
                  ? <div>
                      <h2 className="mr-4 text-slate-400"> Fecha de Recepcion </h2>
                      <p>{formatDocumentDate(subsidy_stage.expense_doc?.confirmed_at)}</p>
                    </div>
                  : ""
                }
              </div>
              <Separator />
            </div>
            <div>
              <div className="flex flex-col">
                <div className="flex">
                  <h2 className="mr-4 text-slate-400">Documento Pago</h2>
                  <p>{subsidy_stage.payment_doc?.doc_number || "-"}</p>
                </div>
                <div className="flex">
                  <h2 className="mr-4 text-slate-400"> Fecha de emision </h2>
                  <p>{formatDocumentDate(subsidy_stage.payment_doc?.doc_created_at)}</p>
                </div>
              </div>
              <div className="flex">
                {
                  subsidy_stage.payment_doc?.is_congirm 
                  ? <div>
                      <h2 className="mr-4 text-slate-400"> Fecha de Recepcion </h2>
                      <p>{formatDocumentDate(subsidy_stage.payment_doc?.confirmed_at)}</p>
                    </div>
                  : ""
                }
              </div>
              <Separator />
            </div>
            <div>
              <div className="flex flex-col">
                <div className="flex">
                  <h2 className="mr-4 text-slate-400">Documento Cheque</h2>
                  <p>{subsidy_stage.check_doc?.doc_number || "-"}</p>
                </div>
                <div className="flex">
                  <h2 className="mr-4 text-slate-400"> Fecha de emision </h2>
                  <p>{formatDocumentDate(subsidy_stage.check_doc?.doc_created_at)}</p>
                </div>
              </div>
              <div className="flex">
                {
                  subsidy_stage.check_doc?.is_congirm 
                  ? <div>
                      <h2 className="mr-4 text-slate-400"> Fecha de Recepcion </h2>
                      <p>{formatDocumentDate(subsidy_stage.check_doc?.confirmed_at)}</p>
                    </div>
                  : ""
                }
              </div>
              <Separator />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
// 'use client';

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// export default function SubsidyCard({ assignment }) {
//   const { subsidy_stage } = assignment;

//   // Verifica que `subsidy_stage` no sea nulo o indefinido
//   if (!subsidy_stage) {
//     return <p>No hay - sobre el subsidio.</p>;
//   }

//   return (
//     <div>
//       <Card className="w-[800px] flex flex-col mx-auto justify-center">
//         <CardHeader>
//           <CardTitle className="flex justify-around">
//             Detalle del subsidio
//           </CardTitle>
//           <Separator />
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-2 gap-3">            
//             <div>
//               <div className="flex">
//                 <h2 className="mr-4 text-slate-400">Documento Nota</h2>
//                 <p>{subsidy_stage.note_doc_id? subsidy_stage.note_doc_id.doc_number : "-"}</p>
//                 <p>{new Date( subsidy_stage.note_doc_id.doc_created_at).toLocaleDateString("es-ES", {
//                   day: "2-digit",
//                   month: "2-digit",
//                   year: "numeric",
//                 })}</p>            
//               </div>
//               <Separator />
//             </div>
//             <div>
//               <div className="flex">
//                 <h2 className="mr-4 text-slate-400">Documento Decreto</h2>
//                 <p>{subsidy_stage.decree_doc_id? subsidy_stage.decree_doc_id.doc_number : "-"}</p>
//                 <p>{new Date( subsidy_stage.decree_doc_id.doc_created_at).toLocaleDateString("es-ES", {
//                   day: "2-digit",
//                   month: "2-digit",
//                   year: "numeric",
//                 })}</p>            
//               </div>
//               <Separator />
//             </div>
//             <div>
//               <div className="flex">
//                 <h2 className="mr-4 text-slate-400">Documento Gasto</h2>
//                 <p>{subsidy_stage.expense_doc_id? subsidy_stage.expense_doc_id.doc_number : "-"}</p>
//                 <p>{new Date( subsidy_stage.expense_doc_id.doc_created_at).toLocaleDateString("es-ES", {
//                   day: "2-digit",
//                   month: "2-digit",
//                   year: "numeric",
//                 })}</p>            
//               </div>
//               <Separator />
//             </div>
//             <div>
//               <div className="flex">
//                 <h2 className="mr-4 text-slate-400">Documento Pago</h2>
//                 <p>{subsidy_stage.payment_doc_id? subsidy_stage.payment_doc_id.doc_number : "-"}</p>
//                 <p>{new Date( subsidy_stage.payment_doc_id.doc_created_at).toLocaleDateString("es-ES", {
//                   day: "2-digit",
//                   month: "2-digit",
//                   year: "numeric",
//                 })}</p>
//               </div>
//               <Separator />
//             </div>
//             <div>
//               <div className="flex">
//                 <h2 className="mr-4 text-slate-400">Documento Cheque</h2>
//                 <p>{subsidy_stage.check_doc_id? subsidy_stage.check_doc_id.doc_number : "-"}</p>
//                 <p>{new Date( subsidy_stage.check_doc_id.doc_created_at).toLocaleDateString("es-ES", {
//                   day: "2-digit",
//                   month: "2-digit",
//                   year: "numeric",
//                 })}</p>
//               </div>
//               <Separator />
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// 'use client';

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// export default function SubsidyCard({ assignment }) {
//   const { subsidy_stage } = assignment;

//   // Verifica que `subsidy_stage` no sea nulo o indefinido
//   if (!subsidy_stage) {
//     return <p>No hay - sobre el subsidio de agua.</p>;
//   }

//   return (
//     <div>
//       <Card className="w-[800px] flex flex-col mx-auto justify-center">
//         <CardHeader>
//           <CardTitle className="flex justify-around">
//           Detalle del subsidio
//           </CardTitle>
//           <Separator />
//         </CardHeader>
//         <CardContent>
//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <div className="flex">
//               <h2 className="mr-4 text-slate-400">Número de Suministro</h2>
//               <p>{subsidy_stage.supply_number}</p>
//             </div>
//             <Separator />
//           </div>
//           <div>
//             <div className="flex">
//               <h2 className="mr-4 text-slate-400">Valor de Suministro</h2>
//               <p>{subsidy_stage.supply_value}</p>
//             </div>
//             <Separator />
//           </div>
//           <div>
//             <div className="flex">
//               <h2 className="mr-4 text-slate-400">1er Vencimiento</h2>
//               <p>{new Date(subsidy_stage.first_expiry).toLocaleDateString("es-ES", {
//                 day: "2-digit",
//                 month: "2-digit",
//                 year: "numeric",
//               })}</p>
//             </div>
//             <Separator />
//           </div>
//           <div>
//             <div className="flex">
//               <h2 className="mr-4 text-slate-400">2do Vencimiento</h2>
//               <p>{new Date(subsidy_stage.second_expiry).toLocaleDateString("es-ES", {
//                 day: "2-digit",
//                 month: "2-digit",
//                 year: "numeric",
//               })}</p>
//             </div>
//             <Separator />
//           </div>
//         </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }