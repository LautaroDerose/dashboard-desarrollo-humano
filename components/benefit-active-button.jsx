import { activatedBenefit, desactivatedBenefit } from "@/actions/benefit-action";
import { Button } from "./ui/button";

export default function BenefitActiveButton({benefitId}) {

  return(
    <form action={activatedBenefit} >
      <input type="hidden" name="benefitId" value={benefitId} />
      <button >
        Activar Beneficio
      </button>
    </form>
  )
}