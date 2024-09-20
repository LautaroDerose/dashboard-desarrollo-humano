"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Lista de trabajadoras sociales
const socialWorkers = ["TS 1", "TS 2", "TS 3"];

export async function GetTsData(selectedMonth, selectedYear) {
  const tsNames = ['TS 1', 'TS 2', 'TS 3'];
  const month = selectedMonth ?? new Date().getMonth(); // Si no se selecciona mes, usa el mes actual
  const year = selectedYear ?? new Date().getFullYear(); // Si no se selecciona año, usa el año actual
  const today = new Date().toISOString();

  const currentMonthStart = new Date(year, month, 1); // Inicio del mes seleccionado
  const currentMonthEnd = new Date(year, month + 1, 0); // Fin del mes seleccionado
  const previousMonthStart = new Date(year, month - 1, 1); // Inicio del mes anterior

  // Total del mes seleccionado
  const totalPerMonth = await prisma.hospitalCredential.count({
    where: {
      visit_date: {
        gte: currentMonthStart,
        lt: currentMonthEnd,
      },
      report_soc_eco_issued: true,
    },
  });

  // const recientesSecretaria = await prisma.assignment.findMany({
  //   where: {
  //     // enrollment_date: {
  //     //   lte: today // Menor o igual a la fecha actual
  //     // },
  //     AND:{
  //       benefit_id: 16 || 14 
  //     },
  //     AND:{
  //       HospitalCredential:{
  //         report_soc_eco_issue_date:{not: null},
  //         credential_number: null
  //       }
  //     }
  //   },
  //   orderBy: {
  //     enrollment_date: 'desc' // Ordenar de más reciente a menos reciente
  //   },
  //   include: {
  //     benefit: true,
  //     recipient: true,
  //     HospitalCredential: true,
  //     WaterSubsidy: true
  //   },
  //   // take: 3
  // });

  const recientesSecretaria = await prisma.assignment.findMany({
    where: {
      OR: [
        {
          benefit_id: 16,
          HospitalCredential: {
            report_soc_eco_issue_date: { not: null },
            credential_number: null
          }
        },
        {
          benefit_id: 14,
          WaterSubsidy: {
            assignment_value: null
          }
        }
      ]
    },
    orderBy: {
      enrollment_date: 'desc' // Ordenar de más reciente a menos reciente
    },
    include: {
      benefit: true,
      recipient: true,
      HospitalCredential: true,
      WaterSubsidy: true
    },
    // take: 3 // Puedes limitar el número de resultados si es necesario
  });

  const results = {};
  for (const tsName of tsNames) {
    // Visitas del mes seleccionado por TS
    const currentMonthVisits = await prisma.hospitalCredential.count({
      where: {
        visit_date: {
          gte: currentMonthStart,
          lt: currentMonthEnd,
        },
        ts_name: tsName,
        report_soc_eco_issued: true,
      },
    });

    // Visitas del mes anterior por TS
    const previousMonthVisits = await prisma.hospitalCredential.count({
      where: {
        visit_date: {
          gte: previousMonthStart,
          lt: currentMonthStart,
        },
        ts_name: tsName,
        report_soc_eco_issued: true,
      },
    });

    // Total de visitas por TS
    const totalVisits = await prisma.hospitalCredential.count({
      where: {
        ts_name: tsName,
        report_soc_eco_issued: true,
      },
    });

    results[tsName] = {
      currentMonthVisits,
      previousMonthVisits,
      totalVisits,
    };
  }

  return { results, totalPerMonth, recientesSecretaria };
}