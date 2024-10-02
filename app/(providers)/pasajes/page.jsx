import { getInfoTravel, completeTravelSubsidy } from "@/actions/provider-actions"
import TravelSubsidies from "./pasajes-provider-client"

export default async function TravelPage() {
  let data
  try {
    data = await getInfoTravel()
  } catch (error) {
    console.error("Error loading travel subsidy data:", error)
    return <div>Error en la carga de datos por favor intente mas tarde.</div>
  }

  const { pendingSubsidies, recentSubsidies } = data

  const handleComplete = async (id) => {
    'use server'
    const result = await completeTravelSubsidy(id)
    if (!result.success) {
      throw new Error(result.error)
    }
  }

  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-4 md:px-8">
        <TravelSubsidies 
          pendingSubsidies={pendingSubsidies} 
          recentSubsidies={recentSubsidies}
          onComplete={handleComplete}
        />
      </main>
    </div>
  )
}
