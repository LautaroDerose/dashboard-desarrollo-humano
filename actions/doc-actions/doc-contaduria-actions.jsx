"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Función para confirmar un documento de tipo DECREE_DOC
export async function confirmDecreeDoc(docId, isConfirmed) {
  const updatedDoc = await prisma.doc.updateMany({
    where: { 
      assignment_id: docId,
      doc_type: "DECREE_DOC"
    },
    data: {
      is_confirm: !isConfirmed,
      confirmed_at: isConfirmed ? null : new Date(),
    },
  });
}

// Función para crear los documentos EXPENSE_DOC y PAYMENT_RECEIPT_DOC
export async function createExpenseAndPaymentDocs(formData) {
  const assignmentId = parseInt(formData.get("assignmentId"));
  const expenseDocNumber = formData.get("expense_doc_number");
  // const receiptDocNumber = formData.get("receipt_doc_number");

  // Verificar si ya existen documentos de tipo EXPENSE_DOC o PAYMENT_RECEIPT_DOC asociados a esta asignación
  const existingDocs = await prisma.doc.findMany({
    where: {
      assignment_id: assignmentId,
      doc_type: {
        in: ["EXPENSE_DOC"]
        // in: ["EXPENSE_DOC", "PAYMENT_RECEIPT_DOC"]
      }
    },
    select: { id: true, doc_type: true },
  });

  if (existingDocs.some(doc => doc.doc_type === "EXPENSE_DOC")) {
    throw new Error("El documento de gasto ya ha sido creado para esta asignación.");
  }

  // if (existingDocs.some(doc => doc.doc_type === "PAYMENT_RECEIPT_DOC")) {
  //   throw new Error("El recibo de pago ya ha sido creado para esta asignación.");
  // }

  // Crear el documento EXPENSE_DOC
  const expenseDoc = await prisma.doc.create({
    data: {
      doc_type: "EXPENSE_DOC",
      doc_number: expenseDocNumber,
      doc_created_at: new Date(),
      assignment: {
        connect: { id: assignmentId },
      },
      subsidy_stage: {
        connect: { assignment_id: assignmentId }, // Asocia con subsidy_stage
      },
    },
  });
  
  // Crear el documento PAYMENT_RECEIPT_DOC
  // const receiptDoc = await prisma.doc.create({
  //   data: {
  //     doc_type: "PAYMENT_RECEIPT_DOC",
  //     doc_number: receiptDocNumber,
  //     doc_created_at: new Date(),
  //     assignment: {
  //       connect: { id: assignmentId },
  //     },
  //     subsidy_stage: {
  //       connect: { assignment_id: assignmentId }, // Asocia con subsidy_stage
  //     },
  //   },
  // });

  // Actualizar subsidyStage con los IDs de los documentos creados
  await prisma.subsidyStage.update({
    where: { assignment_id: assignmentId },
    data: {
      expense_doc_id: expenseDoc.id, // Asigna el ID del documento EXPENSE_DOC
      // payment_doc_id: receiptDoc.id, // Asigna el ID del documento PAYMENT_RECEIPT_DOC
    },
  });

  // Redirigir a la página correspondiente después de la creación de los documentos
  redirect("/contaduria");
}
