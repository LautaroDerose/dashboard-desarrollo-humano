import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
  const id = parseInt(params.id)
  console.log(id);
  try {
    const recipient = await prisma.recipient.findFirst({
      where: {id:id}
    });
    if(!recipient) {
      return new NextResponse(`Beneficiario con el id ${id} no encontrado`, {status:404});
    }
    return NextResponse.json(recipient)
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(request, {params}) {
  const id = parseInt(params.id)
  try {
    const result = await prisma.recipient.delete({
      where:{id:id} 
    })
    return NextResponse.json({message: result}, { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, {status: 500});
  }
}

export async function PUT(request, {params}) {
  console.log(params)
  const id = parseInt(params.id);
  const data = await request.json();
    try {
      const result = await prisma.recipient.update({
        where: {id:id},
        data: data
      });
      if(!result) {
        return new NextResponse(`Beneficiario con el id ${id} no encontrado`, {status:404});
      }
      return NextResponse.json({message:result}, {status:200})
    } catch (error) {
      return new NextResponse(error.message, {status:500})
    }
  
}