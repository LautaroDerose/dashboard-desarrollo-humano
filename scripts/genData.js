const Chance = require('chance');
const chance = new Chance();
const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'dh_db2'
});
// Listas de palabras para cada tabla
const benefitCategoriesNames = ["Salud", "Educación", "Materiales", "Energia", "Transporte", "Alimentación", "Financiera"];
const benefitNames = ["alimentos", "agua", "gas", "luz", "garrafa", "leña", "estudio médico", "materiales de construcción", "alquiler de vivienda", "farmacia", "chapa", "tirante", "clavadera", "colchon", "frazada", "traslado", "óptica", "bono jubilados", "atmosférico"];
// const riskFactorNames = ["recien nacido", "escabiosis", "diabetes", "incumplimiento de controles de salud", "TBC", "cáncer", "discapacidad", "parásitos", "enfermedad mental", "embarazo", "TRAB", "falta de esquema de  acunación", "adulto mayor con limitaciones", "anemia", "sífilis", "alcoholismo", "enfermedad neurológica", "adicción a drogas", "hipertensión", "HIV/ sida", "desnutrición", "puerperio", "otro"];
const socialConditionNames = ["flia sola con menores de 5 anos", "flia sola con menores de 14 anos", "bajo nivel de instruccion", "emergencia habitacional", "situacion de abandono", "indigencia", "abandono paterno", "abandono materno", "pobreza", "desocupación jefe de hogar", "trabajo inestable jefe de hogar", "madre sola con menores"];
const localityNames = ["Carhue", "San Miguel", "Gascon", "Rivera", "Villa Maza"];
const streetNames = ["San Martin", "Belgrano", "Rivadavia", "Saavedra", "Moreno", "Alvear", "Guemes", "Pueyrredon", "Mitre", "Dorrego", "Yrigoyen", "Sarmiento", "Alberdi", "Velez Sarsfield", "Castelli", "Laprida", "Las Heras", "Balcarce", "Anchorena", "Zeballos"];


// Función para insertar elementos en una tabla y obtener sus IDs
function insertAndGetIds(table, elements) {
  return Promise.all(elements.map(element => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${table} SET ?`, element, (error, results) => {
        if (error) return reject(error);
        resolve(results.insertId);
      });
    });
  }));
}

// Función para generar destinatarios (recipients)
function generateRecipientsAndContacts(count, localityIds, streetIds) {
  const recipients = [];
  const contactInfos = [];
  for (let i = 0; i < count; i++) {
    const birthDate = chance.birthday({ year: chance.integer({ min: 1900, max: 2010 }) });
    const formattedBirthDate = birthDate.toISOString().slice(0, 10);
    const localityId = chance.pickone(localityIds);
    recipients.push({
      first_name: chance.first(),
      last_name: chance.last(),
      birth_date: formattedBirthDate,
      dni: chance.integer({ min: 10000000, max: 99999999 }),
      sex: chance.gender(),
      enrollment_date: chance.date({ year: 2023 }).toISOString().slice(0, 10),
      is_active: chance.bool(),
      // family_group_id: null, // Assuming this will be handled later
    });
    contactInfos.push({
      phone: chance.phone({ formatted: false }),
      email: chance.email(),
      street_id: chance.pickone(streetIds),
      street_number: chance.integer({ min: 1, max: 1000 }),
      locality_id: localityId,
      recipient_id: i + 1, // Assuming recipient IDs start from 1
    });
  }
  return { recipients, contactInfos };
}

async function main() {
  try {
    // Insertar BenefitCategories
    const benefitCategories = benefitCategoriesNames.map(name => ({ name }));
    const categoryIds = await insertAndGetIds('BenefitCategory', benefitCategories);
    console.log('BenefitCategories insertadas con éxito:', categoryIds);

    // Insertar Localities
    const localities = localityNames.map(name => ({ name }));
    const localityIds = await insertAndGetIds('Locality', localities);
    console.log('Localities insertadas con éxito:', localityIds);

    // Insertar Streets
    const streets = streetNames.map(name => ({
      name,
      locality_id: chance.pickone(localityIds)
    }));
    const streetIds = await insertAndGetIds('Street', streets);
    console.log('Streets insertadas con éxito:', streetIds);

    // Insertar Benefits
    const benefits = benefitNames.map(name => ({
      name,
      type: chance.pickone(['Monetario', 'Material']),
      frequency: chance.pickone(['Único', 'Estacional', 'Anual']),
      provider: chance.company(),
      category_id: chance.pickone(categoryIds)
    }));
    const benefitIds = await insertAndGetIds('Benefit', benefits);
    console.log('Benefits insertados con éxito:', benefitIds);

    // Generar y insertar Recipients
    const { recipients, contactInfos } = generateRecipientsAndContacts(50, localityIds, streetIds);
    const recipientIds = await insertAndGetIds('Recipient', recipients);
    console.log('Recipients insertados con éxito:', recipientIds);
    const contactInfoIds = await insertAndGetIds('ContactInfo', contactInfos);
    console.log('ContactInfos insertados con éxito:', contactInfoIds);

    // Insertar RiskFactors con referencia a Recipients existentes
    // const riskFactors = [];
    // for (const recipientId of recipientIds) {
    //   const randomRiskFactor = chance.pickone(riskFactorNames);
    //   const riskFactor = {
    //     name: randomRiskFactor,
    //     gravity: chance.pickone(['Alta', 'Media', 'Baja']),
    //     type: chance.pickone(['Salud', 'Seguridad', 'Otro']),
    //     recipient_id: recipientId
    //   };
    //   riskFactors.push(riskFactor);
    // }
    // const riskFactorIds = await insertAndGetIds('RiskFactor', riskFactors);
    // console.log('RiskFactors insertados con éxito:', riskFactorIds);

    // Insertar SocialConditions con referencia a Recipients existentes
    const socialConditions = [];
    for (const recipientId of recipientIds) {
      const randomSocialCondition = chance.pickone(socialConditionNames);
      const socialCondition = {
        name: randomSocialCondition,
        gravity: chance.pickone(['Alta', 'Media', 'Baja']),
        type: chance.pickone(['Económica', 'Educacional', 'Familiar']),
        recipient_id: recipientId
      };
      socialConditions.push(socialCondition);
    }
    const socialConditionIds = await insertAndGetIds('SocialCondition', socialConditions);
    console.log('SocialConditions insertadas con éxito:', socialConditionIds);

  } catch (error) {
    console.error('Error insertando datos:', error);
  } finally {
    connection.end();
  }
}

main();
// ------------ORIGINAL FAKE DATA--------------
// const Chance = require('chance');
// const chance = new Chance();
// const mysql = require('mysql');

// // Configuración de la conexión a la base de datos
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'dh_db2'
// });

// // Listas de palabras para cada tabla
// const benefitCategoriesNames = ["Salud", "Educación", "Materiales", "Energia", "Transporte", "Alimentación", "Financiera"];
// const benefitNames = ["alimentos", "agua", "gas", "luz", "garrafa", "leña", "estudio médico", "materiales de construcción", "alquiler de vivienda", "farmacia", "chapa", "tirante", "clavadera", "colchon", "frazada", "traslado", "óptica", "bono jubilados", "atmosférico"];
// const riskFactorNames = ["recien nacido", "escabiosis", "diabetes", "incumplimiento de controles de salud", "TBC", "cáncer", "discapacidad", "parásitos", "enfermedad mental", "embarazo", "TRAB", "falta de esquema de  acunación", "adulto mayor con limitaciones", "anemia", "sífilis", "alcoholismo", "enfermedad neurológica", "adicción a drogas", "hipertensión", "HIV/ sida", "desnutrición", "puerperio", "otro"];
// const socialConditionNames = ["flia sola con menores de 5 anos", "flia sola con menores de 14 anos", "bajo nivel de instruccion", "emergencia habitacional", "situacion de abandono", "indigencia", "abandono paterno", "abandono materno", "pobreza", "desocupación jefe de hogar", "trabajo inestable jefe de hogar", "madre sola con menores"];
// const localityNames = ["Carhue", "San Miguel", "Gascon", "Rivera", "Villa Maza"];
// const streetNames = ["San Martin", "Belgrano", "Rivadavia", "Saavedra", "Moreno", "Alvear", "Guemes", "Pueyrredon", "Mitre", "Dorrego", "Yrigoyen", "Sarmiento", "Alberdi", "Velez Sarsfield", "Castelli", "Laprida", "Las Heras", "Balcarce", "Anchorena", "Zeballos"];

// // Función para insertar elementos en una tabla y obtener sus IDs
// function insertAndGetIds(table, elements) {
//   return Promise.all(elements.map(element => {
//     return new Promise((resolve, reject) => {
//       connection.query(`INSERT INTO ${table} SET ?`, element, (error, results) => {
//         if (error) return reject(error);
//         resolve(results.insertId);
//       });
//     });
//   }));
// }

// // Función para generar destinatarios (recipients)
// function generateRecipients(count, localityIds, streetIds) {
//   const recipients = [];
//   for (let i = 0; i < count; i++) {
//     const birthDate = chance.date({ year: chance.integer({ min: 1900, max: 2010 }) });
//     const formattedBirthDate = birthDate.toISOString().slice(0, 10);
//     recipients.push({
//       firstName: chance.first(),
//       lastName: chance.last(),
//       birthDate: formattedBirthDate,
//       dni: chance.integer({ min: 10000000, max: 99999999 }),
//       phone: chance.phone({ formatted: false }),
//       email: chance.email(),
//       sex: chance.gender(),
//       enrollmentDate: chance.date({ year: 2023 }).toISOString().slice(0, 10),
//       localityId: chance.pickone(localityIds),
//       streetId: chance.pickone(streetIds),
//       streetNumber: chance.integer({ min: 1, max: 1000 })
//     });
//   }
//   return recipients;
// }

// // ------------------------------------------------

// async function main() {
//   try {
//     // Insertar BenefitCategories
//     const benefitCategories = benefitCategoriesNames.map(name => ({ name }));
//     const categoryIds = await insertAndGetIds('BenefitCategory', benefitCategories);
//     console.log('BenefitCategories insertadas con éxito:', categoryIds);

//     // Insertar Localities
//     const localities = localityNames.map(name => ({ name }));
//     const localityIds = await insertAndGetIds('Locality', localities);
//     console.log('Localities insertadas con éxito:', localityIds);

//     // Insertar Streets
//     const streets = streetNames.map(name => ({
//       name,
//       localityId: chance.pickone(localityIds)
//     }));
//     const streetIds = await insertAndGetIds('Street', streets);
//     console.log('Streets insertadas con éxito:', streetIds);

//     // Insertar RiskFactors
//     const riskFactors = riskFactorNames.map(name => ({
//       name,
//       gravity: chance.pickone(['Alta', 'Media', 'Baja']),
//       type: chance.pickone(['Salud', 'Seguridad', 'Otro'])
//     }));
//     const riskFactorIds = await insertAndGetIds('RiskFactor', riskFactors);
//     console.log('RiskFactors insertados con éxito:', riskFactorIds);

//     // Insertar SocialConditions
//     const socialConditions = socialConditionNames.map(name => ({
//       name,
//       gravity: chance.pickone(['Alta', 'Media', 'Baja']),
//       type: chance.pickone(['Económica', 'Educacional', 'Familiar'])
//     }));
//     const socialConditionIds = await insertAndGetIds('SocialCondition', socialConditions);
//     console.log('SocialConditions insertadas con éxito:', socialConditionIds);

//     // Insertar Benefits
//     const benefits = benefitNames.map(name => ({
//       name,
//       frequency: chance.pickone(['Único', 'Estacional', 'Anual']),
//       quantity: chance.integer({ min: 1, max: 10 }),
//       amount: chance.integer({ min: 10, max: 100 }),
//       provider: chance.company(),
//       status: chance.pickone(['Activo', 'Inactivo']),
//       categoryId: chance.pickone(categoryIds)
//     }));
//     const benefitIds = await insertAndGetIds('Benefit', benefits);
//     console.log('Benefits insertados con éxito:', benefitIds);

//     // Generar y insertar Recipients
//     const recipients = generateRecipients(50, localityIds, streetIds);  // Actualizado a 50
//     const recipientIds = await insertAndGetIds('Recipient', recipients);
//     console.log('Recipients insertados con éxito:', recipientIds);

//   } catch (error) {
//     console.error('Error insertando datos:', error);
//   } finally {
//     connection.end();
//   }
// }

// main();

// Table BenefitCategory {
//   id int [primary key]
//   name varchar
// }

// Table Benefit {
//   id int [primary key]
//   name varchar
//   type varchar
//   frequency varchar
//   provider varchar
//   categoryId int [ref: > BenefitCategory.id]
// }

// Table Recipient {
//   id int [primary key]
//   firstName varchar
//   lastName varchar
//   birthDate datetime
//   dni int [unique]
//   sex varchar
//   enrollmentDate datetime
//   isActive boolean
//   familyGroupId int [ref: > FamilyGroup.id]
// }


// Table ContactInfo {
//   id int [primary key]
//   recipientId int [ref: > Recipient.id]
//   phone int
//   email varchar
//   streetId int [ref: > Street.id]
//   streetNumber varchar
//   localityId int [ref: > Locality.id]
// }

// Table RiskFactor {
//   id int [primary key]
//   name varchar
//   gravity varchar
//   type varchar
//   recipientId int [ref: > Recipient.id]
// }

// Table SocialCondition {
//   id int [primary key]
//   name varchar
//   gravity varchar
//   type varchar
//     recipientId int [ref: > Recipient.id]

// }

// Table Locality {
//   id int [primary key]
//   name varchar
// }

// Table Street {
//   id int [primary key]
//   name varchar
//   localityId int [ref: > Locality.id]
// }

// Table FamilyGroup {
//   id int [primary key]
//   familyName varchar
// }

// Table Assignments {
//   id int [primary key]
//   benefitId int [ref: > Benefit.id]
//   recipientId int [ref: > Recipient.id]
//   quantity int
//   amount int
//   status varchar
//   enrollmentDate datetime
//   expiryDate datetime
//   withdrawalDate datetime
// }
