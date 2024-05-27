
const { recipientIds, benefitIds } = require('./genData.js');
const Chance = require('chance');
const chance = new Chance();
const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'dh_db2'
});

// Función para generar asignaciones (assignments)
function generateAssignments(count, recipientIds, benefitIds) {
  const assignments = [];
  for (let i = 0; i < count; i++) {
    const randomRecipientId = chance.pickone(recipientIds);
    const randomBenefitId = chance.pickone(benefitIds);
    const assignment = {
      benefit_id: randomBenefitId,
      recipient_id: randomRecipientId,
      quantity: chance.integer({ min: 1, max: 10 }),
      amount: chance.integer({ min: 100, max: 1000 }),
      status: chance.pickone(['Pendiente', 'Aprobado', 'Rechazado']),
      enrollment_date: chance.date({ year: 2023 }).toISOString().slice(0, 10),
      expiry_date: chance.date({ year: 2024 }).toISOString().slice(0, 10),
      withdrawal_date: chance.date({ year: 2024 }).toISOString().slice(0, 10)
    };
    assignments.push(assignment);
  }
  return assignments;
}

async function insertAssignments(assignments) {
  try {
    const assignmentIds = await insertAndGetIds('Assignment', assignments);
    console.log('Assignments insertados con éxito:', assignmentIds);
  } catch (error) {
    console.error('Error insertando datos en la tabla Assignment:', error);
  }
}

async function main() {
  try {
    // Generar y insertar Assignments
    const assignments = generateAssignments(10, recipientIds, benefitIds);
    await insertAssignments(assignments);
  } finally {
    connection.end();
  }
}

main();
