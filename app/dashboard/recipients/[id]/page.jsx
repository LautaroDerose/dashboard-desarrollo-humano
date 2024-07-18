import { TooltipProvider } from "@/components/ui/tooltip";
import DetailView from "./DetailView";

async function fetchRecipientById(id) {
  const res = await fetch(`http://localhost:3000/api/recipient/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch recipient data');
  }
  const data = await res.json();
  return data;
}
async function getUsers() {
  const res = await fetch('http://localhost:3000/api/recipient');
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const dataSelect = await res.json();
  // console.log("Fetched recipients data:", data);  // Aquí
  return dataSelect;
}

export default async function RecipientDetail({ params }) {
  const recipientId = params.id;
  // const recipient = await fetchRecipientById(recipientId);
  const recipient = await fetchRecipientById(recipientId);
  const dataSelect = await getUsers()

  return (
    <div className="h-[86vh]">
      <TooltipProvider>
        {/* <div>{recipientId}</div> */}
        <DetailView recipient={recipient} dataSelect={dataSelect} />
      </TooltipProvider>
    </div>
  );
}
