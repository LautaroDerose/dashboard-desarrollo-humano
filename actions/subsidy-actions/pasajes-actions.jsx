"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// export async function getRecipientsAndBenefits() {
//   const recipients = await prisma.recipient.findMany({ where: { is_active: true } });

//   // Convierta todos los recipientes a plain objects
//   const plainRecipients = recipients.map((recipient) => ({
//     id: recipient.id,
//     first_name: recipient.first_name,
//     last_name: recipient.last_name,
//   }));

//   console.log("Plain Recipients:", plainRecipients);

//   return { recipients: plainRecipients };
// }


export async function createAssignmentWithTravelSubsidies({ recipient_id }) {
  const benefitId = 13; // Benefit ID por defecto
  const recipientId = parseInt(recipient_id);
  const enrollmentDate = new Date(); // Fecha actual

  // Inicializa el array para almacenar los datos de los subsidios

  let totalAmount = 0;

  const result = await prisma.assignment.create({
    data: {
      benefit_id: benefitId,
      recipient_id: recipientId,
      enrollment_date: enrollmentDate,
      amount: totalAmount,
      quntity: totalQuantity,
      TravelSubsidy: {
        create: [
          {
            assignment_id: assignment.id,
            destination: destination_index,
            date: date_index,
            direction: direction_idex,
            passenger_type: passenger_type_idex,
            name: name_idex,
            dni: dni_idex,
            amount: amount_idex,
            provider: provider_idex,
          },
          {
            assignment_id: assignment.id,
            destination: destination_index,
            date: date_index,
            direction: direction_idex,
            passenger_type: passenger_type_idex,
            name: name_idex,
            dni: dni_idex,
            amount: amount_idex,
            provider: provider_idex,
          },
        ],
      },
    },
    include: {
      // Include trvelSubsidy
      TravelSubsidy: true
    },
  })

  return { result };
}
// -------------------------------------------------------
// -------------------CREATE  MANY-----------------
// -------------------------------------------------------ss
// export async function createAssignmentWithTravelSubsidies({ recipient_id, travelSubsidies }) {
//   const benefitId = 13; // Benefit ID por defecto
//   const recipientId = parseInt(recipient_id);
//   const enrollmentDate = new Date(); // Fecha actual

//   // Inicializa el array para almacenar los datos de los subsidios
//   const travelSubsidyData = [];
//   let totalAmount = 0;

//   // Recopila los datos de travelSubsidies y calcula el monto total
//   for (const subsidy of travelSubsidies) {
//     const { destination, date, direction, passenger, name, dni, amount, provider } = subsidy;
    
//     totalAmount += parseFloat(amount);

//     travelSubsidyData.push({
//       destination,
//       date: new Date(date),
//       direction,
//       passenger_type: passenger,
//       name,
//       dni: parseInt(dni),
//       amount: parseFloat(amount),
//       provider,
//     });
//   }

//   // Crea el Assignment
//   const assignment = await prisma.assignment.create({
//     data: {
//       benefit_id: benefitId,
//       recipient_id: recipientId,
//       enrollment_date: enrollmentDate,
//       amount: totalAmount,
//       quantity: travelSubsidyData.length,
//     },
//   });

//   // Asegúrate de que travelSubsidyData tenga la estructura correcta
//   if (travelSubsidyData.length === 0) {
//     throw new Error('No travel subsidies provided');
//   }

//   // Asigna el assignment_id a cada subsidio de viaje
//   const travelSubsidyDataWithAssignmentId = travelSubsidyData.map((data) => ({
//     ...data,
//     assignment_id: assignment.id,
//   }));

//   // Imprime para verificar los datos que se están enviando
//   console.log('Travel Subsidy Data with Assignment ID:', travelSubsidyDataWithAssignmentId);

//   // Crea múltiples TravelSubsidy en la base de datos
//   await prisma.travelSubsidy.createMany({
//     data: travelSubsidyDataWithAssignmentId,
//     skipDuplicates: true, // Opcional: para evitar duplicados si es necesario
//   });

  
//   // await prisma.travelSubsidy.createMany({
//   //   data: [
//   //     { 
//   //       assignment_id: 1, 
//   //       destination: 'Place A', 
//   //       date: new Date(), 
//   //       direction: 'round', 
//   //       passenger_type: 'main', 
//   //       name: 'John Doe', 
//   //       dni: 123456, 
//   //       amount: 100.0, 
//   //       provider: 'Provider X' 
//   //     },
//   //     { 
//   //       assignment_id: 1, 
//   //       destination: 'Place B', 
//   //       date: new Date(), 
//   //       direction: 'round', 
//   //       passenger_type: 'companion', 
//   //       name: 'Jane Doe', 
//   //       dni: 654321, 
//   //       amount: 150.0, 
//   //       provider: 'Provider Y' 
//   //     }
//   //   ]
//   // });

//   return { assignment, travelSubsidyData };
// }
// -------------------------------------------------------------
// export async function createAssignmentWithTravelSubsidies({ recipient_id, travelSubsidies }) {
//   const benefitId = 13; // Benefit ID por defecto
//   const recipientId = parseInt(recipient_id);
//   const enrollmentDate = new Date(); // Fecha actual

//   const travelSubsidyData = [];
//   const subsidies = travelSubsidyData.map((data) => ({
//     ...data,
//     assignment_id: assignment.id,
//   }))
//   let totalAmount = 0;

//   for (const subsidy of travelSubsidies) {
//     const { destination, date, direction, passenger, name, dni, amount, provider } = subsidy;
    
//     totalAmount += parseFloat(amount);

//     travelSubsidyData.push({
//       destination,
//       date: new Date(date),
//       direction,
//       passenger_type: passenger,
//       name,
//       dni: parseInt(dni),
//       amount: parseFloat(amount),
//       provider,
//     });
//   }

//   const assignment = await prisma.assignment.create({
//     data: {
//       benefit_id: benefitId,
//       recipient_id: recipientId,
//       enrollment_date: enrollmentDate,
//       amount: totalAmount,
//       quantity: travelSubsidyData.length,
//     },
//   });

//   await prisma.travelSubsidy.createMany({
//     data: [
//       subsidies
//     ]
//   });

//   return { assignment, travelSubsidyData };
// }
// -------------------------------------------------------
// -------------------------------------------------------
// import { prisma } from '@/lib/prisma';
// export async function createAssignmentWithTravelSubsidies(formData) {
//   const benefitId = 13; // Benefit ID por defecto
//   const recipientId = parseInt(formData.get("recipient_id"));
//   const enrollmentDate = new Date(); // Fecha actual

//   const travelSubsidies = [];
//   let totalAmount = 0;

//   const subsidyCount = formData.getAll("amount_0").length; // Cambia esto si el índice principal es otro
//   for (let i = 0; i < subsidyCount; i++) {
//     const destination = formData.get(`destination_${i}`);
//     const date = formData.get(`date_${i}`);
//     const direction = formData.get(`direction_${i}`);
//     const passenger_type = formData.get(`passenger_${i}`);
//     const name = formData.get(`name_${i}`);
//     const dni = parseInt(formData.get(`dni_${i}`));
//     const amount = parseFloat(formData.get(`amount_${i}`));
//     const provider = formData.get(`provider_${i}`);

//     totalAmount += amount;

//     travelSubsidies.push({
//       destination,
//       date: new Date(date),
//       direction,
//       passenger_type,
//       name,
//       dni,
//       amount,
//       provider,
//     });
//   }

//   const assignment = await prisma.assignment.create({
//     data: {
//       benefit_id: benefitId,
//       recipient_id: recipientId,
//       enrollment_date: enrollmentDate,
//       amount: totalAmount,
//       quantity: travelSubsidies.length,
//     },
//   });

//   await prisma.travelSubsidy.createMany({
//     data: travelSubsidies.map((data) => ({
//       ...data,
//       assignment_id: assignment.id,
//     })),
//   });

//   return { assignment, travelSubsidies };
// }
// -------------------------------------------------------------------------

// export async function createAssignmentWithTravelSubsidies(formData) {
//   const benefitId = 13; // Benefit ID por defecto
//   const recipientId = parseInt(formData.get("recipient_id"));
//   const enrollmentDate = new Date(); // Fecha actual

//   const travelSubsidies = [];
//   let totalAmount = 0;

//   // Aquí suponemos que todos los campos de subsidio de viaje tienen el mismo índice
//   const subsidyCount = formData.getAll("amount_0").length; // Cambia esto para asegurar que cuentas el número correcto de subsidios
//   for (let i = 0; i < subsidyCount; i++) {
//     const destination = formData.get(`destination_${i}`);
//     const date = formData.get(`date_${i}`);
//     const direction = formData.get(`direction_${i}`);
//     const passenger_type = formData.get(`passenger_type_${i}`);
//     const name = formData.get(`name_${i}`);
//     const dni = parseInt(formData.get(`dni_${i}`));
//     const amount = parseFloat(formData.get(`amount_${i}`));
//     const provider = formData.get(`provider_${i}`);

//     totalAmount += amount;

//     travelSubsidies.push({
//       destination,
//       date: new Date(date),
//       direction,
//       passenger_type,
//       name,
//       dni,
//       amount,
//       provider,
//     });
//   }

//   const assignment = await prisma.assignment.create({
//     data: {
//       benefit_id: benefitId,
//       recipient_id: recipientId,
//       enrollment_date: enrollmentDate,
//       amount: totalAmount,
//       quantity: travelSubsidies.length,
//     },
//   });

//   await prisma.travelSubsidy.createMany({
//     data: travelSubsidies.map((data) => ({
//       ...data,
//       assignment_id: assignment.id,
//     })),
//   });

//   return { assignment, travelSubsidies };
// }

export async function getInfoCards(){
  
    // Obtener el año actual
    const currentYear = new Date().getFullYear();
    const today = new Date().toISOString();

    // Definir el rango de fechas para el último año
    const startOfYear = new Date(`${currentYear - 1}-01-01`).toISOString();
    const endOfYear = new Date(`${currentYear}-01-01`).toISOString();

  const recientes = await prisma.assignment.findMany({
    where: {
      enrollment_date: {
        lte: today // Menor o igual a la fecha actual
      }
    },
    orderBy: {
      enrollment_date: 'desc' // Ordenar de más reciente a menos reciente
    },
    include: {
      benefit: true,
      recipient: true
    },
    take: 3
  });

  const proximosVencimientos = await prisma.assignment.findMany({
    where: {
      // status: {
      //   not: "Concretado"
      // },
      expiry_date: {
        gte: today // Mayor o igual a la fecha actual
      }
    },
    orderBy: {
      expiry_date: 'asc' // Ordenar de vencimientos más cercanos a más lejanos
    },
    include: {
      benefit: true,
      recipient: true
    },
    take: 4
  });

  return { rechazados, enProcesos, pendientes, concretados, enRevision, recientes, proximosVencimientos }

}

export async function getSingleAssignment(req, res) {
  const id  = req.query;
  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id: parseInt(id) },
      include: {
        benefit: true,
        recipient: true
      }
    });
    if (assignment) {
      res.status(200).json(assignment);
    } else {
      res.status(404).json({ error: "Assignment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching assignment: " + error.message });
  }
}


