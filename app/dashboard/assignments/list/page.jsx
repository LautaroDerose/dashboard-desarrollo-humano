import AdminTable from "@/components/RecipientTable/AdminTable";
import { DataTable } from "./data-table";
import { columns } from './columns'; // Importa columnas correctamente

async function getUsers() {
    const res = await fetch('http://localhost:3000/api/assignment');
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  // console.log("Fetched recipients data:", data);  // Aquí
  return data;
}

export default async function RecipientsPage() {
  const data = await getUsers();
  console.log(data)
  if (!data || !columns) {
    return <div>Error loading data</div>;
  }
  
  // console.log("Data passed to DataTable:", data);  // Aquí

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}