import { deleteRecipient } from "@/actions/recipient-actions";
import { Button } from "../ui/button";

export default function RecipientDeleteButton({recipientId}) {

  return(
    <form action={deleteRecipient} >
      <input type="hidden" name="recipientId" value={recipientId} />
      <Button variant="destructive" >
        Dar de baja beneficiario
      </Button>
    </form>
  )
}