'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAtmosferic(formData) {
  const enrollmentDate = new Date();
  const expiryDate = new Date(formData.get("expiry_date"));
  const desireDate = new Date(formData.get("desire_service_date"));
  
  const recipientId = parseInt(formData.get("recipient"));

  // Obtener la información de contacto del recipient
  const contactInfo = await prisma.contactInfo.findUnique({
    where: {
      recipient_id: recipientId,
    },
    include: {
      street: true,
    },
  });

  // Manejo si no existe ContactInfo
  if (!contactInfo) {
    throw new Error('No se encontró información de contacto para el recipient.');
  }

  // Crear la Asignación
  const newAssignment = await prisma.assignment.create({
    data: {
      recipient_id: recipientId,
      benefit_id: 15,
      quantity: 1,
      enrollment_date: enrollmentDate,
      expiry_date: expiryDate,
    },
  });

  // Crear AtmosphericOrder relacionada con la Asignación y con la info de contacto del recipient
  const newAtmosphericOrder = await prisma.AtmosphericOrder.create({
    data: {
      assignment: {
        connect: { id: newAssignment.id }
      },
      desired_service_date: desireDate ,
      address: `${contactInfo.street.name} ${contactInfo.street_number}`,
      phone: contactInfo.phone?.toString() || null, // Asegura que sea una string y permite null si no tiene teléfono
      payment_confirmed: false
    },
  });

  return {
    assignment: newAssignment,
    AtmosphericOrder: newAtmosphericOrder,
  };
}