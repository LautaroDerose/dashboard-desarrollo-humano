// import { auth } from "@/auth"
import ClientTableTS from "@/app/(roles-internos)/(desarrollo-humano)/trabajador_social/list/(table)/client-table-ts"


export default async function TSPage() {

  // const session = await auth()

  // if (session?.user?.role !== "subsecretaria") {
  //  return <div>No eres administrador</div>
  // }
  return(
    <div className="">
    {/* <SimpleNavbar /> */}
     <ClientTableTS />
     {/* <pre>
        {
          JSON.stringify(assignments, null, 2)
        }
      </pre> */}
    </div>
  )
}