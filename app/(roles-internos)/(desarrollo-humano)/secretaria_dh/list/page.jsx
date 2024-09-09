// import { auth } from "@/auth"
import ClientTS from "@/app/(roles-internos)/(desarrollo-humano)/trabajador_social/list/(table)/client-table-ts"
import ClientTableSecretaria from "./(table)/client-table-sec"


export default async function TSPage() {

  // const session = await auth()

  // if (session?.user?.role !== "subsecretaria") {
  //  return <div>No eres administrador</div>
  // }
  return(
    <div className="">
    {/* <SimpleNavbar /> */}
     <ClientTableSecretaria />
     {/* <pre>
        {
          JSON.stringify(assignments, null, 2)
        }
      </pre> */}
    </div>
  )
}