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