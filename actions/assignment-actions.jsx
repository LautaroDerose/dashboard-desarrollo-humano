"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

import { revalidatePath } from "next/cache";

export async function getInfoCards() {
  try {
    // Obtener el año actual
    const currentYear = new Date().getFullYear();
    const today = new Date().toISOString();
    const startOfYear = new Date(`${currentYear - 1}-01-01`).toISOString();
    const endOfYear = new Date(`${currentYear}-01-01`).toISOString();

    const rechazados = await prisma.assignment.count({
      where: {
        //  status: "Rechazado",
        enrollment_date: { gte: startOfYear, lt: endOfYear },
      },
    });

    const enProceso = await prisma.assignment.count({
      where: {
        //  status: "En Proceso",
        enrollment_date: { gte: startOfYear, lt: endOfYear },
      },
    });

    const pendientes = await prisma.assignment.count({
      where: {
        //  status: "Pendiente",
        enrollment_date: { gte: startOfYear, lt: endOfYear },
      },
    });

    const concretados = await prisma.assignment.count({
      where: {
        //  status: "Concretado",
        enrollment_date: { gte: startOfYear, lt: endOfYear },
      },
    });

    const enRevision = await prisma.assignment.count({
      where: {
        //  status: "En Revision",
        enrollment_date: { gte: startOfYear, lt: endOfYear },
      },
    });

    const recientes = await prisma.assignment.findMany({
      where: { enrollment_date: { lte: today } },
      orderBy: { enrollment_date: 'desc' },
      include: { benefit: true, recipient: true },
      take: 3,
    });

    const proximosVencimientos = await prisma.assignment.findMany({
      where: { expiry_date: { gte: today } },
      orderBy: { expiry_date: 'asc' },
      include: { benefit: true, recipient: true },
      take: 4,
    });

    return { rechazados, enProceso, pendientes, concretados, enRevision, recientes, proximosVencimientos };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to load assignment data');
  }
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
      // res.status(200).json(assignment);
    } else {
      res.status(404).json({ error: "Assignment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching assignment: " + error.message });
  }
}

// subsidios-actions
export async function createSubsidyAssignment(formData) {
  const enrollmentDate = new Date(formData.get("enrollment_date"));
  const expiryDate = new Date(formData.get("expiry_date"));

  // Crear el Assignment
  const newAssignment = await prisma.assignment.create({
    data: {
      recipient_id: parseInt(formData.get("recipient")),
      benefit_id: parseInt(formData.get("benefit")),
      amount: parseInt(formData.get("amount")),
      quantity: parseInt(formData.get("quantity")),
      enrollment_date: enrollmentDate.toISOString(),
      expiry_date: expiryDate.toISOString(),
      // status: formData.get("status"),
      detail_benefit: formData.get("detail"),
    },
  });

  // Crear el Doc con referencia a Assignment
  const newDoc = await prisma.doc.create({
    data: {
      doc_type: 'NOTE_DOC',
      doc_number: formData.get("doc_number"),
      doc_created_at: new Date(),
      assignment_id: newAssignment.id, // Relacionar con el assignment
    },
  });

  // Crear el SubsidyStage
  const newSubsidyStage = await prisma.subsidyStage.create({
    data: {
      assignment_id: newAssignment.id,
      note_doc_id: newDoc.id,
      created_at: new Date(),
    },
  });

  // Actualizar el Doc con el subsidy_stage_id
  await prisma.doc.update({
    where: { id: newDoc.id },
    data: { subsidy_stage_id: newSubsidyStage.id },
  });

  revalidatePath("/");
}
