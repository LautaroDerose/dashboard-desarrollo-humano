import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const assignments = await prisma.assignment.findMany({
      include: {
        benefit: true,
        recipient: {
          include: {
            contact_info: true // Incluye la información de contacto si es necesario
          }
        }
      }
    });
    console.log("Assignments with benefit and recipient info:", assignments);
    return new Response(JSON.stringify(assignments), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching assignments:", error.message);
    return new Response("Error fetching assignments: " + error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    console.log('Received Data:', data);

    const { benefit_id, recipient_id, quantity, amount, status, enrollment_date, expiry_date } = data;

    // Validaciones adicionales con logs
    if (!benefit_id) {
      console.error("Missing benefit_id");
      throw new Error("El campo benefit_id es requerido.");
    }
    if (!recipient_id) {
      console.error("Missing recipient_id");
      throw new Error("El campo recipient_id es requerido.");
    }
    if (isNaN(quantity)) {
      console.error("Invalid quantity:", quantity);
      throw new Error("El campo quantity debe ser un número.");
    }
    if (isNaN(amount)) {
      console.error("Invalid amount:", amount);
      throw new Error("El campo amount debe ser un número.");
    }
    if (!status) {
      console.error("Missing status");
      throw new Error("El campo status es requerido.");
    }
    if (!enrollment_date) {
      console.error("Missing enrollment_date");
      throw new Error("El campo enrollment_date es requerido.");
    }
    if (!expiry_date) {
      console.error("Missing expiry_date");
      throw new Error("El campo expiry_date es requerido.");
    }

    console.log('All data is valid. Proceeding to create assignment.');

    const newAssignment = await prisma.assignment.create({
      data: {
        // benefit_id: Number(benefit_id),
        benefit: { connect: { id: Number(benefit_id) } }, // Assuming 'id' is the primary key of the benefit table
        // recipient_id: Number(recipient_id),
        recipient: { connect: { id: Number(recipient_id) } }, // Assuming 'id' is the primary key of the recipient table
        quantity: Number(quantity),
        amount: Number(amount),
        status,
        enrollment_date: new Date(enrollment_date).toISOString(),
        expiry_date: new Date(expiry_date).toISOString(),
        // withdrawal_date: null,
      }
    });

    console.log('New Assignment created:', newAssignment);
    
    return new NextResponse(JSON.stringify(newAssignment), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error creating assignment:", error);
    return new NextResponse(JSON.stringify({ error: "Error creating assignment: " + error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// export async function POST(req) {
//   try {
//     const { benefit_id, recipient_id, quantity, amount, status, enrollment_date, expiry_date } = await req.json();
    
//     // Validate input data
//     if (!benefit_id || !recipient_id || !quantity || !amount || !status || !enrollment_date || !expiry_date) {
//       throw new Error("Missing required fields");
//     }

//     const newAssignment = await prisma.assignment.create({
//       data: {
//         benefit_id,
//         recipient_id,
//         quantity: parseFloat(quantity), // Ensure numeric values are correctly parsed
//         amount: parseFloat(amount),
//         status,
//         enrollment_date: new Date(enrollment_date).toISOString(),
//         expiry_date: new Date(expiry_date).toISOString(),
//         // withdrawal_date: new Date(withdrawal_date)
//       }
//     });

//     return new NextResponse(JSON.stringify(newAssignment), {
//       status: 201,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new NextResponse(JSON.stringify({ error: "Error creating assignment: " + error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

// export async function POST(req) {
//   try {
//     const data = await req.json();
//     const newAssignment = await prisma.assignment.create({
//       data: {
//         benefit_id,
//         recipient_id,
//         quantity,
//         amount,
//         status,
//         enrollment_date: new Date(enrollment_date).toISOString(),
//         expiry_date: new Date(expiry_date).toISOString(),
//         // withdrawal_date: new Date(withdrawal_date)
//       }
//     });
//     return new NextResponse(JSON.stringify(newAssignment), {
//       status: 201,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new NextResponse(JSON.stringify({ error: "Error creating assignment: " + error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }


// {"amount": "12",
//     "benefit":"gas",
//     "enrollment_date": Wed May 29 2024 00:00:00 GMT-0300 (hora estándar de Argentina), 
//     "expiry_date":Fri May 31 2024 00:00:00 GMT-0300 (hora estándar de Argentina),
//     "quantity": "123",
//     "recipient":"Marc Wilkerson",
//     "status":"En Proceso"
// }