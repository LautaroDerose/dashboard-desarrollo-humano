import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [ benefits, benefitCategories ] = await Promise.all([
      prisma.benefit.findMany({
        include:{ category: true}
      }),
      prisma.benefitCategory.findMany()
    ])

    const result = {
      benefits,
      benefitCategories
    }

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response("Error fetching benefits: " + error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    console.log('Received Data:', data);

    const { category_id, name } = data;

    // Validaciones adicionales con logs
    if (!category_id) {
      console.error("Missing category_id");
      throw new Error("El campo category_id es requerido.");
    }
    if (!name || name.length < 3) {
      console.error("Invalid name:", name);
      throw new Error("El campo nombre debe tener al menos 3 caracteres.");
    }

    console.log('All data is valid. Proceeding to create benefit.');

    const newBenefit = await prisma.benefit.create({
      data: {
        category_id: Number(category_id),
        name,
      },
    });

    console.log('New Benefit created:', newBenefit);

    return new NextResponse(JSON.stringify(newBenefit), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error creating benefit:", error);
    return new NextResponse(JSON.stringify({ error: "Error creating benefit: " + error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}