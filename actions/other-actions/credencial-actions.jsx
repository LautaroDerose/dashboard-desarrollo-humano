"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Lista de trabajadoras sociales
const socialWorkers = ["TS 1", "TS 2", "TS 3"];

export async function createAssignmentWithCredential(formData) {
  const enrollmentDate = new Date();
  const expiryDate = new Date(formData.get("expiry_date"));

  // Obtener el número total de credenciales existentes
  const totalCredentials = await prisma.hospitalCredential.count();

  // Determinar la TS asignada utilizando el total de credenciales (esto asegura la rotación)
  const assignedTS = socialWorkers[totalCredentials % socialWorkers.length];

  // Crear la Asignación
  const newAssignment = await prisma.assignment.create({
    data: {
      recipient_id: parseInt(formData.get("recipient")),
      benefit_id: 16,
      quantity: 1,
      enrollment_date: enrollmentDate,
      expiry_date: expiryDate,
      status: formData.get("status") || "pendiente",
      // detail_benefit: formData.get("detail"),
    },
  });

  // Crear HospitalCredential relacionada con la Asignación
  const newHospitalCredential = await prisma.hospitalCredential.create({
    data: {
      assignment: {
        connect: { id: newAssignment.id }
      },
      ts_name: assignedTS,
      // visiting_shift: formData.get("visiting_shift") || undefined,
      // visit_date: null,
      visit_status: "pendiente",
      visit_confirm: false,
      report_soc_eco_issued: false,
      report_soc_eco_received: false,
    },
  });


  return {
    assignment: newAssignment,
    hospitalCredential: newHospitalCredential,
  };
  
}

export async function createHomeVisit(formData){
  const assignmentId = parseInt(formData.get("assignmentId"));
  const visiting_shift = formData.get("visiting_shift");
  const visit_date = new Date(formData.get("visit_date"));
  const ts_name = formData.get("ts_name");

  const visitingData = await prisma.hospitalCredential.update({
    where: { assignment_id: assignmentId },
    data:{
      visiting_shift: visiting_shift,
      visit_date: visit_date.toISOString(),
      ts_name: ts_name,
    }
  })
  revalidatePath("/")
}

export async function createCredentialObservation(formData) {
  const assignmentId = parseInt(formData.get("assignmentId"));
  const recipientId = parseInt(formData.get("recipientId"));
  const author = formData.get("author");
  const subject = formData.get("subject");
  const text = formData.get("text");

  const observation = await prisma.observation.create({
    data: {
      assignment: {
        connect: { id: assignmentId }
      },
      recipient: {
        connect: { id: recipientId }
      },
      author: author,
      subject: subject,
      text: text,
      is_active:true
    }
  });
  revalidatePath("/")
  // redirect(`/trabajador_social/${assignmentId}`)

}

export async function disableObservation(formData){
  const observationId = parseInt(formData.get("observationId"));
  try {
    await prisma.Observation.update({ 
      where: { 
        id: observationId 
      },
      data:{
        is_active: false
      }

    });
    console.log(`Beneficio con ID ${observationId} desactivado correctamente.`);
    // Optionally return something meaningful after deletion
    revalidatePath("dashboard/benefits");
  } catch (error) {
    console.error(`Error al desactivar beneficio con ID ${observationId}:`, error);
    throw error; // Propagate the error to handle it in the UI or caller
  }
}

export async function confirmVisit(formData){
  const assignmentId = parseInt(formData.get("assignmentId"));
  const report_soc_eco_issue_date = new Date();

  const visitingData = await prisma.hospitalCredential.update({
    where: { assignment_id: assignmentId },
    data:{
      report_soc_eco_issue_date: report_soc_eco_issue_date.toISOString(),
      report_soc_eco_issued: true,
    }
  })
  revalidatePath("/")
}

export async function issueCredential(formData) {
  const assignmentId = parseInt(formData.get("assignmentId"));
  const report_soc_eco_receive_date = new Date();

  // Primero, crea o actualiza el registro en hospitalCredential
  const credentialData = await prisma.hospitalCredential.update({
    where: { assignment_id: assignmentId },
    data: {
      report_soc_eco_receive_date: report_soc_eco_receive_date.toISOString(),
      report_soc_eco_received: true,
    },
  });

  // Luego, actualiza el campo credential_number con el propio ID
  await prisma.hospitalCredential.update({
    where: { id: credentialData.id }, // Usamos el id del registro recién creado
    data: {
      credential_number: (credentialData.id).toString(), // Asignamos el id al campo credential_number
    },
  });

  redirect("/secretaria_dh");
}



// export async function GetTsData() {
//   const tsNames = ['TS 1', 'TS 2', 'TS 3']; // Asegúrate de que estos nombres coincidan con los existentes en tu base de datos
//   const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // Inicio del mes actual
//   const previousMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1); // Inicio del mes anterior
//   const currentMonthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0); // Fin de mes actual

//   const totalPerMonth = await prisma.hospitalCredential.count({
//     where: {
//       visit_date: {
//         gte: currentMonthStart,
//         lt: currentMonthEnd,
//       },
//       report_soc_eco_issued: true,
//     },
//   });

//   const results = {};
//   for (const tsName of tsNames) {
//     const currentMonthVisits = await prisma.hospitalCredential.count({
//       where: {
//         visit_date: {
//           gte: currentMonthStart,
//           lt: currentMonthEnd,
//         },
//         ts_name: tsName,
//         report_soc_eco_issued: true,
//       },
//     });

//     const previousMonthVisits = await prisma.hospitalCredential.count({
//       where: {
//         visit_date: {
//           gte: previousMonthStart,
//           lt: currentMonthStart,
//         },
//         ts_name: tsName,
//         report_soc_eco_issued: true,
//       },
//     });

//     const totalVisits = await prisma.hospitalCredential.count({
//       where: {
//         ts_name: tsName,
//         report_soc_eco_issued: true,
//       },
//     });

//     results[tsName] = {
//       currentMonthVisits,
//       previousMonthVisits,
//       totalVisits,
//     };
//   }

//   return {results, totalPerMonth};
// }

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

  const recientesTS = await prisma.assignment.findMany({
    where: {
      enrollment_date: {
        lte: today // Menor o igual a la fecha actual
      },
      AND:{
        benefit_id: 16
      }
    },
    orderBy: {
      enrollment_date: 'desc' // Ordenar de más reciente a menos reciente
    },
    include: {
      benefit: true,
      recipient: true,
      HospitalCredential: true
    },
    take: 3
  });
  
  const recientesSecretaria = await prisma.assignment.findMany({
    where: {
      // enrollment_date: {
      //   lte: today // Menor o igual a la fecha actual
      // },
      AND:{
        benefit_id: 16
      },
      AND:{
        HospitalCredential:{
          report_soc_eco_issue_date:{not: null},
          credential_number: null
        }
      }
    },
    orderBy: {
      enrollment_date: 'desc' // Ordenar de más reciente a menos reciente
    },
    include: {
      benefit: true,
      recipient: true,
      HospitalCredential: true
    },
    // take: 3
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

  return { results, totalPerMonth, recientesTS, recientesSecretaria };
}