import prisma from "@/lib/prisma";
import RecipientDetailView from "./(client-components)/recipient-detail";
import DetailNavbar from "./(client-components)/detail-navbar";
import ProfileDataSheet from "./(client-components)/profile-dataSheet";
import { getRecipientDetails } from "@/actions/recipient-actions";
import RenderSubsidyCard from "../../assignments/[id]/(cards)/render-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function RecipientDetail({ params }) {
  const id = parseInt(params.id);

  // Obtener los detalles del beneficiario y el último assignment relacionado
  const recipient = await prisma.recipient.findFirst({
    where: { id },
    include: {
      contact_info: {
        include: {
          street: true,
          locality: true,
        },
      },
      recipientSocialConditions: {
        include: { social_condition: true },
      },
      Assignment: {
        include: { benefit: true }
      },
    },
  });

  const assignment = await prisma.assignment.findFirst({
    where: { recipient_id: id },
    include:{
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
          check_doc: true,
        },
      },
    },
    orderBy: {
      id: 'desc', // Ordenar por fecha para obtener el último assignment
    },
    take: 1, // Tomar solo el último assignment
  })

  // Obtener detalles de cantidad y tipo de asignaciones otorgadas
  const details = await getRecipientDetails(id);

  return (
    <div className="mb-4">
      <DetailNavbar recipient={recipient} />
      <div className="flex  justify-center gap-3 mt-3">
        <ProfileDataSheet recipient={recipient} />
        {/* Pasar los detalles directamente */}
        <div  className="flex flex-col gap-3 ">
          <div >
          <Card className="mb-2">
            <CardHeader>
              <CardTitle>
                Ultimo subsidio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RenderSubsidyCard assignment={assignment} />
            </CardContent>
          </Card>
          </div>
          <RecipientDetailView details={details} />
        </div>
      </div>
    </div>
  );
}
