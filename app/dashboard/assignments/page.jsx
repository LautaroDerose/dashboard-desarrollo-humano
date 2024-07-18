import prisma from "@/lib/prisma";
import { PanelAssignment } from "./panel-assignment";

export default async function AssignmentsPage() {
  const [assignments, benefits, recipients] = await Promise.all([
    prisma.assignment.findMany({
      include: {
        benefit: true,
        recipient: true
      }
    }),
    prisma.benefit.findMany(),
    prisma.recipient.findMany(),

  ]);

  const result = {
    assignments, benefits, recipients
  }

  // const assigment = result.assigment
  console.log(result)
  if (!result) {
    return <div>Error loading data</div>;
  }

  return (
    // <div className="max-h-[90vh] overflow-hidden">
    <div>
        {/* <PanelAssignment data={data}/> */}
        <PanelAssignment assignments={assignments} benefits={benefits} recipients={recipients} />
    </div>
 )
}

