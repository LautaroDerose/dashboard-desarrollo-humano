import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const assignments = await prisma.assignment.findMany({
      include: {
        benefit: true,
        recipient: {
          include: {
            contact_info: true // Incluye la información de contacto si es necesario
          }
        }
      }
    });
    console.log("Assignments with benefit and recipient info:", assignments);
    return new Response(JSON.stringify(assignments), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching assignments:", error.message);
    return new Response("Error fetching assignments: " + error.message, { status: 500 });
  }
}

export async function POST(req, res) {
  const { benefit_id, recipient_id, quantity, amount, status, enrollment_date, expiry_date, withdrawal_date } = req.body;

  try {
    const newAssignment = await prisma.assignment.create({
      data: {
        benefit_id,
        recipient_id,
        quantity,
        amount,
        status,
        enrollment_date: new Date(enrollment_date),
        expiry_date: new Date(expiry_date),
        withdrawal_date: new Date(withdrawal_date)
      }
    });
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ error: "Error creating assignment: " + error.message });
  }
}