import prisma from "@/lib/prisma";
import FormActionRecipient from "../list/form-action-recipient";
import { activatedRecipient, toggleRecipientActiveStatus } from "@/actions/recipient-actions";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="mt-4">
      <Card >
        <CardHeader>
          <CardTitle>
            Beneficiarios inactivos
          </CardTitle>
        </CardHeader>
      </Card>
      <ul className="grid grid-cols-3 gap-x-10 m-4">
        {recipients.map((recipient) => (
          <li key={recipient.id} className="flex flex-col w-full gap-2 my-1">
            <div className="flex justify-between items-center ">
              <p>{recipient.first_name} {recipient.last_name}</p>
              <form action={activatedRecipient}>
                <input type="hidden" name="recipientId" value={recipient.id} />
                <button className="px-2 py-1 bg-slate-500 rounded-lg">Activar </button>
              </form>
            </div>
            <Separator />
            {/* <p>{recipient.contact_info?.locality?.name}</p>
            <p>{recipient.contact_info?.street?.name} {recipient.contact_info?.street_number}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
}