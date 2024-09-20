const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.statusType.createMany({
    data: [
      { name: 'Rechazado' },
      { name: 'Pendiente' },
      { name: 'En Proceso' },
      { name: 'En Revisión' },
      { name: 'Concretado' },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })