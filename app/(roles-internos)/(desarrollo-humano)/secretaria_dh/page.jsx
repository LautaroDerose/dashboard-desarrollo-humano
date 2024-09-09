import ClientHomeSec from "./client-sec";
import RecentsCredentials from "./recent-secre";

export default function HomeSecretaria() {
  return(
    <div className=" p-4">
      <ClientHomeSec />
      <div className="mt-4">
        <RecentsCredentials/>
      </div>
    </div>
  )
}