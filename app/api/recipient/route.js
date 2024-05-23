import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const recipients = await prisma.recipient.findMany({
      include: {
        locality: true,  // Incluyendo localidad
      },
    });
    console.log("Recipients with locality:", recipients);  // Aquí
    return new Response(JSON.stringify(recipients), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response("Error fetching recipients: " + error.message, { status: 500 });
  }
}
export async function POST(request) {
  try {
    const data = await request.json()
    const recipient = await prisma.recipient.create(({
      data
    }))
    return new NextResponse(JSON.stringify(recipient), {
      headers:{"Content-Type": "application/json"},
      status: 201
    })
  } catch (error) {
    return new NextResponse(error.message, {status: 500})
  }
}

// export async function GET(){
//   try {
//     const recipients = await prisma.recipient.findMany()
//     return NextResponse.json({data: recipients}, { status: 200 } );
//   } catch (error) {
//     return new NextResponse(error.message, { status: 500 })
//   }
// }


// STANJDARD
// export async function GET() {
//   try {
//     const {recipients} = await prisma.recipient.findMany();
//     return recipients;
//   } catch (error) {
//     throw new Error("Error fetching recipients: " + error.message);
//   }
// }

// export async function GET() {
//   try {
//     const recipients = await prisma.recipient.findMany();
//     const recipientsJSON = JSON.stringify(recipients); // Convertir a JSON
//     return recipientsJSON;
//   } catch (error) {
//     throw new Error("Error fetching recipients: " + error.message);
//   }
// }


//    CHAT GPT 1 16/05
// export async function GET() {
//   try {
//     const recipients = await prisma.recipient.findMany();
//     return new Response(JSON.stringify(recipients), {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//   }
// }

