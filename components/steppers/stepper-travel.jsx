import { FaCircle, FaRegCircle } from "react-icons/fa";

export default function StepperTravelSubsidy({ travelSubsidy }) {
  const steps = [
    // { isComplete: !!travelSubsidy?.destination1, label: "Tique 1" },
    // { isComplete: !!travelSubsidy?.destination2, label: "Tique 2" },
    // { isComplete: !!travelSubsidy?.destination3, label: "Tique 3" },
    // { isComplete: !!travelSubsidy?.destination4, label: "Tique 4" },
    { isComplete: travelSubsidy?.is_complete === true, label: "Subsidio Completo" },
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