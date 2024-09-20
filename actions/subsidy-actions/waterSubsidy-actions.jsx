'use server'

import prisma from "@/lib/prisma";

export async function createWaterSubsidy(formData) {

  const enrollmentDate = new Date();
  const expiryDate = new Date(formData.get("expiry_date"));

  // Crear la Asignación
  const newAssignment = await prisma.assignment.create({
    data: {
      recipient_id: parseInt(formData.get("recipient")),
      benefit_id: 14,
      quantity: 1,
      enrollment_date: enrollmentDate,
      expiry_date: expiryDate,
      // status: "pendiente",
      // status: formData.get("status") || "pendiente",
      // detail_benefit: formData.get("detail"),
    },
  });

  // Crear HospitalCredential relacionada con la Asignación
  const newWaterSubsidy = await prisma.waterSubsidy.create({
    data: {
      assignment: {
        connect: { id: newAssignment.id }
      },
      supply_number:parseInt( formData.get("supply_number")),
      supply_value:parseInt( formData.get("supply_value")),
      user_number:parseInt( formData.get("user_number")),
      period: new Date(formData.get("period")),
      first_expiry: new Date(formData.get("first_expiry")),
      second_expiry: new Date(formData.get("second_expiry")),

    },
  });

  return {
    assignment: newAssignment,
    waterSubdsidy: newWaterSubsidy,
  };
  
}