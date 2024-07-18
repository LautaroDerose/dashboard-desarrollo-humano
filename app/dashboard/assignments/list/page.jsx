import AdminTable from "@/components/RecipientTable/AdminTable";
import { DataTable } from "./(table)/data-table";
import { columns } from './(table)/columns'; // Importa columnas correctamente
import prisma from "@/lib/prisma";
import { getAllAssignments } from "@/actions/assignment-actions";

// async function getUsers() {
//     const res = await fetch('http://localhost:3000/api/assignment');
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   const data = await res.json();
//   console.log("Fetched recipients data:", data);  
//   return data;
// }
// export default async function RecipientsListPage() {
//   const data = await getUsers();
//   console.log(data)
//   if (!data || !columns) {
//     return <div>Error loading data</div>;
//   }
  
//   console.log("Data passed to DataTable:", data);  // Aquís

//   return (
//     <div>
//       <DataTable data={data} columns={columns} />
//     </div>
//   );
// }


export default async function RecipientsListPage() {
  try {
    const [assignments, benefits, recipients ] = await Promise.all([
      prisma.assignment.findMany({ 
        include: { 
          benefit: true, 
          recipient: {
            include: {
              contact_info: {
                include: {
                  locality: true
                }
              }
            }
          }
        },
      }),
      prisma.benefit.findMany(),
      prisma.recipient.findMany(),
    ]);

    const result = {
      assignments, benefits, recipients
    }

    if (!result || !columns) {
      return <div>Error loading data</div>;
    }

    // console.log("Data passed to DataTable:", data);

    return (
      <div>
        <DataTable assignments={assignments} benefits={benefits} recipients={recipients} columns={columns} />
      </div>
    );
  } catch (error) {
    console.error("Error in RecipientsListPage:", error);
    return <div>Error loading data: {error.message}</div>;
  }
}