import { DataTable } from "./(table)/data-table";
import { columns } from './(table)/columns'; 
import prisma from "@/lib/prisma";

export default async function RecipientsPage() {
  
  const [recipients, localities, recipientSocialConditions, socialConditions] = await Promise.all([
    prisma.recipient.findMany({
      where: {
        is_active: true
      },
      include: {
        contact_info: {
          include: {
            street: true,
            locality: true
          }
        }
      }
    }),
    prisma.locality.findMany({
      include: { Street: true }
    }),
    prisma.recipientSocialCondition.findMany({
      include: { 
        social_condition: true, 
        recipient: true 
      }
    }),
    prisma.socialCondition.findMany(),
    // prisma.benefits.findMany()
  ]);

  const result = {
    recipients,
    localities,
    recipientSocialConditions,
    socialConditions,
    // benefits
  };
  
  if (!result || !columns) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <DataTable data={result} columns={columns} localities={localities} />
    </div>
  );
}

