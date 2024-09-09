import { TooltipProvider } from "@/components/ui/tooltip";
import DetailView from "./DetailView";
import prisma from "@/lib/prisma";

export default async function RecipientDetail({ params }) {

  const id = params.id;
  // const recipient = await fetchRecipientById(id);
  const recipient = await prisma.recipient.findFirst({
    where: { id: parseInt(id)},
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
        include: { benefit: true },
      },
    },
  });
  // const dataSelect = await getUsers()

  return (
    <div className="h-[86vh]">
      <DetailView recipient={recipient} />
    </div>
  );
}

    // <div className="h-[86vh]">
    //   {/* <TooltipProvider> */}
    //     {/* <div>{recipientId}</div> */}
    //     <DetailView recipient={recipient} />
    //     {/* <DetailView recipient={recipient} dataSelect={dataSelect} /> */}
    //   {/* </TooltipProvider> */}
    // </div>