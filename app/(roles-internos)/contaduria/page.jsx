// import { auth } from "@/auth"
import { getInfoCards } from "@/actions/roles-actions/conta-actions";
import LogoutButton from "@/components/auth/logout-button"
import StatusCardAssignments from "./(components-panel)/statusCards-assignments";
import TablaSubseVencimientos from "./(components-panel)/vencimientos-contaduria";


export default async function ContaduriaPage() {
  
  let data;
  try {
    // Llamada a la API en el componente de servidor
    data = await getInfoCards();
  } catch (error) {
    console.error("Error loading assignment data:", error);
    return <div>Error en la carga de datos por favor intente mas tarde.</div>;
  }

  const { luz, gas, consulta, estudio, traslados, materiales, alquiler, necesidades, proximosVencimientos } = data

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