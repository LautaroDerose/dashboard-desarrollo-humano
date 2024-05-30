import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Realizar múltiples consultas a la base de datos
    const [assignments, recipients, benefits] = await Promise.all([
      prisma.assignment.findMany({
        include: { benefit: true, recipient: true }
      }),
      prisma.recipient.findMany(),
      prisma.benefit.findMany()
    ]);

    // Combinar los resultados en un solo objeto
    const result = {
      assignments,
      recipients,
      benefits
    };

    // Enviar la respuesta con los datos combinados
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response("Error fetching data: " + error.message, { status: 500 });
  }
}

// import prisma from "@/lib/prisma";

// export async function GET() {
//   try {
//     const [assignments, recipients, benefits] = await Promise.all([
//       prisma.assignment.findMany({
//         include: { Street: true, Recipient: true }
//       }),
//       prisma.recipient.findMany(),
//       prisma.benefit.findMany()
//     ]);

//     const result = {
//       assignments,
//       recipients,
//       benefits
//     };

//     return new Response(JSON.stringify(result), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
//   }
// }