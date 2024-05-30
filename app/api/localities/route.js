import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const localities = await prisma.locality.findMany({
      include: { Street: true }
    });
    return new Response(JSON.stringify(localities), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response("Error fetching localities: " + error.message, { status: 500 });
  }
}