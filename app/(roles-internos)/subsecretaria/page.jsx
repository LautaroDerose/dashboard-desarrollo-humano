// import { auth } from "@/auth"
import ClientPanelSubsecretaria from "@/components/(roles-internos)/subsecretaria/client-panel"
import LogoutButton from "@/components/auth/logout-button"


export default async function SubsecretariaPage() {

  // const session = await auth()

  // if (session?.user?.role !== "subsecretaria") {
  //  return <div>No eres administrador</div>
  // }
  return(
    <div className="">
    {/* <SimpleNavbar /> */}
     <ClientPanelSubsecretaria />
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