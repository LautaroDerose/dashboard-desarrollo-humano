import { FaCircle, FaRegCircle } from "react-icons/fa";

export default function StepperSubsidy({ subsidyStage }) {
  // Asegúrate de que subsidyStage es válido
  if (!subsidyStage) {
    return <div>No hay datos de subsidio.</div>;
  }

  // Lista de documentos del subsidio
  const steps = [
    { doc: subsidyStage.note_doc, label: "Nota" },
    { doc: subsidyStage.decree_doc, label: "Decreto" },
    { doc: subsidyStage.expense_doc, label: "Gasto" },
    { doc: subsidyStage.payment_doc, label: "Pago" },
    { doc: subsidyStage.check_doc, label: "Cheque" },
  ];

  return (
    <div className="flex gap-2 items-center">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          {/* Verifica si el documento existe y si tiene el campo is_confirm */}
          {step.doc ? (
            step.doc.is_confirm ? (
              <FaCircle className="text-green-400" />
            ) : (
              <FaCircle className="text-gray-400" />
            )
          ) : (
            <FaRegCircle className="text-gray-400" /> // Si el documento es null
          )}
          <span className="text-xs">{step.label}</span>
        </div>
      ))}
    </div>
  );
}

// import { FaCircle, FaRegCircle } from "react-icons/fa";

// export default function StepperSubsidy({ subsidyStage }) {
//   const steps = [
//     { doc: subsidyStage?.note_doc, label: "Nota" },
//     { doc: subsidyStage?.decree_doc, label: "Decreto" },
//     { doc: subsidyStage?.expense_doc, label: "Gasto " },
//     { doc: subsidyStage?.payment_doc, label: "Pago" },
//     { doc: subsidyStage?.check_doc, label: "Cheque" },
//   ];

//   return (
//     <div className="flex gap-2 items-center">
//       {steps.map((step, index) => (
//         <div key={index} className="flex flex-col items-center">
//           {step.doc && step.doc.is_confirm ? (
//             <FaCircle className="text-green-400" />
//           ) : (
//             <FaRegCircle className="text-gray-400" />
//           )}
//           <span className="text-xs">{step.label}</span>
//         </div>
//       ))}
//     </div>
//   );
// }