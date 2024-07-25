"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getCounter(){
  const now = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(now.getMonth() - 1);

  const assignmentCount = await prisma.assignment.count({
    where: {
      enrollment_date: {
        gte: oneMonthAgo,
        lte: now
      }
    }
  })
}


export async function getFilteredAssignmentsCount({ benefitId, timeFilter, withWithdrawal }) {
  console.log('Received parameters:', { benefitId, timeFilter, withWithdrawal });

  let whereClause = { benefit_id: benefitId };

  if (withWithdrawal) {
    whereClause.withdrawal_date = { not: null };
  }

  if (timeFilter) {
    const currentDate = new Date();
    const startDate = new Date();
    switch (timeFilter.type) {
      case 'lastMonth':
        startDate.setMonth(currentDate.getMonth() - 1);
        break;
      case 'lastYear':
        startDate.setFullYear(currentDate.getFullYear() - 1);
        break;
      case 'specificMonth':
        const [year, month] = timeFilter.value.split('-');
        startDate.setFullYear(Number(year), Number(month) - 1, 1);
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);
        whereClause.enrollment_date = {
          gte: startDate.toISOString(),
          lt: endDate.toISOString(),
        };
        break;
      default:
        break;
    }

    if (timeFilter.type !== 'specificMonth') {
      whereClause.enrollment_date = {
        gte: startDate.toISOString(),
      };
    }
  }

  console.log('Constructed whereClause:', whereClause);

  const count = await prisma.assignment.count({
    where: whereClause,
  });

  console.log('Count result:', count);
  return count;
}

export async function getInfoCards(){
  
  const rechazados = await prisma.assignment.count({
    where:{
      status:"Rechazado"
    }
  })
  
  const enProcesos = await prisma.assignment.count({
    where:{
      status:"En Proceso"
    }
  })
  
  const pendientes = await prisma.assignment.count({
    where:{
      status:"Pendiente"
    }
  })
  
  const concretados = await prisma.assignment.count({
    where:{
      status:"Concretado"
    }
  })
  
  const recientes = await prisma.assignment.findMany({
    orderBy: {
      id: 'desc'
    },
    include:{
      benefit: true,
      recipient: true
    },
    take: 3
  });

  const proximosVencimientos = await prisma.assignment.findMany({
    where: {
      status: {
        not: "Concretado"
      }
    },
    orderBy: {
      expiry_date: 'asc'
    },
    include:{
      benefit: true,
      recipient: true
    },
    take: 4
  });

  return { rechazados, enProcesos, pendientes, concretados, recientes, proximosVencimientos }

}

export async function getInfoForGraphics(localityId) {
  const totalAssignmentsByLocality = await prisma.assignment.count({
    where: {
      recipient: {
        contact_info: {
          locality_id: localityId, // Utiliza el parámetro recibido
        },
      },
    },
  });

  return { totalAssignmentsByLocality };
}

const localities = [1, 2, 3, 4, 5];

export async function getAssignmentsForLocalities() {
  const results = await Promise.all(
    localities.map(async (localityId) => {
      const count = await prisma.assignment.count({
        where: {
          recipient: {
            contact_info: {
              locality_id: localityId,
            },
          },
        },
      });
      return { localityId, count };
    })
  );
  console.log('Results:', results);
  return results;
}

// export async function getInfoForGraphics() {
//   const now = new Date();
//   const thirtyDaysAgo = new Date();
//   thirtyDaysAgo.setDate(now.getDate() - 30);

//   const totalLastMonthAssignments = await prisma.assignment.count({
//     where: {
//       recipient: {
//         contact_info: {
//           locality_id: 1, // A futuro parametrizable
//         },
//       },
//       // withdrawal_date: {
//       //   not: null,
//       //   gte: thirtyDaysAgo,
//       //   lte: now,
//       // },
//     },
//   });

//   return { totalLastMonthAssignments };
// }


// export async function getInfoForGraphics() {
//   const now = new Date();
//   const thirtyDaysAgo = new Date();
//   thirtyDaysAgo.setDate(now.getDate() - 30);

//   const totalLastBenefit2 = await prisma.assignment.count({
//     where: {
//       benefit_id: 2,
//       // withdrawal_date: {
//       //   not: null,
//       //   gte: thirtyDaysAgo,
//       //   lte: now
//       // }
//     }
//   });

//   return { totalLastBenefit2 };
// }