"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


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

export async function getAssignmentsForLocalities() {
  const localities = await prisma.locality.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  // Obtener el total de asignaciones para cada localidad
  const results = await Promise.all(
    localities.map(async (locality) => {
      const count = await prisma.assignment.count({
        where: {
          recipient: {
            contact_info: {
              locality_id: locality.id,
            },
          },
        },
      });
      return { localityId: locality.id, name: locality.name, count };
    })
  );

  return results;
}

// export async function getBenefitsAssignments() {
//   // Obtener los beneficios
//   const benefits = await prisma.benefit.findMany({
//     select: {
//       id: true,
//       name: true,
//     },
//   });

//   // Obtener las asignaciones por mes para cada beneficio
//   const now = new Date();
//   const results = await Promise.all(
//     benefits.map(async (benefit) => {
//       const assignments = await prisma.assignment.findMany({
//         where: {
//           benefit_id: benefit.id,
//         },
//         select: {
//           amount: true,
//           enrollment_date: true,
//         },
//       });

//       // Agrupar asignaciones por mes y sumar los amounts
//       const monthlyAssignments = Array.from({ length: 12 }, (_, index) => {
//         const month = index + 1;
//         const totalAmount = assignments
//           .filter(assignment => new Date(assignment.enrollment_date).getMonth() + 1 === month)
//           .reduce((sum, assignment) => sum + assignment.amount, 0);

//         return {
//           month,
//           amount: totalAmount,
//         };
//       });

//       return { benefitId: benefit.id, benefitName: benefit.name, monthlyAssignments };
//     })
//   );

//   return results;
// }
export async function getBenefitsAssignments(year, localityId = null) {
  // Obtener los beneficios
  const benefits = await prisma.benefit.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const now = new Date();

  // Obtener las asignaciones por mes para cada beneficio
  const results = await Promise.all(
    benefits.map(async (benefit) => {
      const assignments = await prisma.assignment.findMany({
        where: {
          benefit_id: benefit.id,
          enrollment_date: {
            gte: new Date(`${year}-01-01T00:00:00.000Z`),
            lt: new Date(`${year + 1}-01-01T00:00:00.000Z`),
          },
        },
        include: {
          recipient: {
            include: {
              contact_info: {
                select: {
                  locality_id: true,
                },
              },
            },
          },
        },
      });

      // Filtrar por localidad si se proporciona
      const filteredAssignments = localityId
        ? assignments.filter(
            (assignment) =>
              assignment.recipient.contact_info.locality_id === localityId
          )
        : assignments;

      // Agrupar asignaciones por mes y sumar los amounts
      const monthlyAssignments = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        const totalAmount = filteredAssignments
          .filter(
            (assignment) => new Date(assignment.enrollment_date).getMonth() + 1 === month
          )
          .reduce((sum, assignment) => sum + assignment.amount, 0);

        return {
          month,
          amount: totalAmount,
        };
      });

      const totalAmount = monthlyAssignments.reduce((sum, item) => sum + item.amount, 0);

      return { benefitId: benefit.id, benefitName: benefit.name, monthlyAssignments, totalAmount };
    })
  );

  // Calcular la suma total de todos los beneficios por mes
  const monthlyTotals = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const totalAmount = results
      .flatMap((benefit) => benefit.monthlyAssignments)
      .filter((assignment) => assignment.month === month)
      .reduce((sum, assignment) => sum + assignment.amount, 0);

    return {
      month,
      amount: totalAmount,
    };
  });

  return {
    benefits: results,
    monthlyTotals,
  };
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