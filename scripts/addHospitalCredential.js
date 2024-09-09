const mysql = require('mysql');
const Chance = require('chance');
const chance = new Chance();

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'dh_db2'
});

// Función para obtener los IDs de una tabla
function getIds(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT id FROM ${table}`, (error, results) => {
      if (error) return reject(error);
      resolve(results.map(row => row.id));
    });
  });
}

// Función para insertar elementos en una tabla
function insertIntoTable(table, elements) {
  return Promise.all(elements.map(element => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${table} SET ?`, element, (error, results) => {
        if (error) return reject(error);
        resolve(results.insertId);
      });
    });
  }));
}

// Función para generar una fecha aleatoria en un año específico
function getRandomDate(year) {
  const start = new Date(`${year}-01-01`);
  const end = new Date(`${year}-12-31`);
  return chance.date({ min: start, max: end }).toISOString().slice(0, 10);
}

async function main() {
  try {
    // Obtener IDs de Recipients
    const recipientIds = await getIds('Recipient');

    // Generar Assignments con benefit_id = 16
    const assignments = [];
    for (let i = 0; i < 30; i++) { // Generar 30 assignments con benefit_id = 16
      const year = chance.pickone([2022, 2023, 2024]);
      const enrollmentDate = getRandomDate(year);
      const expiryDate = getRandomDate(year);
      const withdrawalDate = chance.bool() ? getRandomDate(year) : null;

      assignments.push({
        benefit_id: 16, // Asignar siempre el benefit_id 16
        recipient_id: chance.pickone(recipientIds),
        quantity: chance.integer({ min: 1, max: 10 }),
        amount: chance.integer({ min: 100, max: 1000 }),
        status: chance.pickone(['Rechazado', 'Pendiente', 'En proceso', 'En revision', 'Concretado']),
        enrollment_date: enrollmentDate,
        expiry_date: expiryDate,
        withdrawal_date: withdrawalDate
      });
    }

    // Insertar Assignments
    const assignmentIds = await insertIntoTable('Assignment', assignments);

    // Generar Hospital Credentials asociados a los Assignments recién creados
    const hospitalCredentials = [];
    for (let i = 0; i < assignmentIds.length; i++) {
      const assignmentId = assignmentIds[i];
      const year = chance.pickone([2022, 2023, 2024]);
      const visitDate = getRandomDate(year);
      const reportIssued = chance.bool();
      const reportReceived = chance.bool();
      const credentialNumber = reportIssued && reportReceived ? chance.integer({ min: 1000, max: 9999 }) : null;

      hospitalCredentials.push({
        assignment_id: assignmentId, // Asociar hospitalCredential al assignment generado
        ts_name: chance.pickone(['TS 1', 'TS 2', 'TS 3']),
        visit_date: visitDate,
        visiting_shift: chance.pickone(['mañana', 'tarde', 'noche']),
        visit_status: chance.pickone(['realizada', 'reprogramada', 'no se encontró al recipient', 'otro']),
        visit_confirm: chance.bool(),
        report_soc_eco_issued: reportIssued,
        report_soc_eco_issue_date: reportIssued ? getRandomDate(year) : null,
        report_soc_eco_received: reportReceived,
        report_soc_eco_receive_date: reportReceived ? getRandomDate(year) : null,
        credential_number: credentialNumber
      });
    }

    // Insertar Hospital Credentials
    await insertIntoTable('hospitalCredential', hospitalCredentials);
    console.log('Assignments y Hospital Credentials insertados con éxito');
  } catch (error) {
    console.error('Error insertando datos:', error);
  } finally {
    connection.end();
  }
}

main();
// const mysql = require('mysql');
// const Chance = require('chance');
// const chance = new Chance();

// // Configuración de la conexión a la base de datos
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'dh_db2'
// });

// // Función para obtener los IDs de una tabla
// function getIds(table) {
//   return new Promise((resolve, reject) => {
//     connection.query(`SELECT id FROM ${table}`, (error, results) => {
//       if (error) return reject(error);
//       resolve(results.map(row => row.id));
//     });
//   });
// }

// // Función para insertar elementos en una tabla
// function insertIntoTable(table, elements) {
//   return Promise.all(elements.map(element => {
//     return new Promise((resolve, reject) => {
//       connection.query(`INSERT INTO ${table} SET ?`, element, (error, results) => {
//         if (error) return reject(error);
//         resolve(results.insertId);
//       });
//     });
//   }));
// }

// // Función para generar una fecha aleatoria en un año específico
// function getRandomDate(year) {
//   const start = new Date(`${year}-01-01`);
//   const end = new Date(`${year}-12-31`);
//   return chance.date({ min: start, max: end }).toISOString().slice(0, 10);
// }

// async function main() {
//   try {
//     // Obtener IDs de Recipients y Benefits
//     const recipientIds = await getIds('Recipient');
//     const benefitIds = await getIds('Benefit');

//     // Generar Assignments
//     const assignments = [];
//     const hospitalCredentials = [];
//     const usedAssignmentIds = new Set(); // Usar un conjunto para IDs únicos

//     for (let i = 0; i < 30; i++) { // Generar 50 hospitalCredentials
//       let assignmentId;
//       do {
//         assignmentId = chance.pickone(recipientIds);
//       } while (usedAssignmentIds.has(assignmentId)); // Asegurarse de que el ID no se repita
//       usedAssignmentIds.add(assignmentId);

//       const year = chance.pickone([2022, 2023, 2024]);
//       const visitDate = chance.date({ min: new Date(`${year}-01-01`), max: new Date(`${year}-12-31`) }).toISOString().slice(0, 10);
//       const reportIssued = chance.bool();
//       const reportReceived = chance.bool();
//       const credentialNumber = reportIssued && reportReceived ? chance.integer({ min: 1000, max: 9999 }) : null;

//       hospitalCredentials.push({
//         assignment_id: assignmentId,
//         ts_name: chance.pickone(['TS 1', 'TS 2', 'TS 3']),
//         visit_date: visitDate,
//         visiting_shift: chance.pickone(['mañana', 'tarde', 'noche']),
//         visit_status: chance.pickone(['realizada', 'reprogramada', 'no se encontró al recipient', 'otro']),
//         visit_confirm: chance.bool(),
//         report_soc_eco_issued: reportIssued,
//         report_soc_eco_issue_date: reportIssued ? getRandomDate(year) : null,
//         report_soc_eco_received: reportReceived,
//         report_soc_eco_receive_date: reportReceived ? getRandomDate(year) : null,
//         credential_number: credentialNumber,
//       });
//     }

//     // Insertar Hospital Credentials
//     await insertIntoTable('hospitalCredential', hospitalCredentials);
//     console.log('Hospital Credentials insertados con éxito');
//   } catch (error) {
//     console.error('Error insertando datos:', error);
//   } finally {
//     connection.end();
//   }
// }

// main();
