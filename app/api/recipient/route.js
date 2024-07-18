import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [recipients, localities, recipientSocialConditions, socialConditions] = await Promise.all([
      prisma.recipient.findMany({
        where: {
          is_active: true
        },
        include: {
          contact_info: {
            include: {
              street: true,
              locality: true
            }
          }
        }
      }),
      prisma.locality.findMany({
        include: { Street: true }
      }),
      prisma.recipientSocialCondition.findMany({
        include: { 
          social_condition: true, 
          recipient: true 
        }
      }),
      prisma.socialCondition.findMany(),
      // prisma.benefits.findMany()
    ]);

    const result = {
      recipients,
      localities,
      recipientSocialConditions,
      socialConditions,
      // benefits
    };
    // console.log("API Result:", result); // Verificar los datos aquí

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response("Error fetching data: " + error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();

    // Crear un nuevo recipient
    const newRecipient = await prisma.recipient.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        birth_date: new Date(data.birth_date),
        dni: parseInt(data.dni, 10),
        sex: data.sex,
        enrollment_date: new Date(),
        is_active: true,
      },
    });

    // Crear la información de contacto para el nuevo recipient
    const newContactInfo = await prisma.contactInfo.create({
      data: {
        recipient_id: newRecipient.id,
        phone: parseInt(data.phone, 10),
        email: data.email,
        street_id: data.street_id,
        street_number: data.street_number,
        locality_id: data.locality_id,
      },
    });

    // Crear las condiciones sociales para el nuevo recipient
    const socialConditionsPromises = data.social_conditions.map(conditionId => {
      return prisma.recipientSocialCondition.create({
        data: {
          recipient_id: newRecipient.id,
          social_condition_id: conditionId,
        },
      });
    });
    await Promise.all(socialConditionsPromises);

    return new Response(JSON.stringify({ newRecipient, newContactInfo }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response("Error creating recipient and contact info: " + error.message, { status: 500 });
  }
}

// export async function POST(req) {
//   try {
//     const data = await req.json();

//     // Create a new recipient
//     const newRecipient = await prisma.recipient.create({
//       data: {
//         first_name: data.first_name,
//         last_name: data.last_name,
//         birth_date: new Date(data.birth_date),
//         dni: parseInt(data.dni, 10),
//         sex: data.sex,
//         enrollment_date: new Date(),
//         is_active: true,
//       },
//     });

//     // Create contact info for the new recipient
//     const newContactInfo = await prisma.contactInfo.create({
//       data: {
//         recipient_id: newRecipient.id,
//         phone: parseInt(data.phone, 10),
//         email: data.email,
//         street_id: data.street_id,
//         street_number: data.street_number,
//         locality_id: data.locality_id,
//       },
//     });

//     return new Response(JSON.stringify({ newRecipient, newContactInfo }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new Response("Error creating recipient and contact info: " + error.message, { status: 500 });
//   }
// }

// ---------
// export async function GET() {
//   try {
//     const recipients = await prisma.contactInfo.findMany({
//       include: {
//         recipient: true,
//         street: true,
//         locality: true
//       }
//     });
//     console.log("Recipients with locality:", recipients);  // Aquí
//     return new Response(JSON.stringify(recipients), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new Response("Error fetching recipients: " + error.message, { status: 500 });
//   }
// }


