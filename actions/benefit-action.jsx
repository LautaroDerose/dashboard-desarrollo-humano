"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// export async function getBenefitCategories() {
//   const categories = await prisma.BenefitCategory.findMany();
//   return categories;
// }

export async function createBenefit(formData) {
  console.log(formData)
  await prisma.benefit.create({
    data: {
      category_id: parseInt(formData.get("category_id")),
      name: formData.get("name"),
    },
  });
  
  revalidatePath("dashboard/benefits");
}

export async function editBenefit(formData) {
 
  console.log(formData)
  await prisma.benefit.edit({
    data: {
      category_id: parseInt(formData.get("category_id")),
      name: formData.get("name"),
    },
  });
  
  revalidatePath("dashboard/benefits");
}

export async function desactivatedBenefit(formData){
  const benefitId = parseInt(formData.get("benefitId"));
  try {
    await prisma.benefit.update({ 
      where: { 
        id: benefitId 
      },
      data:{
        is_active: false
      }

    });
    console.log(`Beneficio con ID ${benefitId} desactivado correctamente.`);

    revalidatePath("dashboard/benefits");
  } catch (error) {
    console.error(`Error al desactivar beneficio con ID ${benefitId}:`, error);
    throw error;
  }
}

export async function activatedBenefit(formData){
  const benefitId = parseInt(formData.get("benefitId"));
  try {
    await prisma.benefit.update({ 
      where: { 
        id: benefitId 
      },
      data:{
        is_active: true
      }

    });
    console.log(`Beneficio con ID ${benefitId} desactivado correctamente.`);
    revalidatePath("dashboard/benefits");
  } catch (error) {
    console.error(`Error al desactivar beneficio con ID ${benefitId}:`, error);
    throw error;
  }
}

// export async function deleteBenefit(formData) {
//   const benefitId = parseInt(formData.get("benefitId"));
//   try {
//     await prisma.benefit.delete({ where: { id: benefitId } });
//     console.log(`Recipient with ID ${benefitId} deleted successfully.`);
//     // Optionally return something meaningful after deletion
//   } catch (error) {
//     console.error(`Error deleting recipient with ID ${benefitId}:`, error);
//     throw error; // Propagate the error to handle it in the UI or caller
//   }
//   revalidatePath("dashboard/benefits");
// }

