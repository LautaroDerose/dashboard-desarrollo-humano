
import StatusCardAssignments from "./(assignmentsOrganisms)/statusCards-assignments";
import RecentsTableAssignments from "./(assignmentsOrganisms)/recentsTable-assignments";
import NextCardAssignments from "./(assignmentsOrganisms)/nextCard-ssignments";

export function PanelAssignment() {
// export function PanelAssignment({ assignments, benefits, recipients }) {

  return (
    <div className="flex  w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-4 md:px-8 ">
        <StatusCardAssignments />
        <div className=" grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <RecentsTableAssignments />
          <NextCardAssignments />
        </div>
      </main>
    </div>
  )
}