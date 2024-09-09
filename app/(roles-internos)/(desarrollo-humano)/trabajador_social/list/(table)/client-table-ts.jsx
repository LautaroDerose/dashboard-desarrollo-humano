import { columns } from "@/app/(roles-internos)/(desarrollo-humano)/trabajador_social/list/(table)/columns";
import { DataTable } from "@/app/(roles-internos)/(desarrollo-humano)/trabajador_social/list/(table)/data-table";
import prisma from "@/lib/prisma";

export default async function ClientTableTS() {
  try {
    const [assignments, benefits, recipients, hospitalCredentials ] = await Promise.all([
      prisma.assignment.findMany({ 
        where: {
          benefit: {
            id: 16,
          },
          // OR: [
          //   { withdrawal_date: null },
          //   { withdrawal_date: undefined },
          // ],
          expiry_date: {
            gte: new Date(), // gte significa 'greater than or equal', es decir, hoy o en el futuro
          }
        },
        orderBy: {
          expiry_date: 'asc' // Ordenar de vencimientos más cercanos a más lejanos
        },
        include: { 
          benefit: true,
          HospitalCredential: true, // <--- Asegúrate de incluir esto
          recipient: {
            include: {
              contact_info: {
                include: {
                  locality: true,
                  street: true
                }
              }
            }
          },
        },
      }),
      prisma.benefit.findMany(),
      prisma.recipient.findMany(),
      prisma.hospitalCredential.findMany(), // Asegúrate de que esto existe y es necesario
    ]);

    const result = {
      assignments, benefits, recipients, hospitalCredentials
    };

    if (!result || !columns) {
      return <div>Error loading data</div>;
    }

    return (
      <div className="flex flex-1 flex-col md:px-8 ">
        <DataTable assignments={assignments} benefits={benefits} recipients={recipients} columns={columns} hospitalCredential={hospitalCredentials} />
      </div>
    );
  } catch (error) {
    console.error("Error in RecipientsListPage:", error);
    return <div>Error loading data: {error.message}</div>;
  }
}
// import { columns } from "@/app/(roles-internos)/(desarrollo-humano)/trabajador_social/list/(table)/columns";
// import { DataTable } from "@/app/(roles-internos)/(desarrollo-humano)/trabajador_social/list/(table)/data-table";
// import prisma from "@/lib/prisma";

// export default async function ClientTS() {
//   try {
//     const [assignments, benefits, recipients, hospitalCredentials ] = await Promise.all([
//       prisma.assignment.findMany({ 
//         where: {
//           benefit: {
//             id: 16,
//           },
//           OR: [
//             { withdrawal_date: null },
//             { withdrawal_date: undefined },
//           ],
//           expiry_date: {
//             gte: new Date(), // gte significa 'greater than or equal', es decir, hoy o en el futuro
//           }
//         },
//         orderBy: {
//           expiry_date: 'asc' // Ordenar de vencimientos más cercanos a más lejanos
//         },
//         include: { 
//           benefit: true,
//           HospitalCredential: true, // <--- Asegúrate de incluir esto
//           recipient: {
//             include: {
//               contact_info: {
//                 include: {
//                   locality: true,
//                   street: true
//                 }
//               }
//             }
//           },
//         },
//       }),
//       prisma.benefit.findMany(),
//       prisma.recipient.findMany(),
//       prisma.hospitalCredential.findMany(), // Asegúrate de que esto existe y es necesario
//     ]);

//     const result = {
//       assignments, benefits, recipients, hospitalCredentials
//     };

//     if (!result || !columns) {
//       return <div>Error loading data</div>;
//     }

//     return (
//       <div className="flex flex-1 flex-col md:px-8 ">
//         <DataTable assignments={assignments} benefits={benefits} recipients={recipients} columns={columns} hospitalCredential={hospitalCredentials} />
//       </div>
//     );
//   } catch (error) {
//     console.error("Error in RecipientsListPage:", error);
//     return <div>Error loading data: {error.message}</div>;
//   }
// }