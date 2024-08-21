"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client"; // Importa las clases de error
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function confirmDoc(docId, isConfirmed) {
  const updatedDoc = await prisma.doc.updateMany({
    where: { 
      assignment_id: docId,
      doc_type: "NOTE_DOC"
    },
    data: {
      is_confirm: !isConfirmed,
      confirmed_at: isConfirmed ? null : new Date(),
    },
  });
}
  // try {
  //   const updatedDoc = await prisma.doc.update({
  //     where: { id: docId },
  //     data: {
  //       is_confirm: true,
  //       confirmed_at: new Date(),
  //     },
  //   });
  //   return updatedDoc;
  // } catch (error) {
  //   console.error('Error updating document:', error);
  //   if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //     console.error('Prisma known request error:', error.message, error.meta);
  //   } else if (error instanceof Prisma.PrismaClientValidationError) {
  //     console.error('Prisma validation error:', error.message);
  //   } else {
  //     console.error('Unknown error:', error.message);
  //   }
  //   throw new Error('Could not update document');
  // }
// }

export async function createDecreeDoc(formData) {
  const assignmentId = parseInt(formData.get("assignmentId"));
  const docNumber = formData.get("doc_number");

  // Verificar si ya existe un decreto asociado a esta asignación
  const existingDecree = await prisma.subsidyStage.findUnique({
    where: { assignment_id: assignmentId },
    select: { decree_doc_id: true },
  });

  if (existingDecree?.decree_doc_id) {
    throw new Error("El decreto ya ha sido creado para esta asignación.");
  }

  // Crear el documento de decreto y asociarlo con subsidy_stage
  const newDoc = await prisma.doc.create({
    data: {
      doc_type: "DECREE_DOC",
      doc_number: docNumber,
      doc_created_at: new Date(),
      assignment: {
        connect: { id: assignmentId },
      },
      subsidy_stage: {
        connect: { assignment_id: assignmentId }, // Asocia con subsidy_stage
      },
    },
  });

  // Actualizar el subsidy_stage con el ID del nuevo documento de decreto
  await prisma.subsidyStage.update({
    where: { assignment_id: assignmentId },
    data: {
      decree_doc_id: newDoc.id, // Asigna el ID del documento creado
    },
  });
  redirect("/subsecretaria");
}


// prueba

// "use server";

// import prisma from "@/lib/prisma";
// import { redirect } from "next/navigation";

// export async function createDecreeDoc(formData) {
//   const assignmentId = parseInt(formData.get("assignmentId"));
//   const docNumber = formData.get("doc_number");

//   // Verificar si ya existe un decreto asociado a esta asignación
//   const existingDecree = await prisma.subsidyStage.findUnique({
//     where: { assignment_id: assignmentId },
//     select: { decree_doc_id: true },
//   });

//   if (existingDecree?.decree_doc_id) {
//     throw new Error("El decreto ya ha sido creado para esta asignación.");
//   }

//   // Crear el documento de decreto y asociarlo con subsidy_stage
//   const newDoc = await prisma.doc.create({
//     data: {
//       doc_type: "DECREE_DOC",
//       doc_number: docNumber,
//       doc_created_at: new Date(),
//       assignment: {
//         connect: { id: assignmentId },
//       },
//       subsidy_stage: {
//         connect: { assignment_id: assignmentId }, // Asocia con subsidy_stage
//       },
//     },
//   });

//   // Actualizar el subsidy_stage con el ID del nuevo documento de decreto
//   await prisma.subsidyStage.update({
//     where: { assignment_id: assignmentId },
//     data: {
//       decree_doc_id: newDoc.id, // Asigna el ID del documento creado
//     },
//   });
//   redirect("/subsecretaria");
// }

// export async function updateNoteDocStatus(formData) {
//   const { id, isConfirm } = Object.fromEntries(formData);

//   try {
//     // Actualizar el estado del documento de nota
//     await prisma.noteDoc.update({
//       where: { id: id },
//       data: { is_confirm: isConfirm },
//     });

//     // Opcional: redirigir o revalidar la ruta después de la actualización
//     redirect("/subsecretaria");
//   } catch (error) {
//     throw new Error("No se pudo actualizar el estado del documento de nota.");
//   }
// }