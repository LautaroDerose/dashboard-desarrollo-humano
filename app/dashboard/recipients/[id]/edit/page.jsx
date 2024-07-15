import prisma from "@/lib/prisma";
import FormEditRecipient from "./form-edit-recipient";
import { redirect } from "next/navigation";
// import { FormModalRecipient } from "../../form-modal-recipient";


async function getRecipientsData() {
  const res = await fetch('http://localhost:3000/api/contactinfo');
if (!res.ok) {
  throw new Error("Failed to fetch data");
}
const recipients = await res.json();
// console.log("Fetched recipients recipients:", recipients);  // Aquí
return recipients;
}


export default async function FormEditPage({ params }) {

  const recipients = getRecipientsData()

  // const recipientUnique = await prisma.recipient.findFirst({
  //   where: {
  //     id: parseInt(params.id)
  //   }
  // })

  if(!recipients) {
    // redirect("/")
    return <div>Error loading data</div>;
  }

  console.log("beneficiarios:", recipients)

  return (
    <div>
      <FormEditRecipient data={recipients}  />
      {/* <FormEditRecipient recipients={recipients} recipientUnique={recipientUnique} /> */}
    </div>
  );
}