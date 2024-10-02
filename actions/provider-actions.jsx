"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getInfoGarrafa() {
  const today = new Date();
  const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());

  const proximosVencimientos = await prisma.assignment.findMany({
    where: {
      benefit_id: 11,
      GarrafaSubsidy: {
        is_confirm: false,
      },
      OR: [
        { withdrawal_date: null },
        { withdrawal_date: undefined },
      ],
      expiry_date: {
        gte: today,
      },
    },
    include: {
      benefit: true,
      recipient: true,
      GarrafaSubsidy: true,
    },
    orderBy: {
      expiry_date: 'asc'
    },
    take: 10
  });

  const entregasRecientes = await prisma.assignment.findMany({
    where: {
      benefit_id: 11,
      GarrafaSubsidy: {
        is_confirm: true,
        confirmed_at: {
          gte: threeMonthsAgo,
        },
      },
    },
    include: {
      benefit: true,
      recipient: true,
      GarrafaSubsidy: true,
    },
    orderBy: {
      GarrafaSubsidy: {
        confirmed_at: 'desc',
      },
    },
    take: 10
  });

  return { proximosVencimientos, entregasRecientes };
}

export async function confirmarEntregaGarrafa(id) {
  try {
    await prisma.garrafaSubsidy.update({
      where: { assignment_id: id },
      data: { 
        is_confirm: true,
        confirmed_at: new Date()
      }
    });
    revalidatePath("/garrafa");
    return { success: true };
  } catch (error) {
    console.error("Error confirming assignment:", error);
    return { success: false, error: "Error al confirmar la entrega" };
  }
}



// ------------------ PASAJES

export async function getInfoTravel() {
  const today = new Date();
  const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());

  const pendingSubsidies = await prisma.assignment.findMany({
    where: {
      benefit_id: 13, // Asumiendo que 13 es el ID para subsidios de viaje
      TravelSubsidy: {
        some: {
          is_complete: false,
        },
      },
    },
    include: {
      benefit: true,
      recipient: true,
      TravelSubsidy: true,
    },
    orderBy: {
      expiry_date: 'asc'
    },
    take: 10
  });

  const recentSubsidies = await prisma.assignment.findMany({
    where: {
      benefit_id: 13,
      TravelSubsidy: {
        some: {
          is_complete: true,
        },
      },
      enrollment_date: {
        gte: threeMonthsAgo,
      },
    },
    include: {
      benefit: true,
      recipient: true,
      TravelSubsidy: true,
    },
    orderBy: {
      enrollment_date: 'desc',
    },
    take: 10
  });

  return { pendingSubsidies, recentSubsidies };
}

export async function completeTravelSubsidy(id) {
  try {
    await prisma.travelSubsidy.update({
      where: { id },
      data: { 
        is_complete: true,
      }
    });
    revalidatePath("/pasajes");
    return { success: true };
  } catch (error) {
    console.error("Error completing travel subsidy:", error);
    return { success: false, error: "Error al completar el subsidio de viaje" };
  }
}
