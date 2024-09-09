import { FaCircle, FaRegCircle } from "react-icons/fa";

export default function StepperRecipient({ subsidyStage }) {
  const steps = [
    { doc: subsidyStage?.note_doc, label: "Nota" },
    { doc: subsidyStage?.decree_doc, label: "Decreto" },
    { doc: subsidyStage?.expense_doc, label: "Gasto " },
    { doc: subsidyStage?.payment_doc, label: "Pago" },
    { doc: subsidyStage?.check_doc, label: "Cheque" },
  ];

  return (
    <div className="flex gap-2 items-center">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          {step.doc && step.doc.is_confirm ? (
            <FaCircle className="text-green-400" />
          ) : (
            <FaRegCircle className="text-gray-400" />
          )}
          <span className="text-xs">{step.label}</span>
        </div>
      ))}
    </div>
  );
}