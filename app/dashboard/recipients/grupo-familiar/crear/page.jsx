import { getFamilyData } from "@/actions/recipient-actions";
import CreateFamilyGroup from "./form-createIdFamiliar";

export default async function AddRecipient() {

  let data;
  try {
    data = await getFamilyData()
  } catch (error) {
    console.error("Error loading recipient data:", error);
    return <div>Error en la carga de datos por favor intente mas tarde.</div>;
  }
  
  const { recipients } = data;

  return(
    <div>
      <CreateFamilyGroup recipients={recipients}  />
    </div>
  )
}