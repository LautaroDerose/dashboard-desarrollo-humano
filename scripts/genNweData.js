const Chance = require('chance');
const chance = new Chance();
const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'dh_db2'
});

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
    });
    contactInfos.push({
      phone: chance.phone({ formatted: false }),
      email: chance.email(),
      street_id: chance.pickone(streetIds),
      street_number: chance.integer({ min: 1, max: 1000 }),
      locality_id: localityId,
      recipient_id: i + 1,
    });
  }
  return { recipients, contactInfos };
}

async function main() {
  try {
    // Insertar Localidades
    const localityNames = ["Carhue", "San Miguel", "Gascon", "Rivera", "Villa Maza"];
    const localities = localityNames.map(name => ({ name }));
    const localityIds = await insertAndGetIds('Locality', localities);
    console.log('Localidades insertadas con éxito:', localityIds);

    // Insertar Calles
    const streetNames = ["San Martin", "Belgrano", "Rivadavia", "Saavedra", "Moreno", "Alvear", "Guemes", "Pueyrredon", "Mitre", "Dorrego", "Yrigoyen", "Sarmiento", "Alberdi", "Velez Sarsfield", "Castelli", "Laprida", "Las Heras", "Balcarce", "Anchorena", "Zeballos"];
    const streets = streetNames.map(name => ({
      name,
      locality_id: chance.pickone(localityIds)
    }));
    const streetIds = await insertAndGetIds('Street', streets);
    console.log('Calles insertadas con éxito:', streetIds);

    // Generar e insertar Destinatarios (Recipients) y sus datos de contacto
    const { recipients, contactInfos } = generateRecipientsAndContacts(50, localityIds, streetIds);
    const recipientIds = await insertAndGetIds('Recipient', recipients);
    console.log('Destinatarios insertados con éxito:', recipientIds);
    const contactInfoIds = await insertAndGetIds('ContactInfo', contactInfos);
    console.log('Datos de contacto insertados con éxito:', contactInfoIds);

    // Insertar Factores de Riesgo (RiskFactors) con referencia a Destinatarios existentes
    const riskFactorNames = ["recien nacido", "escabiosis", "diabetes", "incumplimiento de controles de salud", "TBC", "cáncer", "discapacidad", "parásitos", "enfermedad mental", "embarazo", "TRAB", "falta de esquema de  acunación", "adulto mayor con limitaciones", "anemia", "sífilis", "alcoholismo", "enfermedad neurológica", "adicción a drogas", "hipertensión", "HIV/ sida", "desnutrición", "puerperio", "otro"];
    const riskFactors = recipientIds.map(recipientId => ({
      name: chance.pickone(riskFactorNames),
      gravity: chance.pickone(['Alta', 'Media', 'Baja']),
      type: chance.pickone(['Salud', 'Seguridad', 'Otro']),
      recipients: [{ recipient_id: recipientId }]
    }));
    const riskFactorIds = await insertAndGetIds('RiskFactor', riskFactors);
    console.log('Factores de Riesgo insertados con éxito:', riskFactorIds);

    // Insertar Condiciones Sociales (SocialConditions) con referencia a Destinatarios existentes
    const socialConditionNames = ["flia sola con menores de 5 anos", "flia sola con menores de 14 anos", "bajo nivel de instruccion", "emergencia habitacional", "situacion de abandono", "indigencia", "abandono paterno", "abandono materno", "pobreza", "desocupación jefe de hogar", "trabajo inestable jefe de hogar", "madre sola con menores"];
    const socialConditions = recipientIds.map(recipientId => ({
      name: chance.pickone(socialConditionNames),
      gravity: chance.pickone(['Alta', 'Media', 'Baja']),
      type: chance.pickone(['Económica', 'Educacional', 'Familiar']),
      recipients: [{ recipient_id: recipientId }]
    }));
    const socialConditionIds = await insertAndGetIds('SocialCondition', socialConditions);
    console.log('Condiciones Sociales insertadas con éxito:', socialConditionIds);

  } catch (error) {
    console.error('Error insertando datos:', error);
  } finally {
    connection.end();
  }
}

main();

// model RiskFactor {
//   id           Int       @id @default(autoincrement())
//   name         String
//   gravity      String
//   type         String
//   recipients   RecipientRiskFactor[] @relation("RiskFactorToRecipientRiskFactor")
// }

// model SocialCondition {
//   id           Int       @id @default(autoincrement())
//   name         String
//   gravity      String
//   type         String
//   recipients   RecipientSocialCondition[] @relation("SocialConditionToRecipientSocialCondition")
// }

// model RecipientRiskFactor {
//   recipient_id   Int
//   risk_factor_id Int
//   recipient      Recipient   @relation(fields: [recipient_id], references: [id])
//   risk_factor    RiskFactor  @relation(fields: [risk_factor_id], references: [id], name: "RiskFactorToRecipientRiskFactor")
//   @@id([recipient_id, risk_factor_id]) // Composite primary key
// }

// model RecipientSocialCondition {
//   recipient_id        Int
//   social_condition_id Int
//   recipient           Recipient       @relation(fields: [recipient_id], references: [id])
//   social_condition    SocialCondition @relation(fields: [social_condition_id], references: [id], name: "SocialConditionToRecipientSocialCondition")
//   @@id([recipient_id, social_condition_id]) // Composite primary key
// }


// model Recipient {
//   id                Int               @id @default(autoincrement())
//   first_name        String
//   last_name         String
//   birth_date        DateTime
//   dni               Int               @unique
//   sex               String
//   enrollment_date   DateTime
//   is_active         Boolean
//   // family_group_id   Int
//   // family_group      FamilyGroup       @relation(fields: [family_group_id], references: [id])
//   contact_info     ContactInfo[]
//   risk_factors      RecipientRiskFactor[]  // Definir la relación con RiskFactor
//   social_conditions RecipientSocialCondition[]
//   Assignment        Assignment[]
// }
