import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const benefits = await prisma.benefit.findMany({
      include:{ category: true}
    });
    return new Response(JSON.stringify(benefits), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response("Error fetching benefits: " + error.message, { status: 500 });
  }
}