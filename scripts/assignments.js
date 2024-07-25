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
    // Obtener IDs de Recipients y Benefits
    const recipientIds = await getIds('Recipient');
    const benefitIds = await getIds('Benefit');

    // Generar Assignments
    const assignments = [];
    for (let i = 0; i < 2000; i++) { // Generar 2000 assignments
      const year = chance.pickone([2022, 2023, 2024]);

      const enrollmentDate = getRandomDate(year);
      const expiryDate = getRandomDate(year);
      const withdrawalDate = chance.bool() ? getRandomDate(year) : null;

      assignments.push({
        benefit_id: chance.pickone(benefitIds),
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
    console.log('Assignments insertados con éxito:', assignmentIds);
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

// async function main() {
//   try {
//     // Obtener IDs de Recipients y Benefits
//     const recipientIds = await getIds('Recipient');
//     const benefitIds = await getIds('Benefit');

//     // Generar Assignments
//     const assignments = [];
//     for (let i = 0; i < 1000; i++) { // Generar 100 assignments
//       assignments.push({
//         benefit_id: chance.pickone(benefitIds),
//         recipient_id: chance.pickone(recipientIds),
//         quantity: chance.integer({ min: 1, max: 10 }),
//         amount: chance.integer({ min: 100, max: 1000 }),
//         status: chance.pickone(['Rechazado', 'Pendiente', 'En proceso', 'En revision', 'Concretado']),
//         enrollment_date: chance.date({ year: 2024 }).toISOString().slice(0, 10),
//         expiry_date: chance.date({ year: 2024 }).toISOString().slice(0, 10),
//         withdrawal_date: chance.bool() ? chance.date({ year: 2024 }).toISOString().slice(0, 10) : null
//       });
//     }

//     // Insertar Assignments
//     const assignmentIds = await insertIntoTable('Assignment', assignments);
//     console.log('Assignments insertados con éxito:', assignmentIds);
//   } catch (error) {
//     console.error('Error insertando datos:', error);
//   } finally {
//     connection.end();
//   }
// }

// main();