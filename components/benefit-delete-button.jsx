import { deleteBenefit } from "@/actions/benefit-action";
import { Button } from "./ui/button";

export default function BenefitDeleteButton({benefitId}) {

  return(
    <form action={deleteBenefit} >
      <input type="hidden" name="benefitId" value={benefitId} />
      <button >
        Eliminar Beneficio
      </button>
    </form>
  )
}