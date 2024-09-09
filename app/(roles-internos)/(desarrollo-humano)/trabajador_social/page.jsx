// import { auth } from "@/auth"
import LogoutButton from "@/components/auth/logout-button"
import ClientHomeTs from "./client-ts"


export default async function TSPage() {

  // const session = await auth()

  // if (session?.user?.role !== "subsecretaria") {
  //  return <div>No eres administrador</div>
  // }
  return(
    <div className="">
      <ClientHomeTs />
    </div>
  )
}

{/* <pre>
   {
     JSON.stringify(assignments, null, 2)
   }
 </pre> */}


// <div className="container">
    //   subsecretaria
    //   <pre>
    //     {
    //       JSON.stringify(session, null, 2)
    //     }
    //   </pre>
    //   <LogoutButton />
    // </div>