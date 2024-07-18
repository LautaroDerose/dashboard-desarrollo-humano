"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getRecipientsAndBenefits() {
  const recipients = await prisma.recipient.findMany({ where: { is_active: true, } });
  const benefits = await prisma.benefit.findMany();
  return { recipients, benefits };
}


export async function createAssignment(formData) {
  
  const enrollmentDate = new Date(formData.get("enrollment_date"));
  const expiryDate = new Date(formData.get("expiry_date"));

  await prisma.assignment.create({
    data: {
      recipient_id: parseInt(formData.get("recipient")),
      benefit_id: parseInt(formData.get("benefit")),
      amount: parseInt(formData.get("amount")),
      quantity: parseInt(formData.get("quantity")),
      enrollment_date: enrollmentDate.toISOString(),
      expiry_date: expiryDate.toISOString(),
      status: formData.get("status"),
    },
  });
  
  revalidatePath("dashboard/assignments");
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
// console.log(recientes)

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