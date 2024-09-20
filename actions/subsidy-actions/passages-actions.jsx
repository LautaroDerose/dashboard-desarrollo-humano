"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAssignmentWithTravelSubsidy(formData) {
  const enrollmentDate = new Date();
  let totalAmount = 0;
  let totalQuantity = 0;

  // Crear el Assignment
  const newAssignment = await prisma.assignment.create({
    data: {
      recipient_id: parseInt(formData.get("recipient_id")),
      benefit_id: 13,
      enrollment_date: enrollmentDate.toISOString(),
    },
  });

  const travelSubsidyData = {
    assignment_id: newAssignment.id,
    is_complete: false,
    // Campos iniciales en null para llenar más adelante
    destination1: null,
    date1: null,
    passenger_type1: null,
    name1: null,
    dni1: null,
    amount1: null,
    provider1: null,
    destination2: null,
    date2: null,
    passenger_type2: null,
    name2: null,
    dni2: null,
    amount2: null,
    provider2: null,
    destination3: null,
    date3: null,
    passenger_type3: null,
    name3: null,
    dni3: null,
    amount3: null,
    provider3: null,
    destination4: null,
    date4: null,
    passenger_type4: null,
    name4: null,
    dni4: null,
    amount4: null,
    provider4: null,
  };

  for (let i = 1; i <= 4; i++) {
    const destination = formData.get(`destination${i}`);
    const date = formData.get(`date${i}`);
    const passengerType = formData.get(`passenger_type${i}`);
    const name = formData.get(`name${i}`);
    const dni = formData.get(`dni${i}`);
    const amount = formData.get(`amount${i}`);
    const provider = formData.get(`provider${i}`);

    if (destination && date && passengerType && name && dni && amount && provider) {
      // Solo actualiza los campos correspondientes al sufijo `i` si todos los campos están completos
      travelSubsidyData[`destination${i}`] = destination;
      travelSubsidyData[`date${i}`] = new Date(date);
      travelSubsidyData[`passenger_type${i}`] = passengerType;
      travelSubsidyData[`name${i}`] = name;
      travelSubsidyData[`dni${i}`] = parseInt(dni);
      travelSubsidyData[`amount${i}`] = parseFloat(amount);
      travelSubsidyData[`provider${i}`] = provider;

      totalAmount += parseFloat(amount);
      totalQuantity += 1;
    }
  }

  // Crear el TravelSubsidy con los datos recopilados
  await prisma.travelSubsidy.create({
    data: travelSubsidyData,
  });

  // Actualizar el Assignment con la suma y cantidad de subsidios creados
  await prisma.assignment.update({
    where: { id: newAssignment.id },
    data: {
      amount: totalAmount,
      quantity: totalQuantity,
    },
  });

  revalidatePath("/");
}
// "use server";

// import prisma from "@/lib/prisma";
// import { revalidatePath } from "next/cache";

// export async function createAssignmentWithTravelSubsidy(formData) {
//   const enrollmentDate = new Date(formData.get("enrollment_date"));
//   const expiryDate = new Date(formData.get("expiry_date"));

//   // Crear el Assignment
//   const newAssignment = await prisma.assignment.create({
//     data: {
//       recipient_id: parseInt(formData.get("recipient_id")),
//       benefit_id: 13,
//       // amount: parseInt(formData.get("amount")),
//       // quantity: parseInt(formData.get("quantity")),
//       enrollment_date: enrollmentDate.toISOString(),
//       // expiry_date: expiryDate.toISOString(),
//       // status: formData.get("status"),
//       // detail_benefit: formData.get("detail"),
//     },
//   });

  

//   // Crear el TravelSubsidy
//   const newTravelSubsidy = await prisma.travelSubsidy.create({
//     data: {
//       assignment_id: newAssignment.id,
//       destination1: formData.get("destination1") || null,
//       date1: formData.get("date1") ? new Date(formData.get("date1")) : null,
//       passenger_type1: formData.get("passenger_type1") || null,
//       name1: formData.get("name1") || null,
//       dni1: formData.get("dni1") ? parseInt(formData.get("dni1")) : null,
//       amount1: formData.get("amount1") ? parseFloat(formData.get("amount1")) : null,
//       provider1: formData.get("provider1") || null,
//       destination2: formData.get("destination2") || null,
//       date2: formData.get("date2") ? new Date(formData.get("date2")) : null,
//       passenger_type2: formData.get("passenger_type2") || null,
//       name2: formData.get("name2") || null,
//       dni2: formData.get("dni2") ? parseInt(formData.get("dni2")) : null,
//       amount2: formData.get("amount2") ? parseFloat(formData.get("amount2")) : null,
//       provider2: formData.get("provider2") || null,
//       destination3: formData.get("destination3") || null,
//       date3: formData.get("date3") ? new Date(formData.get("date3")) : null,
//       passenger_type3: formData.get("passenger_type3") || null,
//       name3: formData.get("name3") || null,
//       dni3: formData.get("dni3") ? parseInt(formData.get("dni3")) : null,
//       amount3: formData.get("amount3") ? parseFloat(formData.get("amount3")) : null,
//       provider3: formData.get("provider3") || null,
//       destination4: formData.get("destination4") || null,
//       date4: formData.get("date4") ? new Date(formData.get("date4")) : null,
//       passenger_type4: formData.get("passenger_type4") || null,
//       name4: formData.get("name4") || null,
//       dni4: formData.get("dni4") ? parseInt(formData.get("dni4")) : null,
//       amount4: formData.get("amount4") ? parseFloat(formData.get("amount4")) : null,
//       provider4: formData.get("provider4") || null,
//     },
//   });

//   revalidatePath("/");
// }