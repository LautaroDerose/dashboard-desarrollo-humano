"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createGarrafaAssignment(formData) {
  const enrollmentDate = new Date();
  const expiryDate = new Date(formData.get("expiry_date"));
  const recipientId = parseInt(formData.get("recipient"));

  // Obtener información del recipient, incluyendo el grupo familiar
  const recipient = await prisma.recipient.findUnique({
    where: { id: recipientId },
    include: { family_group: true },
  });

  if (!recipient) {
    throw new Error("Recipient no encontrado");
  }

  const familyGroupId = recipient.family_group_id;

  // Verificar si algún miembro del grupo familiar ha recibido una asignación de garrafa este mes
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  const previousFamilyAssignment = await prisma.assignment.findFirst({
    where: {
      benefit_id: 11, // Tipo de beneficio para garrafa
      recipient: {
        family_group_id: familyGroupId,
      },
      enrollment_date: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });

  // Determinar el tipo de estado según la asignación previa
  const statusTypeId = previousFamilyAssignment ? 4 : 3; // 4 = "revisión", 3 = "pendiente"

  // Crear la nueva asignación
  const newAssignment = await prisma.assignment.create({
    data: {
      recipient_id: recipientId,
      benefit_id: 11, // Garrafa
      quantity: 1,
      enrollment_date: enrollmentDate,
      expiry_date: expiryDate,
    },
  });

  // Crear el registro de estado asociado a la asignación
  const newStatus = await prisma.status.create({
    data: {
      assignment_id: newAssignment.id,
      status_type_id: statusTypeId, // 4 = "revisión", 3 = "pendiente"
    },
  });

  // Crear el registro de GarrafaAssignment relacionado con la asignación
  const newGarrafaAssignment = await prisma.garrafaSubsidy.create({
    data: {
      assignment: {
        connect: { id: newAssignment.id },
      },
      provider_name: formData.get("provider"),
      verification_dni: parseInt(formData.get("dni")),
    },
  });

  return {
    assignment: newAssignment,
    garrafaAssignment: newGarrafaAssignment,
    status: newStatus,
  };
}
// export async function createGarrafaSubsidy({}) {
//   const benefitId = 11;
//   const recipientId = parseInt(formData.get("recipient"))
//   const enrollmentDate = new Date(); // Fecha actual
//   const expiryDate = new Date(formData.get("expiry_date"));

//   // Crear la Asignación
//   const newAssignment = await prisma.assignment.create({
//     data: {
//       recipient_id: recipientId,
//       benefit_id: benefitId,
//       quantity: 1,
//       enrollment_date: enrollmentDate,
//       expiry_date: expiryDate,
//       amount: parseInt(formData.get("amount")),
//     },
//   });

//   const newGarrafa = await prisma.GarrafaSubsidy.create({
//     data: {
//       assignment: {
//         connect:{ id: newAssignment.id }
//       },
//       provider_name: formData.get("provider"),
//       verification_dni: formData.get("dni"),
//     }
//   })

// }