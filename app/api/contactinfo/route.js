// import prisma from "@/lib/prisma"; 

// export async function GET() {
//   try {
//     // Realizar múltiples consultas a la base de datos
//     const [contactInfos, assignments] = await Promise.all([
//       prisma.contactInfo.findMany({
//         include: {
//           recipient: true,
//           street: true,
//           locality: true
//         }
//       }),
//       prisma.assignment.findMany({
//         include: { benefit: true, recipient: true }
//       })
//     ]);

//     // Combinar los resultados en un solo objeto
//     const result = {
//       assignments,
//       contactInfos,
//     };
//     console.log("info de contactos with locality:", contactInfos);

//     // Enviar la respuesta con los datos combinados
//     return new Response(JSON.stringify(result), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error("Error fetching info de contactos:", error.message);
//     return new Response("Error fetching info de contactos: " + error.message, { status: 500 });
//   }
// }

import prisma from "@/lib/prisma"; // Ajusta la ruta según tu estructura de proyecto

export async function GET() {
  try {
    const contactInfos = await prisma.contactInfo.findMany({
      include: {
        recipient: true,
        street: true,
        locality: true
      }
    });
    console.log("info de contactos with locality:", contactInfos);
    return new Response(JSON.stringify(contactInfos), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching info de contactos:", error.message);
    return new Response("Error fetching info de contactos: " + error.message, { status: 500 });
  }
}