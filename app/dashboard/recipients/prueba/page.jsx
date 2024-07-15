import prisma from "@/lib/prisma";
import FormActionRecipient from "../form-action-recipient";

export default async function PruebaPage() {
  // Traer los datos necesarios de la base de datos
  const recipients = await prisma.recipient.findMany({
    where: {
      is_active: true
    },
    include: {
      contact_info: {
        include: {
          street: true,
          locality: true
        }
      },
      recipientSocialConditions: {
        include: {
          social_condition: true
        }
      }
    }
  });

  return (
    <div>
      <h1>All Recipients</h1>
      <div className="mb-4">
        <FormActionRecipient />
      </div>
      <ul>
        {recipients.map((recipient) => (
          <li key={recipient.id} className="flex w-fit gap-20 justify-between">
            <p>{recipient.first_name} {recipient.last_name}</p>
            <p>{recipient.contact_info[0]?.locality?.name}</p>
            <p>{recipient.contact_info[0]?.street?.name} {recipient.contact_info[0]?.street_number}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


  // Para traer todas las localities, streets, y socialConditions por separado
  // const localities = await prisma.locality.findMany();
  // const streets = await prisma.street.findMany();
  // const socialConditions = await prisma.socialCondition.findMany();

  // console.log(recipients);
  // console.log(localities);
  // console.log(streets);
  // console.log(socialConditions);
