import { FaCircle, FaRegCircle } from "react-icons/fa";

export default function StepperHospital({ credential }) {
  const steps = [
    { isComplete: !!credential?.ts_name, label: "Trabajadora Social" },
    {
      isComplete: !!credential?.visit_date && !!credential?.visiting_shift,
      label: "Visita",
    },
    { isComplete: credential?.report_soc_eco_issued === true, label: "Informe Emitido" },
    { isComplete: credential?.report_soc_eco_received === true, label: "Informe Recibido" },
    { isComplete: !!credential?.credential_number, label: "Credencial" },
  ];

  return (
    <div className="flex gap-2 items-center">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          {step.isComplete ? (
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