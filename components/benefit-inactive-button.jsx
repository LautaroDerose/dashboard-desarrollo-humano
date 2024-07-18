import { desactivatedBenefit } from "@/actions/benefit-action";
import { Button } from "./ui/button";

export default function BenefitInactiveButton({benefitId}) {

  return(
    <form action={desactivatedBenefit} >
      <input type="hidden" name="benefitId" value={benefitId} />
      <button >
        Desactivar Beneficio
      </button>
    </form>
  )
}