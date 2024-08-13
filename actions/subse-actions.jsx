"use server";

import prisma from "@/lib/prisma";

export async function getInfoCards(){
  
  // Obtener el año actual
  const currentYear = new Date().getFullYear();
  const today = new Date().toISOString();

  // Definir el rango de fechas para el último año
  const startOfYear = new Date(`${currentYear - 1}-01-01`).toISOString();
  const endOfYear = new Date(`${currentYear}-01-01`).toISOString();


const luz = await prisma.assignment.count({
  where: {
    benefit_id: 1 ,
    OR: [
      { withdrawal_date: null },
      { withdrawal_date: undefined },
    ],
    expiry_date: {
      gte: new Date(), // gte significa 'greater than or equal', es decir, hoy o en el futuro
    },
    status: {
      notIn: ["Concretado", "En Revision", "Rechazado"],
    },
  },
});

const gas = await prisma.assignment.count({
  where: {
    benefit_id: 2 ,
    OR: [
      { withdrawal_date: null },
      { withdrawal_date: undefined },
    ],
    expiry_date: {
      gte: new Date(), // gte significa 'greater than or equal', es decir, hoy o en el futuro
    },
    status: {
      notIn: ["Concretado", "En Revision", "Rechazado"],
    },
  },
});

const consulta = await prisma.assignment.count({
  where: {
    benefit_id: 3 ,
    OR: [
      { withdrawal_date: null },
      { withdrawal_date: undefined },
    ],
    expiry_date: {
      gte: new Date(), // gte significa 'greater than or equal', es decir, hoy o en el futuro
    },
    status: {
      notIn: ["Concretado", "En Revision", "Rechazado"],
    },
  },
});

const estudio = await prisma.assignment.count({
  where: {
    benefit_id: 4 ,
    OR: [
      { withdrawal_date: null },
      { withdrawal_date: undefined },
    ],
    expiry_date: {
      gte: new Date(), // gte significa 'greater than or equal', es decir, hoy o en el futuro
    },
    status: {
      notIn: ["Concretado", "En Revision", "Rechazado"],
    },
  },
});

const traslados = await prisma.assignment.count({
  where: {
    benefit_id: 5 ,
    OR: [
      { withdrawal_date: null },
      { withdrawal_date: undefined },
    ],
    expiry_date: {
      gte: new Date(), // gte significa 'greater than or equal', es decir, hoy o en el futuro
    },
    status: {
      notIn: ["Concretado", "En Revision", "Rechazado"],
    },
  },
});

const materiales = await prisma.assignment.count({
  where: {
    benefit_id: 6 ,
    OR: [
      { withdrawal_date: null },
      { withdrawal_date: undefined },
    ],
    expiry_date: {
      gte: new Date(), // gte significa 'greater than or equal', es decir, hoy o en el futuro
    },
    status: {
      notIn: ["Concretado", "En Revision", "Rechazado"],
    },
  },
});

const alquiler = await prisma.assignment.count({
  where: {
    benefit_id: 7 ,
    OR: [
      { withdrawal_date: null },
      { withdrawal_date: undefined },
    ],
    expiry_date: {
      gte: new Date(), // gte significa 'greater than or equal', es decir, hoy o en el futuro
    },
    status: {
      notIn: ["Concretado", "En Revision", "Rechazado"],
    },
  },
});

const necesidades = await prisma.assignment.count({
  where: {
    benefit_id: 8 ,
    OR: [
      { withdrawal_date: null },
      { withdrawal_date: undefined },
    ],
    expiry_date: {
      gte: new Date(), // gte significa 'greater than or equal', es decir, hoy o en el futuro
    },
    status: {
      notIn: ["Concretado", "En Revision", "Rechazado"],
    },
  },
});


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
    benefit: {
      category_id: 1,
    },
    OR: [
      { withdrawal_date: null },
      { withdrawal_date: undefined },
    ],
    expiry_date: {
      gte: new Date(), // gte significa 'greater than or equal', es decir, hoy o en el futuro
    },
    status: {
      notIn: ["Concretado", "En Revision", "Rechazado"],
    },
  },
  include: {
    benefit: true,
    recipient: true, // Incluye información del `Recipient` relacionado, si es necesario
  },
  orderBy: {
    expiry_date: 'asc' // Ordenar de vencimientos más cercanos a más lejanos
  },
  take: 4
});

return { luz, gas, consulta, estudio, traslados, materiales, alquiler, necesidades, recientes, proximosVencimientos }

}