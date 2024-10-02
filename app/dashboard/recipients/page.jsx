import Link from "next/link";
import StatusCardRecipients from "./(recipientsOrganisms)/statusCards-recipients";
import { getRecipientStats } from "@/actions/recipient-actions";
import { Separator } from "@/components/ui/separator";
import RecipientCharts, { PieCharts } from "./(recipientsOrganisms)/pie-chart";
import { Card } from "@/components/ui/card";

export default async function PersonasHomePage() {

  let data;
  try {
    data = await getRecipientStats();
  } catch (error) {
    console.error("Error loading assignment data:", error);
    return <div>Error en la carga de datos por favor intente mas tarde.</div>;
  }

  const { menoresDe18, entre18Y25, entre18Y35, entre26Y35, entre36Y50, entre50Y60, mayoresDe60, masculino, femenino, recipientsWithLocalitiesNames } = data

  return(
    <Card className="mt-4">
    <Separator/>
      <main>
        <StatusCardRecipients 
          menoresDe18={menoresDe18}
          entre18Y35={entre18Y35}
          // entre18Y25={entre18Y25}
          // entre26Y35={entre26Y35}
          entre36Y50={entre36Y50}
          entre50Y60={entre50Y60}
          mayoresDe60={mayoresDe60}
          masculino={masculino}
          femenino={femenino}
          recipientsWithLocalitiesNames={recipientsWithLocalitiesNames}
          // localidades={localidades}
        />
        {/* <PieCharts /> */}
        {/* <RecipientCharts 
          menoresDe18={menoresDe18}
          entre18Y35={entre18Y35}
          // entre18Y25={entre18Y25}
          // entre26Y35={entre26Y35}
          entre36Y50={entre36Y50}
          entre50Y60={entre50Y60}
          mayoresDe60={mayoresDe60}
          masculino={masculino}
          femenino={femenino}
          recipientsWithLocalitiesNames={recipientsWithLocalitiesNames}
          // localidades={localidades}
        /> */}
      </main>
    </Card>
  )
}