import { DataTable } from "./(table)/data-table";
import { columns } from './(table)/columns'; // Importa columnas correctamente
import prisma from "@/lib/prisma";

export default async function RecipientsPage() {

  const [ benefits, benefitCategories ] = await Promise.all([
    prisma.benefit.findMany({
      include:{ category: true}
    }),
    prisma.benefitCategory.findMany()
  ])

  const result = {
    benefits,
    benefitCategories
  }

  if (!result || !columns) {
    return <div>Error loading data</div>;
  }
  
  return (
    <div >
      <DataTable  benefits={benefits} benefitCategories={benefitCategories} columns={columns} />
    </div>
  );
}