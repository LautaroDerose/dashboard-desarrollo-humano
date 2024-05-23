import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
//    CHAT GPT 1 16/05

export async function GET() {
  try {
    const benefits = await prisma.benefit.findMany({
    });
    return new Response(JSON.stringify(benefits), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response("Error fetching benefits: " + error.message, { status: 500 });
  }
}