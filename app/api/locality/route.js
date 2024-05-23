import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Método no permitido
  }

  try {
    const recipients = await prisma.recipient.findMany({
      include: {
        locality: true,
      },
    });

    const localities = recipients.map(recipient => ({
      id: recipient.localityId,
      name: recipient.locality ? recipient.locality.name : "N/A",
    }));

    res.status(200).json(localities);
  } catch (error) {
    res.status(500).json({ error: "Error fetching localities: " + error.message });
  }
}