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

  if (!id || !firstName || !lastName || !locality_id || !street_id || !street_number || !email || !phone) {
    return;
  }

  try {
    // Obtener los IDs de las condiciones sociales seleccionadas
    const socialConditions = await prisma.socialCondition.findMany();
    const socialConditionIds = selectedSocialConditions.map(conditionName => {
      const condition = socialConditions.find(cond => cond.name === conditionName);
      return condition ? condition.id : null;
    }).filter(id => id !== null);

    // Transacción para actualizar el recipient y las relaciones sociales
    await prisma.$transaction(async (prisma) => {
      // Actualizar datos del recipient
      await prisma.recipient.update({
        where: { id: id },
        data: {
          first_name: firstName,
          last_name: lastName,
          dni: dni,
          birth_date: new Date(birthDate).toISOString(),
          sex: sex,
          contact_info: {
            update: {
              where: { id: id },
              data: {
                street_id: street_id,
                locality_id: locality_id,
                street_number: street_number,
                email: email,
                phone: phone,
              },
            },
          },
        },
      });

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

// export async function editRecipient(formData) {
//   const id = parseInt(formData.get("id"));
//   const firstName = formData.get("first_name");
//   const lastName = formData.get("last_name");
//   const dni = parseInt(formData.get("dni"));
//   const birthDate = formData.get("birth_date");
//   const sex = formData.get("sex");
//   const locality_id = parseInt(formData.get("locality"));
//   const street_id = parseInt(formData.get("street"));
//   const street_number = formData.get("street_number");
//   const email = formData.get("email");
//   const phone = parseInt(formData.get("phone"));
//   const selectedSocialConditions = JSON.parse(formData.get("social_conditions") || "[]");

//   // if (!id || !firstName || !lastName || !locality_id || !street_id || !street_number || !email || !phone) {
//   //   return;
//   // }

//   try {
//     // Actualizar datos del recipient
//     // await prisma.recipient.update({
//     //   where: { id: id },
//     //   data: {
//     //     first_name: firstName,
//     //     last_name: lastName,
//     //     dni: dni,
//     //     birth_date: new Date(birthDate).toISOString(),
//     //     sex: sex,
//     //     contact_info: {
//     //       update: {
//     //         where: { id: id },
//     //         data: {
//     //           street_id: street_id,
//     //           locality_id: locality_id,
//     //           street_number: street_number,
//     //           email: email,
//     //           phone: phone,
//     //         },
//     //       },
//     //     },
//     //   },
//     // });

//     // Obtener los IDs de las condiciones sociales seleccionadas
//     const socialConditions = await prisma.socialCondition.findMany();
//     const socialConditionIds = selectedSocialConditions.map(conditionName => {
//       const condition = socialConditions.find(cond => cond.name === conditionName);
//       return condition ? condition.id : null;
//     }).filter(id => id !== null);

//     // Eliminar relaciones existentes en recipientSocialCondition
//     await prisma.recipientSocialCondition.deleteMany({
//       where: {
//         recipient_id: id,
//       },
//     });

//     // Crear nuevas relaciones
//     const createSocialConditionRelations = socialConditionIds.map(conditionId => ({
//       recipient_id: id,
//       social_condition_id: conditionId,
//     }));

//     if (createSocialConditionRelations.length > 0) {
//       await prisma.recipientSocialCondition.createMany({
//         data: createSocialConditionRelations,
//       });
//     }

//     revalidatePath("/dashboard/recipients/");
//   } catch (error) {
//     console.error('Error updating recipient:', error);
//   }
// }

// --simple
// export async function editRecipient(formData) {
//   const id = parseInt(formData.get("id"));
//   const firstName = formData.get("first_name");
//   const lastName = formData.get("last_name");
//   const dni = parseInt(formData.get("dni"));
//   const birthDate = formData.get("birth_date");
//   const sex = formData.get("sex");
//   const locality_id = parseInt(formData.get("locality"));
//   const street_id = parseInt(formData.get("street"));
//   const street_number = formData.get("street_number");
//   const email = formData.get("email");
//   const phone = parseInt(formData.get("phone"));

//   if (!id || !firstName || !lastName || !locality_id || !street_id || !street_number || !email || !phone) {
//     return;
//   }

//   try {
//     await prisma.recipient.update({
//       where: { 
//         id: id
//       },
//       data: {
//         first_name: firstName,
//         last_name: lastName,
//         dni: dni,
//         birth_date: new Date(birthDate).toISOString(),
//         sex: sex,
//         contact_info: {
//           update: {
//             where: {
//               id: id,
//             },
//             data: {
//               street_id: street_id,
//               locality_id: locality_id,
//               street_number: street_number,
//               email: email,
//               phone: phone,
//             },
//           },
//         },
//       },
//     });

//     revalidatePath("/dashboard/recipients/");
//   } catch (error) {
//     console.error('Error updating recipient:', error);
//   }
// }


// export async function DeleteRecipient(formData){
//   const recipientId = parseInt(formData.get("recipientId"));
//   if(!recipientId){
//     return;
//   }
//   await prisma.recipient.delete({ where: {id: recipientId} });
//   console.log(recipientId)
//   // redirect("/dashboard/recipients/");
// }

export async function deleteRecipient(formData) {
    const recipientId = parseInt(formData.get("recipientId"));
  try {
    await prisma.recipient.delete({ where: { id: recipientId } });
    console.log(`Recipient with ID ${recipientId} deleted successfully.`);
    // Optionally return something meaningful after deletion
  } catch (error) {
    console.error(`Error deleting recipient with ID ${recipientId}:`, error);
    throw error; // Propagate the error to handle it in the UI or caller
  }
}