"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getLocalities(){
  return prisma.locality.findMany({
    include:{
      Street: true
    }
  })
}
export async function getData() {
  const localities = await prisma.locality.findMany({
    include: {
      Street: true,
    },
  });

  const socialConditions = await prisma.socialCondition.findMany();

  return { localities, socialConditions };
}

export async function createRecipient(formData) {
  const socialConditions = await prisma.socialCondition.findMany();

  const social_conditions = JSON.parse(formData.get("social_conditions") || "[]");
  const socialConditionIds = social_conditions.map(conditionName => {
    const condition = socialConditions.find(cond => cond.name === conditionName);
    return condition ? condition.id : null;
  }).filter(id => id !== null);


  const birthDate = new Date(formData.get("birth_date"));


  await prisma.recipient.create({
    data: {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      dni: parseInt(formData.get("dni")),
      birth_date: birthDate.toISOString(),
      sex: formData.get("sex"),
      enrollment_date: new Date(),
      is_active: true,
      contact_info: {
        create: {
          locality_id: parseInt(formData.get("locality")),
          street_id: parseInt(formData.get("street")),
          street_number: formData.get("street_number"),
          email: formData.get("email"),
          phone: parseInt(formData.get("phone")),
        },
      },
      recipientSocialConditions: {
        create: socialConditionIds.map((conditionId) => ({
          social_condition_id: conditionId,
        })),
      },
    },
  });
  revalidatePath("dashboard/recipients");
}

export async function editRecipient(formData) {
  const id = parseInt(formData.get("id"));
  const firstName = formData.get("first_name");
  const lastName = formData.get("last_name");
  const dni = parseInt(formData.get("dni"));
  const birthDate = formData.get("birth_date");
  const sex = formData.get("sex");
  const locality_id = parseInt(formData.get("locality"));
  const street_id = parseInt(formData.get("street"));
  const street_number = formData.get("street_number");
  const email = formData.get("email");
  const phone = parseInt(formData.get("phone"));
  const selectedSocialConditions = JSON.parse(formData.get("social_conditions") || "[]");

  if (!id) {
    return;
  }

  try {
    // Obtener los IDs de las condiciones sociales seleccionadas
    const socialConditions = await prisma.socialCondition.findMany();
    const socialConditionIds = selectedSocialConditions.map(conditionName => {
      const condition = socialConditions.find(cond => cond.name === conditionName);
      return condition ? condition.id : null;
    }).filter(id => id !== null);

    // Construir el objeto de datos para la actualización del recipient
    const recipientData = {};
    if (firstName) recipientData.first_name = firstName;
    if (lastName) recipientData.last_name = lastName;
    if (dni) recipientData.dni = dni;
    if (birthDate) recipientData.birth_date = new Date(birthDate).toISOString();
    if (sex) recipientData.sex = sex;

    // Construir el objeto de datos para la actualización de contact_info
    const contactInfoData = {};
    if (locality_id) contactInfoData.locality_id = locality_id;
    if (street_id) contactInfoData.street_id = street_id;
    if (street_number) contactInfoData.street_number = street_number;
    if (email) contactInfoData.email = email;
    if (phone) contactInfoData.phone = phone;

    // Transacción para actualizar el recipient y las relaciones sociales
    await prisma.$transaction(async (prisma) => {
      // Actualizar datos del recipient si hay cambios
      if (Object.keys(recipientData).length > 0) {
        await prisma.recipient.update({
          where: { id: id },
          data: recipientData,
        });
      }

      // Actualizar datos de contact_info si hay cambios
      if (Object.keys(contactInfoData).length > 0) {
        await prisma.contactInfo.updateMany({
          where: { recipient_id: id },
          data: contactInfoData,
        });
      }

      // Eliminar relaciones existentes en recipientSocialCondition
      await prisma.recipientSocialCondition.deleteMany({
        where: {
          recipient_id: id,
        },
      });

      // Crear nuevas relaciones
      const createSocialConditionRelations = socialConditionIds.map(conditionId => ({
        recipient_id: id,
        social_condition_id: conditionId,
      }));

      if (createSocialConditionRelations.length > 0) {
        await prisma.recipientSocialCondition.createMany({
          data: createSocialConditionRelations,
        });
      }
    });

    revalidatePath("/dashboard/recipients/");
  } catch (error) {
    console.error('Error updating recipient:', error);
  }
}

export async function desactivatedRecipient(formData) {
    const recipientId = parseInt(formData.get("recipientId"));
  try {
    await prisma.recipient.update({ 
      where: { 
        id: recipientId 
      },
      data:{
        is_active: false
      }

    });
    console.log(`Recipient with ID ${recipientId} desactivado correctamente.`);
    // Optionally return something meaningful after deletion
    redirect("/dashboard/recipients/");
  } catch (error) {
    console.error(`Error al desactivr recipient with ID ${recipientId}:`, error);
    throw error; // Propagate the error to handle it in the UI or caller
  }
}

export async function activatedRecipient(formData) {
    const recipientId = parseInt(formData.get("recipientId"));
  try {
    await prisma.recipient.update({ 
      where: { 
        id: recipientId 
      },
      data:{
        is_active: true
      }

    });
    console.log(`Recipient with ID ${recipientId} desactivado correctamente.`);
    // Optionally return something meaningful after deletion
    redirect("/dashboard/recipients/");
  } catch (error) {
    console.error(`Error al desactivr recipient with ID ${recipientId}:`, error);
    throw error; // Propagate the error to handle it in the UI or caller
  }
}

// export async function GetRecicpients(){
//   const [recipients, localities, recipientSocialConditions, socialConditions] = await Promise.all([
//     prisma.recipient.findMany({
//       where: {
//         is_active: true
//       },
//       include: {
//         contact_info: {
//           include: {
//             street: true,
//             locality: true
//           }
//         }
//       }
//     }),
//     prisma.locality.findMany({
//       include: { Street: true }
//     }),
//     prisma.recipientSocialCondition.findMany({
//       include: { 
//         social_condition: true, 
//         recipient: true 
//       }
//     }),
//     prisma.socialCondition.findMany(),
//     // prisma.benefits.findMany()
//   ]);

//   const result = {
//     recipients,
//     localities,
//     recipientSocialConditions,
//     socialConditions,
//     // benefits
//   };
// }

// export async function createRecipient(formData) {
//   const socialConditions = await prisma.socialCondition.findMany();

//   const social_conditions = JSON.parse(formData.get("social_conditions"));
//   const socialConditionIds = social_conditions.map(conditionName => {
//     const condition = socialConditions.find(cond => cond.name === conditionName);
//     return condition ? condition.id : null;
//   }).filter(id => id !== null);

//   await prisma.recipient.create({
//     data: {
//       first_name: formData.get("first_name"),
//       last_name: formData.get("last_name"),
//       dni: parseInt(formData.get("dni")),
//       birth_date: new Date(formData.get("birth_date")),
//       sex: formData.get("sex"),
//       enrollment_date: new Date(),
//       is_active: true,
//       contact_info: {
//         create: {
//           locality_id: parseInt(formData.get("locality")),
//           street_id: parseInt(formData.get("street")),
//           street_number: formData.get("street_number"),
//           email: formData.get("email"),
//           phone: parseInt(formData.get("phone")),
//         },
//       },
//       recipientSocialConditions: {
//         create: socialConditionIds.map((conditionId) => ({
//           social_condition_id: conditionId,
//         })),
//       },
//     },
//   });
//   revalidatePath("dashboard/recipients/prueba");
// }
