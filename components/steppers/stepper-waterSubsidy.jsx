import { FaCircle, FaRegCircle } from "react-icons/fa";

export default function StepperWaterSubsidy({ waterSubsidy }) {
  const steps = [
    { condition: waterSubsidy?.assignment_value === null, label: "Valor No Asignado" },
    { condition: waterSubsidy?.assignment_value !== null, label: "Valor Asignado" },
    { condition: waterSubsidy?.is_complete === true, label: "Completo" },
  ];

  return (
    <div className="flex gap-2 items-center">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          {step.condition ? (
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