import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = parseInt(params.id);
  console.log("Request ID:", id);  // Añadir log para depuración
  try {
    const recipient = await prisma.recipient.findFirst({
      where: { id: id },
      include: {
        contact_info: {
          include: {
            street: true,
            locality: true,
          },
        },
        recipientSocialConditions: {
          include: { social_condition: true },
        },
        Assignment: {
          include: { benefit: true },
        },
      },
    });

    // console.log("Recipient Data:", recipient);  // Log para ver los datos del recipient

    if (!recipient) {
      return new NextResponse(`Recipient con id ${id} no encontrado`, { status: 400 });
    }

    return NextResponse.json(recipient);
  } catch (error) {
    console.error("Error fetching recipient:", error);  // Añadir log para depuración
    return new NextResponse(error.message, { status: 500 });
  }
}



// export async function PUT(req, res) {
//   const { id } = req.query;

//   try {
//     const data = await req.json();
//     const updatedContactInfo = await prisma.contactInfo.update({
//       where: { id: parseInt(id) },
//       data: {
//         recipient_id: data.recipient_id,
//         phone: data.phone,
//         email: data.email,
//         street_id: data.street_id,
//         street_number: data.street_number,
//         locality_id: data.locality_id,
//       },
//     });
//     return res.status(200).json(updatedContactInfo);
//   } catch (error) {
//     return res.status(500).json({ error: "Error updating contactInfo: " + error.message });
//   }
// }

export async function DELETE(req, res) {
  const { id } = req.query;

  try {
    const deletedContactInfo = await prisma.contactInfo.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json(deletedContactInfo);
  } catch (error) {
    return res.status(500).json({ error: "Error deleting contactInfo: " + error.message });
  }
}

export async function PUT(req) {
  try {
    const data = await req.json();
    const { id } = data;

    // Actualizar los datos del recipient
    const updatedRecipient = await prisma.recipient.update({
      where: { id: parseInt(id) },
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        birth_date: new Date(data.birth_date),
        dni: parseInt(data.dni, 10),
        sex: data.sex,
        enrollment_date: new Date(data.enrollment_date),
        is_active: data.is_active,
      },
    });

    // Actualizar la información de contacto
    const updatedContactInfo = await prisma.contactInfo.update({
      where: { recipient_id: updatedRecipient.id },
      data: {
        phone: parseInt(data.phone, 10),
        email: data.email,
        street_id: data.street_id,
        street_number: data.street_number,
        locality_id: data.locality_id,
      },
    });

    // Actualizar las condiciones sociales
    await prisma.recipientSocialCondition.deleteMany({
      where: { recipient_id: updatedRecipient.id },
    });

    const socialConditionsPromises = data.social_conditions.map(conditionId => {
      return prisma.recipientSocialCondition.create({
        data: {
          recipient_id: updatedRecipient.id,
          social_condition_id: conditionId,
        },
      });
    });
    await Promise.all(socialConditionsPromises);

    return new Response(JSON.stringify({ updatedRecipient, updatedContactInfo }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response("Error updating recipient and contact info: " + error.message, { status: 500 });
  }
}