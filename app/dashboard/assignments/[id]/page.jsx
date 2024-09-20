
import prisma from "@/lib/prisma";
import AssignDetail from "./assignment-detail";
import RenderSubsidyCard from "./(cards)/render-card";



export default async function AssignmentDetail({ params }) {
  const id = params.id;
  const assignment = await prisma.assignment.findUnique({
    where: { id: parseInt(id) },
    include: {
      benefit: true,
      recipient: true,
      WaterSubsidy: true,
      GarrafaSubsidy: true,
      TravelSubsidy: true,
      AtmosphericOrder: true,
      HospitalCredential: true,
      subsidy_stage: {
        include: {
          note_doc: true,
          decree_doc: true,
          expense_doc: true,
          payment_doc: true,
          check_doc: true
        }
      }
    }
  });
  
  const getStatusClass = (status) => {
    switch (status) {
      case "En Proceso":
        return "text-yellow-500";
      case "Pendiente":
        return "text-red-500";
      case "Concretado":
        return "text-green-500";
      default:
        return "";
    }
  };

  return (
    <div className="h-[86vh] mt-4 flex flex-col gap-4">
      <AssignDetail assignment={assignment} />
      <RenderSubsidyCard assignment={assignment} />
    </div>
  );
}
