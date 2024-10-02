"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// -----------------------   ACTIONS AUXIULIARES   --------------------------------
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

// -----------------------   CRUD   --------------------------------

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
}export async function editRecipient(formData) {
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

  if (!id) return;

  const socialConditions = await prisma.socialCondition.findMany();
  const socialConditionIds = selectedSocialConditions.map(conditionName => {
    const condition = socialConditions.find(cond => cond.name === conditionName);
    return condition ? condition.id : null;
  }).filter(id => id !== null);

  await prisma.recipient.update({
    where: { id },
    data: {
      first_name: firstName,
      last_name: lastName,
      dni,
      birth_date: birthDate ? new Date(birthDate).toISOString() : null,
      sex,
      contact_info: {
        update: {
          locality: locality_id ? { connect: { id: locality_id } } : undefined,  // Correctly connect locality
          street: street_id ? { connect: { id: street_id } } : undefined,  // Correctly connect street
          street_number,
          email,
          phone,
        },
      },
      recipientSocialConditions: {
        deleteMany: {}, // Clear existing social conditions
        create: socialConditionIds.map((conditionId) => ({
          social_condition_id: conditionId,
        })),
      },
    },
  });

  revalidatePath("/dashboard/recipients");
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
// -----------------------   RECIPIENT DETAIL   --------------------------------

export async function getRecipientDetails(id) {
  try {
    const today = new Date().toISOString();
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
    const startOfYear = new Date(new Date().getFullYear(), 0, 1).toISOString();
    
    // Obtener el beneficiario para usar su `family_group_id`
    const recipient = await prisma.recipient.findUnique({
      where: { id },
      select: { family_group_id: true }
    });

    if (!recipient) {
      throw new Error('Recipient not found');
    }

    // Cantidad de asignaciones del último mes y año
    const assignmentsLastMonth = await prisma.assignment.count({
      where: {
        recipient_id: id,
        enrollment_date: { gte: startOfMonth, lte: today },
      },
    });

    const assignmentsLastYear = await prisma.assignment.count({
      where: {
        recipient_id: id,
        enrollment_date: { gte: startOfYear, lte: today },
      },
    });

    const assignmentsByBenefit = await prisma.assignment.groupBy({
      by: ['benefit_id'],
      where: {
        recipient_id: id,
        enrollment_date: {
          gte: startOfMonth, // Solo asignaciones desde el comienzo del mes
          lte: today,        // Hasta la fecha actual
        },
      },
      _count: {
        _all: true,
      },
    });
    
    const benefitIds = assignmentsByBenefit.map(item => item.benefit_id);
    
    const benefitNames = await prisma.benefit.findMany({
      where: {
        id: {
          in: benefitIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
    
    const assignmentsWithBenefitNames = assignmentsByBenefit.map(assignment => {
      const benefit = benefitNames.find(b => b.id === assignment.benefit_id);
      return {
        ...assignment,
        benefitName: benefit ? benefit.name : 'Beneficio Desconocido',
      };
    });

    // Recipients asociados al family_group_id
    const familyGroup = await prisma.recipient.findMany({
      where: { family_group_id: recipient.family_group_id },
      include: { Assignment: true },
    });

    // Observaciones relacionadas al recipient
    const observations = await prisma.observation.findMany({
      where: { recipient_id: id },
      include: { assignment: true },
    });

    // return { assignmentsLastMonth, assignmentsLastYear, familyGroup, observations };
    return { assignmentsLastMonth, assignmentsLastYear, assignmentsByBenefit, assignmentsWithBenefitNames, familyGroup, observations };
  } catch (error) {
    console.error('Error fetching recipient details:', error);
    throw new Error('Failed to load recipient details');
  }
}
// -----------------------   ID GRUPO FAMILIAR   --------------------------------

export async function getFamilyData() {
  const recipients = await prisma.recipient.findMany({
    where: {
      is_active: true,
      family_group_id: null
    },
    include:{
      contact_info:{
        include:{
          street: true,
          locality:true
        }
      }
    }
  });
  
  const recipientsWithFamilyId = await prisma.recipient.findMany({
    where: {
      is_active: true,
      family_group_id:{ not: null},
    },
    include:{
      contact_info:{
        include:{
          street: true,
          locality:true
        }
      }
    },
    orderBy: {
      family_group_id: 'asc', // Ordena por family_group_id de forma ascendente
    },
  });

  return { recipients, recipientsWithFamilyId };
}

export async function createFamilyGroup(formData) {
  // Obtener los destinatarios seleccionados desde el formulario
  const selectedRecipients = JSON.parse(formData.get("selected_recipients") || "[]");

  // Crear un nuevo grupo familiar
  const newFamilyGroup = await prisma.familyGroup.create({
    data: {}, // Puedes agregar más datos si los tienes
  });

  // Actualizar los destinatarios seleccionados con el ID del nuevo grupo familiar
  await prisma.recipient.updateMany({
    where: {
      id: {
        in: selectedRecipients,
      },
    },
    data: {
      family_group_id: newFamilyGroup.id,
    },
  });
  revalidatePath('/dashboard/recipients/grupo-familiar/crear');
  return { newFamilyGroup };
}

// export async function updateFamilyGroup(formData) {
//   const selectedRecipients = JSON.parse(formData.get("selected_recipients") || "[]");
//   const familyGroupId = parseInt(formData.get("family_group_id"), 10);

//   if (!familyGroupId) {
//     throw new Error("No se seleccionó un grupo familiar existente.");
//   }

//   if (selectedRecipients.length === 0) {
//     throw new Error("No se seleccionaron destinatarios.");
//   }

//   // Verificar si el family_group_id existe
//   const familyGroupExists = await prisma.familyGroup.findUnique({
//     where: { id: familyGroupId },
//   });

//   if (!familyGroupExists) {
//     throw new Error(`El grupo familiar con ID ${familyGroupId} no existe.`);
//   }

//   // Actualizar los destinatarios seleccionados con el ID del grupo familiar
//   await prisma.recipient.updateMany({
//     where: {
//       id: {
//         in: selectedRecipients,
//       },
//     },
//     data: {
//       family_group_id: familyGroupId,
//     },
//   });

//   return { message: "Destinatarios agregados al grupo familiar." };
// }


export async function updateFamilyGroup(formData) {
  const selectedRecipients = JSON.parse(formData.get("selected_recipients") || "[]");
  const familyGroupId = parseInt(formData.get("family_group_id"), 10);

  if (!familyGroupId) {
    throw new Error("No se seleccionó un grupo familiar existente.");
  }

  if (selectedRecipients.length === 0) {
    throw new Error("No se seleccionaron destinatarios.");
  }

  const familyGroupExists = await prisma.familyGroup.findUnique({
    where: { id: familyGroupId },
  });

  if (!familyGroupExists) {
    throw new Error(`El grupo familiar con ID ${familyGroupId} no existe.`);
  }

  await prisma.recipient.updateMany({
    where: {
      id: {
        in: selectedRecipients,
      },
    },
    data: {
      family_group_id: familyGroupId,
    },
  });

  // Revalida la ruta actual
  revalidatePath('/dashboard/recipients/grupo-familiar');

  return { message: "Destinatarios agregados al grupo familiar." };
}

// -----------------------   STATUS CARDS   --------------------------------

export async function getRecipientStats() {
  try {
    const today = new Date();
    const eighteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 18));
    // const twentyFiveYearsAgo = new Date(today.setFullYear(today.getFullYear() - 25));
    const thirtyFiveYearsAgo = new Date(today.setFullYear(today.getFullYear() - 35));
    const fiftyYearsAgo = new Date(today.setFullYear(today.getFullYear() - 50));
    const sixtyYearsAgo = new Date(today.setFullYear(today.getFullYear() - 60));

    // Contador por edades
    const menoresDe18 = await prisma.recipient.count({
      where: { birth_date: { gt: eighteenYearsAgo } },
    });
    // const entre18Y25 = await prisma.recipient.count({
    //   where: { birth_date: { lte: eighteenYearsAgo, gt: twentyFiveYearsAgo } },
    // });
    const entre18Y35 = await prisma.recipient.count({
      where: { birth_date: { lte: eighteenYearsAgo, gt: thirtyFiveYearsAgo } },
    });
    // const entre26Y35 = await prisma.recipient.count({
    //   where: { birth_date: { lte: twentyFiveYearsAgo, gt: thirtyFiveYearsAgo } },
    // });
    const entre36Y50 = await prisma.recipient.count({
      where: { birth_date: { lte: thirtyFiveYearsAgo, gt: fiftyYearsAgo } },
    });
    const entre50Y60 = await prisma.recipient.count({
      where: { birth_date: { lte: fiftyYearsAgo, gt: sixtyYearsAgo } },
    });
    const mayoresDe60 = await prisma.recipient.count({
      where: { birth_date: { lte: sixtyYearsAgo } },
    });

    // Contador por sexo
    const masculino = await prisma.recipient.count({
      where: {
        OR: [
          { sex: "Masculino" },
          { sex: "Male" },
        ],
      },
    });
    
    const femenino = await prisma.recipient.count({
      where: {
        OR: [
          { sex: "Femenino" },
          { sex: "Female" },
        ],
      },
    });

    const recipientsByLocalities = await prisma.contactInfo.findMany({
      select: {
        locality_id: true,
      },
    });
    
    // Contar cuántos recipients hay por cada `locality_id` usando `reduce`
    const localityCounts = recipientsByLocalities.reduce((acc, item) => {
      acc[item.locality_id] = (acc[item.locality_id] || 0) + 1;
      return acc;
    }, {});
    
    const localityIds = Object.keys(localityCounts).map(Number); // Obtener los IDs de las localidades
    
    // Obtener los nombres de las localidades relacionadas con esos IDs
    const localityNames = await prisma.locality.findMany({
      where: {
        id: {
          in: localityIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
    
    // Mapear los nombres de las localidades con los resultados de conteo
    const recipientsWithLocalitiesNames = localityNames.map(locality => ({
      localityId: locality.id,
      localityName: locality.name,
      count: localityCounts[locality.id] || 0, // Contador por localidad
    }));

    return {
      menoresDe18,
      entre18Y35,
      // entre18Y25,
      // entre26Y35,
      entre36Y50,
      entre50Y60,
      mayoresDe60,
      masculino,
      femenino,
      recipientsWithLocalitiesNames
    };
  } catch (error) {
    console.error('Error fetching recipient stats:', error);
    throw new Error('Failed to load recipient stats');
  }
}
