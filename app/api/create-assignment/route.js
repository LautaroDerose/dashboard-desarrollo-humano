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

export async function POST(req) {
  try {
    const data = await req.json();
    console.log('Received Data:', data);

    const { benefit_id, recipient_id, quantity, amount, status, enrollment_date, expiry_date } = data;

    // Validaciones adicionales
    if (!benefit_id || !recipient_id || isNaN(quantity) || isNaN(amount) || !status || !enrollment_date || !expiry_date) {
      throw new Error("Todos los campos son requeridos y deben ser válidos.");
    }

    const newAssignment = await prisma.assignment.create({
      data: {
        benefit_id: Number(benefit_id),
        recipient_id: Number(recipient_id),
        quantity: Number(quantity),
        amount: Number(amount),
        status,
        enrollment_date: new Date(enrollment_date).toISOString(),
        expiry_date: new Date(expiry_date).toISOString(),
      }
    });

    console.log('New Assignment:', newAssignment);
    
    return new NextResponse(JSON.stringify(newAssignment), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error creating assignment:", error);
    return new NextResponse(JSON.stringify({ error: "Error creating assignment: " + error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}