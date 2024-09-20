import { getRecipientsAndBenefits } from "@/actions/general-actions";
import FormGarrafa from "./client-garrafa";

export default async function FormGarrafaPage() {
  
  let data;
  try {
    // Llamada a la API en el componente de servidor
    data = await getRecipientsAndBenefits();
  } catch (error) {
    console.error("Error loading assignment data:", error);
    return <div>Error en la carga de datos por favor intente mas tarde.</div>;
  }
  const { recipients } = data;

  return(
    <div>
      <FormGarrafa recipients={recipients} />
    </div>
  )
}