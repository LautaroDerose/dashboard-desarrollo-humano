// import { auth } from "@/auth"
import ClientPanelContaduria from "@/components/(roles-internos)/contaduriaa/client-panel"
import LogoutButton from "@/components/auth/logout-button"


export default async function ContaduriaPage() {

  // const session = await auth()

  // if (session?.user?.role !== "subsecretaria") {
  //  return <div>No eres administrador</div>
  // }
  return(
    <div className="">
    {/* <SimpleNavbar /> */}
     <ClientPanelContaduria />
     {/* <pre>
        {
          JSON.stringify(assignments, null, 2)
        }
      </pre> */}
    </div>
  )
}



// <div className="container">
    //   subsecretaria
    //   <pre>
    //     {
    //       JSON.stringify(session, null, 2)
    //     }
    //   </pre>
    //   <LogoutButton />
    // </div>