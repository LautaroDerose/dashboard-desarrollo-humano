import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request, {params}) {
  const id = parseInt(params.id);
  console.log(id)
  try {
    const recipient = await prisma.recipient.findFirst({
      where: { id: id },
      include: {
        contact_info:{
          include:{
            street:true, locality:true
          }
        },
        recipientSocialConditions:{
            include:{social_condition: true}
          }
        },
    });

    if (!recipient) {
      return new NextResponse( `recipient con ${id} not fount`, {status:400})
    }

    return NextResponse.json(recipient);
  } catch (error) {
    return new NextResponse(error.messge, {status: 500});
  }
}
// export async function GET(request, {params}) {
//   const { id } = parseInt(params.id);
// console.log(id)
//   try {
//     const recipient = await prisma.recipient.findFirst ({
//       where: { id: id },
//       include: {
//         contact_info:{
//           include:{
//             street:true, locality:true
//           }
//         },
//         recipientSocialConditions:{
//             include:{social_condition: true}
//           }
//         },
//     });

//     if (!recipient) {
//       return new NextResponse( `recipient con ${id} not fount`, {status:400})
//     }

//     return NextResponse.json(recipient);
//   } catch (error) {
//     return new NextResponse(error.messge, {status: 500});
//   }
// }
// export async function GET(request, {params}) {
//   const { id } = parseInt(params.id);
// console.log(id)
//   try {
//     const recipient = await prisma.contactInfo.findFirst ({
//       where: { id: id },
//       include: {
//         street: true,
//         locality: true,
//         recipient: {
//           include:{recipientSocialConditions:{
//             include:{social_condition: true}
//           }}
//         },
        
//       }
//     });

//     if (!recipient) {
//       return new NextResponse( `recipient con ${id} not fount`, {status:400})
//     }

//     return NextResponse.json(recipient);
//   } catch (error) {
//     return new NextResponse(error.messge, {status: 500});
//   }
// }


export async function PUT(req, res) {
  const { id } = req.query;

  try {
    const data = await req.json();
    const updatedContactInfo = await prisma.contactInfo.update({
      where: { id: parseInt(id) },
      data: {
        recipient_id: data.recipient_id,
        phone: data.phone,
        email: data.email,
        street_id: data.street_id,
        street_number: data.street_number,
        locality_id: data.locality_id,
      },
    });
    return res.status(200).json(updatedContactInfo);
  } catch (error) {
    return res.status(500).json({ error: "Error updating contactInfo: " + error.message });
  }
}

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
// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET(request, {params}) {
//   const id = parseInt(params.id)
//   console.log(id);
//   try {
//     const recipient = await prisma.recipient.findFirst({
//       where: {id:id}
//     });
//     if(!recipient) {
//       return new NextResponse(`Beneficiario con el id ${id} no encontrado`, {status:404});
//     }
//     return NextResponse.json(recipient)
//   } catch (error) {
//     return new NextResponse(error.message, { status: 500 });
//   }
// }

// export async function DELETE(request, {params}) {
//   const id = parseInt(params.id)
//   try {
//     const result = await prisma.recipient.delete({
//       where:{id:id} 
//     })
//     return NextResponse.json({message: result}, { status: 200 });
//   } catch (error) {
//     return new NextResponse(error.message, {status: 500});
//   }
// }

// export async function PUT(request, {params}) {
//   console.log(params)
//   const id = parseInt(params.id);
//   const data = await request.json();
//     try {
//       const result = await prisma.recipient.update({
//         where: {id:id},
//         data: data
//       });
//       if(!result) {
//         return new NextResponse(`Beneficiario con el id ${id} no encontrado`, {status:404});
//       }
//       return NextResponse.json({message:result}, {status:200})
//     } catch (error) {
//       return new NextResponse(error.message, {status:500})
//     }
  
// }