import { getRecipientsAndBenefits } from "@/actions/general-actions";
import FormSubsidy from "./client-subsidios";

export default async function FormSubsidyPage() {
  let data;
  try {
    // Llamada a la API en el componente de servidor
    data = await getRecipientsAndBenefits();
  } catch (error) {
    console.error("Error loading assignment data:", error);
    return <div>Error en la carga de datos por favor intente mas tarde.</div>;
  }
  const { recipients, benefits } = data;

  return(
    <div>
      <FormSubsidy recipients={recipients} benefits={benefits} />
    </div>
  )
}