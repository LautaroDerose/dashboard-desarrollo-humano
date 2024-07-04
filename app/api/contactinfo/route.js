// Ajusta la ruta según tu estructura de proyecto
import prisma from "@/lib/prisma"; 

// API para obtener datos
export async function GET() {
  try {
    const [contactInfos, localities, recipientSocialConditions, socialConditions] = await Promise.all([
      prisma.contactInfo.findMany({
        include: {
          recipient: true,
          street: true,
          locality: true
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
      contactInfos,
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
// export async function GET() {
//   try {
//     const contactInfos = await prisma.contactInfo.findMany({
//       include: {
//         recipient: true,
//         street: true,
//         locality: true
//       }
//     });
//     // console.log("info de contactos with locality:", contactInfos);
//     return new Response(JSON.stringify(contactInfos), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error("Error fetching info de contactos:", error.message);
//     return new Response("Error fetching info de contactos: " + error.message, { status: 500 });
//   }
// }