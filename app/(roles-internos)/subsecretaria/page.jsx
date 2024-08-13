import { auth } from "@/auth"
import ClientPanelSubsecretaria from "@/components/(roles-internos)/subsecretaria/client-panel"
import LogoutButton from "@/components/auth/logout-button"
import SimpleNavbar from "@/components/containers/simple-navbar";
import prisma from "@/lib/prisma";

export default async function SubsecretariaPage() {
  // const assignments = await prisma.assignment.findMany({
  //   where: {
  //     benefit: {
  //       category_id: 1,
  //     },

  //   },
  //   include: {
  //     benefit: true,
  //     recipient: true, // Incluye información del `Recipient` relacionado, si es necesario
  //   },
  // });
  const assignments = await prisma.assignment.findMany({
    where: {
      benefit: {
        category_id: 1,
      },
      OR: [
        { withdrawal_date: null },
        { withdrawal_date: undefined },
      ],
      expiry_date: {
        gte: new Date(), // gte significa 'greater than or equal', es decir, hoy o en el futuro
      },
      status: {
        notIn: ["Concretado", "En Revision", "Rechazado"],
      },
    },
    include: {
      benefit: true,
      recipient: true, // Incluye información del `Recipient` relacionado, si es necesario
    },
  });

  const session = await auth()

  if (session?.user?.role !== "subsecretaria") {
   return <div>No eres administrador</div>
  }
  return(
    <div className="">
    {/* <SimpleNavbar /> */}
     <ClientPanelSubsecretaria />
     {/* <pre>
        {
          JSON.stringify(assignments, null, 2)
        }
      </pre> */}
    </div>
  )
}



// <div className="container">
    //   subsecretaria
    //   <pre>
    //     {
    //       JSON.stringify(session, null, 2)
    //     }
    //   </pre>
    //   <LogoutButton />
    // </div>