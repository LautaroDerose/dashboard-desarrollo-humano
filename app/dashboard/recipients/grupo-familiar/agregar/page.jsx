import { getFamilyData } from "@/actions/recipient-actions";
import UpdateFamilyGroup from "./form-updateIdFamiliar";

export default async function AddRecipient() {

  let data;
  try {
    data = await getFamilyData()
  } catch (error) {
    console.error("Error loading recipient data:", error);
    return <div>Error en la carga de datos por favor intente mas tarde.</div>;
  }
  
  const { recipients, recipientsWithFamilyId } = data;

  return(
    <div>
      <UpdateFamilyGroup recipients={recipients} recipientsWithFamilyId={recipientsWithFamilyId} />
    </div>
  )
}