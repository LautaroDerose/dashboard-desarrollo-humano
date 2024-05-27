import prisma from "@/lib/prisma"; // Ajusta la ruta según tu estructura de proyecto

export async function GET(req, res) {
  const { id } = req.query;
  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id: parseInt(id) },
      include: {
        benefit: true,
        recipient: true
      }
    });
    if (assignment) {
      res.status(200).json(assignment);
    } else {
      res.status(404).json({ error: "Assignment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching assignment: " + error.message });
  }
}

export async function PUT(req, res) {
  const { id } = req.query;
  const { benefit_id, recipient_id, quantity, amount, status, enrollment_date, expiry_date, withdrawal_date } = req.body;

  try {
    const updatedAssignment = await prisma.assignment.update({
      where: { id: parseInt(id) },
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
    res.status(200).json(updatedAssignment);
  } catch (error) {
    res.status(500).json({ error: "Error updating assignment: " + error.message });
  }
}

export async function DELETE(req, res) {
  const { id } = req.query;

  try {
    await prisma.assignment.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting assignment: " + error.message });
  }
}