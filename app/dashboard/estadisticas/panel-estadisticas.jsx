'use client'
import DoubleEntryTable from "./(estadisticasOrganisms)/(table)/data-table";
import Calculator from "./(estadisticasOrganisms)/calculator";
import TotalCards from "./(estadisticasOrganisms)/totalCards-assignments";

export function PanelEstdisticas({ assignments, benefits, recipients }) {
  

  return (
    <div className="flex  w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-4 md:px-8 ">
          <TotalCards />
        <div className=" flex">
          {/* <RecentsTableAssignments /> */}
          {/* <Calculator /> */}
          <DoubleEntryTable />
        </div>
      </main>
    </div>
  )
}