import { getRecipientsAndBenefits } from "@/actions/general-actions";
import FormPassages from "./client-pasajes";

export default async function FormularioPasajes() {
  
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
      {/* <FormActionOther /> */}
      <FormPassages recipients={recipients} />
    </div>
  )
}