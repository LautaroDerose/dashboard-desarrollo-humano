import { getInfoCards } from "@/actions/assignment-actions";
import StatusCardAssignments from "./(assignmentsOrganisms)/statusCards-assignments";
import RecentsTableAssignments from "./(assignmentsOrganisms)/recentsTable-assignments";
import NextCardAssignments from "./(assignmentsOrganisms)/nextCard-ssignments";


export default async function AssignmentsPage() {
  let data;
  try {
    // Llamada a la API en el componente de servidor
    data = await getInfoCards();
  } catch (error) {
    console.error("Error loading assignment data:", error);
    return <div>Error en la carga de datos por favor intente mas tarde.</div>;
  }

  const { rechazados, enProceso, pendientes, concretados, enRevision, recientes, proximosVencimientos } = data;

  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-4 md:px-8 ">
        <StatusCardAssignments
          rechazados={rechazados}
          enProceso={enProceso}
          pendientes={pendientes}
          concretados={concretados}
          enRevision={enRevision}
        />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <RecentsTableAssignments recents={recientes} />
          <NextCardAssignments proximos={proximosVencimientos} />
        </div>
      </main>
    </div>
  );
}