import { DataTable } from "./(table)/data-table";
import { columns } from './(table)/columns'; // Importa columnas correctamente
import prisma from "@/lib/prisma";

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
          },
          docs:true,
          HospitalCredential:true,
          WaterSubsidy:true,
          TravelSubsidy:true,
          Observation:true,
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
      <div className="flex flex-1 flex-col md:px-8 ">
        <DataTable assignments={assignments} benefits={benefits} recipients={recipients} columns={columns} />
      </div>
    );
  } catch (error) {
    console.error("Error in RecipientsListPage:", error);
    return <div>Error loading data: {error.message}</div>;
  }
}