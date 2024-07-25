import { TooltipProvider } from "@/components/ui/tooltip";
import DetailView from "./DetailView";

// async function fetchRecipientById(id) {
//   const res = await fetch(`http://localhost:3000/api/recipient/${id}`);
//   if (!res.ok) {
//     throw new Error('Failed to fetch recipient data');
//   }
//   const data = await res.json();
//   return data;
// }
// async function getUsers() {
//   const res = await fetch('http://localhost:3000/api/recipient');
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   const dataSelect = await res.json();
//   // console.log("Fetched recipients data:", data);  // Aquí
//   return dataSelect;
// }

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
      <TooltipProvider>
        {/* <div>{recipientId}</div> */}
        <DetailView recipient={recipient} />
        {/* <DetailView recipient={recipient} dataSelect={dataSelect} /> */}
      </TooltipProvider>
    </div>
  );
}
