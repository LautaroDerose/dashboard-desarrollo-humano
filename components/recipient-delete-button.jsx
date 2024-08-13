import { activatedRecipient, deleteRecipient, desactivatedRecipient } from "@/actions/recipient-actions";
import { Button } from "./ui/button";

export default function RecipientDeleteButton({recipientId}) {

  return(
    <form action={desactivatedRecipient} >
      <input type="hidden" name="recipientId" value={recipientId} />
      <Button variant="destructive" >
        Dar de baja beneficiario
      </Button>
    </form>
  )
}