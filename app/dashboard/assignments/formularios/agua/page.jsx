import { getRecipientsAndBenefits } from "@/actions/general-actions";
import FormWaterSubsidy from "./form-waterSubsidy";

export default async function FormularioAgua() {
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
      <FormWaterSubsidy recipients={recipients} />
    </div>
  )
}