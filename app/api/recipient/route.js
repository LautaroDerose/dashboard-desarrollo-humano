import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const recipients = await prisma.contactInfo.findMany({
      include: {
        recipient: true,
        street: true,
        locality: true
      }
    });
    console.log("Recipients with locality:", recipients);
    return new Response(JSON.stringify(recipients), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response("Error fetching recipients: " + error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();

    // Create a new recipient
    const newRecipient = await prisma.recipient.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        birth_date: new Date(data.birth_date),
        dni: parseInt(data.dni, 10),
        sex: data.sex,
        enrollment_date: new Date(),
        is_active: true,
      },
    });

    // Create contact info for the new recipient
    const newContactInfo = await prisma.contactInfo.create({
      data: {
        recipient_id: newRecipient.id,
        phone: parseInt(data.phone, 10),
        email: data.email,
        street_id: data.street_id,
        street_number: data.street_number,
        locality_id: data.locality_id,
      },
    });

    return new Response(JSON.stringify({ newRecipient, newContactInfo }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response("Error creating recipient and contact info: " + error.message, { status: 500 });
  }
}

