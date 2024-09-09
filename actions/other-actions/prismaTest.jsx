"use server";
import prisma from "@/lib/prisma";


async function testCreateMany() {
  try {
    const assignment = await Prisma.assignment.create({
      data: {
        benefit_id: 13, // Usa un ID de beneficio válido
        recipient_id: 1, // Usa un ID de recipient válido
        enrollment_date: new Date(),
        amount: 250.0, // Monto total para la prueba
        quantity: 2, // Número de subsidios
      },
    });

    const travelSubsidyData = [
      {
        assignment_id: assignment.id,
        destination: 'Place A',
        date: new Date(),
        direction: 'round',
        passenger_type: 'main',
        name: 'John Doe',
        dni: 12345678,
        amount: 100.0,
        provider: 'Provider X'
      },
      {
        assignment_id: assignment.id,
        destination: 'Place B',
        date: new Date(),
        direction: 'round',
        passenger_type: 'companion',
        name: 'Jane Doe',
        dni: 87654321,
        amount: 150.0,
        provider: 'Provider Y'
      }
    ];

    const result = await prisma.travelSubsidy.createMany({
      data: travelSubsidyData,
      skipDuplicates: true, // Evita duplicados si es necesario
    });

    console.log('Result:', result);
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testCreateMany();