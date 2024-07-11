import { DetailView } from "@/components/containers/detail-view";
import { TooltipProvider } from "@/components/ui/tooltip";
import DetailView2 from "./DetailView2";

async function fetchRecipientById(id) {
  const res = await fetch(`http://localhost:3000/api/recipient/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch recipient data');
  }
  const data = await res.json();
  return data;
}

export default async function RecipientDetail({ params }) {
  const recipientId = params.id;
  // const recipient = await fetchRecipientById(recipientId);
  const recipient = await fetchRecipientById(recipientId);

  return (
    <div className="h-[86vh]">
      <TooltipProvider>
        {/* <div>{recipientId}</div> */}
        {/* <DetailView recipientId={2} /> */}
        <DetailView2 recipient={recipient} />
      </TooltipProvider>
    </div>
  );
}
