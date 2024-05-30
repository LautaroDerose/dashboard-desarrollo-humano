import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Realizar múltiples consultas a la base de datos
    const [localities, socialConditions, riskFactors] = await Promise.all([
      prisma.locality.findMany({
        include: { Street: true }
      }),
      prisma.socialCondition.findMany(),
      prisma.riskFactor.findMany()
    ]);

    // Combinar los resultados en un solo objeto
    const result = {
      localities,
      socialConditions,
      riskFactors
    };

    // Enviar la respuesta con los datos combinados
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response("Error fetching data: " + error.message, { status: 500 });
  }
}