const Chance = require('chance');
const chance = new Chance();
const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'gateway01.us-east-1.prod.aws.tidbcloud.com',
  user: 'ETwKGahcWQESD1s.root',
  password: '0gPiGlEGChfx3egV',
  database: 'test', 
  port: 4000,
  ssl: {
    rejectUnauthorized: true  // Asegura que TLS esté habilitado
  }
});

// Listas de palabras para cada tabla
const benefitCategoriesNames = ["Subsidios", "Provedores", "Entregas", "Otros" ];
const benefitNames = ["Luz", "Gas", "Consulta Medica", "estudio médico", "Traslados", "Materiales Subsidiados", "Alquiler", "Necesidades basicas", "Mercaderia", "Materiales en Municipio", "Garrafa", "Leña", "Pasajes", "Agua", "Atmosférico", "Credencial Hospitalaria" ];
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
      // family_group_id: null, // No se incluye en la inserción
    });
    contactInfos.push({
      phone: chance.phone({ formatted: false }),
      email: chance.email(),
      street_id: chance.pickone(streetIds),
      street_number: chance.integer({ min: 1, max: 1000 }),
      locality_id: localityId,
      recipient_id: i + 1, // Asumiendo que los IDs de recipient comienzan en 1
    });
  }
  return { recipients, contactInfos };
}

async function main() {
  try {
    // Insertar Localidades
    const localities = localityNames.map(name => ({ name }));
    const localityIds = await insertAndGetIds('Locality', localities);
    console.log('Localidades insertadas con éxito:', localityIds);

    // Insertar Calles
    const streets = streetNames.map(name => ({
      name,
      locality_id: chance.pickone(localityIds)
    }));
    const streetIds = await insertAndGetIds('Street', streets);
    console.log('Calles insertadas con éxito:', streetIds);

    // Insertar Beneficio Categorías
    const benefitCategoryIds = await insertAndGetIds('BenefitCategory', benefitCategoriesNames.map(name => ({ name })));
    console.log('Categorías de Beneficios insertadas con éxito:', benefitCategoryIds);

    // Insertar Beneficios
    const benefits = benefitNames.map(name => ({
      name,
      category_id: chance.pickone(benefitCategoryIds)
    }));
    const benefitIds = await insertAndGetIds('Benefit', benefits);
    console.log('Beneficios insertados con éxito:', benefitIds);

    // Generar y insertar Recipientes
    const { recipients, contactInfos } = generateRecipientsAndContacts(50, localityIds, streetIds);
    const recipientIds = await insertAndGetIds('Recipient', recipients);
    console.log('Recipientes insertados con éxito:', recipientIds);
    const contactInfoIds = await insertAndGetIds('ContactInfo', contactInfos);
    console.log('Información de contacto insertada con éxito:', contactInfoIds);

    // Insertar Condiciones Sociales y relacionarlas con los Recipientes
    const socialConditionIds = await insertAndGetIds('SocialCondition', socialConditionNames.map(name => ({ name })));
    console.log('Condiciones Sociales insertadas con éxito:', socialConditionIds);

    const recipientSocialConditions = [];
    for (const recipientId of recipientIds) {
      const randomSocialCondition = chance.pickone(socialConditionIds);
      recipientSocialConditions.push({
        recipient_id: recipientId,
        social_condition_id: randomSocialCondition
      });
    }
    const recipientSocialConditionIds = await insertAndGetIds('RecipientSocialCondition', recipientSocialConditions);
    console.log('Condiciones Sociales insertadas con éxito:', recipientSocialConditionIds);

  } catch (error) {
    console.error('Error insertando datos:', error);
  } finally {
    connection.end();
  }
}

main();