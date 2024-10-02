import { getInfoGarrafa, confirmarEntregaGarrafa } from "@/actions/provider-actions"
import GarrafaAssignments from "./garrafa-provider-client"

export default async function GarrafaPage() {
  let data
  try {
    data = await getInfoGarrafa()
  } catch (error) {
    console.error("Error loading assignment data:", error)
    return <div>Error en la carga de datos por favor intente mas tarde.</div>
  }

  const { proximosVencimientos, entregasRecientes } = data

  const handleConfirm = async (id) => {
    'use server'
    const result = await confirmarEntregaGarrafa(id)
    if (!result.success) {
      throw new Error(result.error)
    }
  }

  return (
    <div className="flex w-full flex-col p-4">
      <main className="flex flex-1 flex-col gap-4 md:gap-4 md:px-8">
        <GarrafaAssignments 
          proximosVencimientos={proximosVencimientos} 
          entregasRecientes={entregasRecientes}
          onConfirm={handleConfirm}
        />
      </main>
    </div>
  )
}

// import { getInfoGarrafa } from "@/actions/provider-actions"
// import prisma from "@/lib/prisma"
// import GarrafaAssignments from "./garrafa-provider-client"

// export default async function GarrafaPage() {
//   let data
//   try {
//     data = await getInfoGarrafa()
//   } catch (error) {
//     console.error("Error loading assignment data:", error)
//     return <div>Error en la carga de datos por favor intente mas tarde.</div>
//   }

//   const { proximosVencimientos } = data

//   const handleConfirm = async (id) => {
//     'use server'
//     try {
//       await prisma.garrafaSubsidy.update({
//         where: { assignment_id: id },
//         data: { 
//           is_confirm: true,
//           confirmed_at: new Date()
//         }
//       })
//     } catch (error) {
//       console.error("Error confirming assignment:", error)
//       throw error
//     }
//   }

//   return (
//     <div className="flex w-full flex-col">
//       <main className="flex flex-1 flex-col gap-4 md:gap-4 md:px-8">
//         <GarrafaAssignments
//           assignments={proximosVencimientos} 
//           onConfirm={handleConfirm}
//         />
//       </main>
//     </div>
//   )
// }

// // import { auth } from "@/auth"
// import LogoutButton from "@/components/auth/logout-button"

// // import { getInfoCards } from "@/actions/roles-actions/subse-actions";
// import { getInfoGarrafa } from "@/actions/provider-actions";


// export default async function GarrafaPage() {

//   let data;
//   try {
//     // Llamada a la API en el componente de servidor
//     data = await getInfoGarrafa();
//   } catch (error) {
//     console.error("Error loading assignment data:", error);
//     return <div>Error en la carga de datos por favor intente mas tarde.</div>;
//   }

//   const { proximosVencimientos } = data

//   // const session = await auth()

//   // if (session?.user?.role !== "subsecretaria") {
//   //  return <div>No eres administrador</div>
//   // }
//   return(
//     <div className="flex  w-full flex-col">
//       <main className="flex flex-1 flex-col gap-4 md:gap-4 md:px-8 ">
//       <pre>
//         {
//           JSON.stringify(data, null, 2)
//         }
//       </pre>
//       </main>
//     </div>
//   )
// }
//     // <div className="flex  w-full flex-col">
//     //   <main className="flex flex-1 flex-col gap-4 md:gap-4 md:px-8 ">
//     //     <StatusCardAssignments {...data} />
//     //     <div className=" ">
//     //       <TablaSubseVencimientos proximosVencimientos={proximosVencimientos} />
//     //     </div>
//     //   </main>
//     // </div>



// // <div className="container">
//     //   subsecretaria
//     //   <pre>
//     //     {
//     //       JSON.stringify(session, null, 2)
//     //     }
//     //   </pre>
//     //   <LogoutButton />
//     // </div>