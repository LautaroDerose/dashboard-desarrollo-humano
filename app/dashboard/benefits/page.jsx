import AdminTable from "@/components/RecipientTable/AdminTable";
import { DataTable } from "./data-table";
import { columns } from './columns'; // Importa columnas correctamente

async function getBenefits() {
  const res = await fetch('http://localhost:3000/api/benefit');
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}

export default async function RecipientsPage() {
  const data = await getBenefits();
  
  if (!data || !columns) {
    return <div>Error loading data</div>;
  }
  
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}