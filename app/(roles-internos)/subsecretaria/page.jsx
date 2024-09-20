// import { auth } from "@/auth"
import ClientPanelSubsecretaria from "@/app/(roles-internos)/subsecretaria/client-panel-subse"
import LogoutButton from "@/components/auth/logout-button"
import StatusCardAssignments from "./(components-panel)/statusCards-assignments"
import TablaSubseVencimientos from "./(components-panel)/vencimientos-subse"
import { getInfoCards } from "@/actions/roles-actions/subse-actions";


export default async function SubsecretariaPage() {

  let data;
  try {
    // Llamada a la API en el componente de servidor
    data = await getInfoCards();
  } catch (error) {
    console.error("Error loading assignment data:", error);
    return <div>Error en la carga de datos por favor intente mas tarde.</div>;
  }

  const { proximosVencimientos } = data

  // const session = await auth()

  // if (session?.user?.role !== "subsecretaria") {
  //  return <div>No eres administrador</div>
  // }
  return(
    <div className="flex  w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-4 md:px-8 ">
        <StatusCardAssignments {...data} />
        <div className=" ">
          <TablaSubseVencimientos proximosVencimientos={proximosVencimientos} />
        </div>
      </main>
    </div>
  )
}
//   return(
//     <div className="">
//      <ClientPanelSubsecretaria />
//      {/* <pre>
//         {
//           JSON.stringify(assignments, null, 2)
//         }
//       </pre> */}
//     </div>
//   )
// }



// <div className="container">
    //   subsecretaria
    //   <pre>
    //     {
    //       JSON.stringify(session, null, 2)
    //     }
    //   </pre>
    //   <LogoutButton />
    // </div>