import prisma from "@/lib/prisma";
import FormActionRecipient from "../form-action-recipient";
import { activatedRecipient, toggleRecipientActiveStatus } from "@/actions/recipient-actions";

export default async function PruebaPage() {
  // Traer los datos necesarios de la base de datos
  const recipients = await prisma.recipient.findMany({
    where: {
      is_active: false
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
      <h1 className="mb-6">Beneficiarios inactivos</h1>
      <ul className="grid grid-cols-2">
        {recipients.map((recipient) => (
          <li key={recipient.id} className="flex w-fit gap-20 justify-between my-1">
            <p>{recipient.first_name} {recipient.last_name}</p>
            <form action={activatedRecipient}>
            <input type="hidden" name="recipientId" value={recipient.id} />
            <button className="px-2 py-1 bg-slate-500 rounded-lg">Activar </button>
            </form>
            {/* <p>{recipient.contact_info?.locality?.name}</p>
            <p>{recipient.contact_info?.street?.name} {recipient.contact_info?.street_number}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
}