import { FaCircle, FaRegCircle } from "react-icons/fa";

export default function StepperAtmospheric({ atmosphericOrder }) {
  const steps = [
    // { isComplete: !!atmosphericOrder?.desired_service_date, label: "Fecha Deseada" },
    { isComplete: atmosphericOrder?.payment_confirmed === true, label: "Pago Confirmado" },
    // { isComplete: !!atmosphericOrder?.payment_date, label: "Fecha de Pago" },
    { isComplete: atmosphericOrder?.task_confirmed === true, label: "Tarea Realizada" },
    // { isComplete: !!atmosphericOrder?.task_date, label: "Fecha de Tarea" },
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