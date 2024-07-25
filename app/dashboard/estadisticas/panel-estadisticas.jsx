'use client'
import RecentsTableAssignments from "./(assignmentsOrganisms)/recentsTable-assignments";
import NextCardAssignments from "./(assignmentsOrganisms)/nextCard-ssignments";
import StatusCardEstadisticas from "./(assignmentsOrganisms)/statusCards-estadisticas";
import TotalSuscribers from "@/components/graphics/TotalSuscribers";
import { useEffect, useState } from "react";
import { getInfoForGraphics } from "@/actions/estadisticas-actions"
import Calculator from "./(assignmentsOrganisms)/calculator";
import TotalCards from "./(assignmentsOrganisms)/totalCards-assignments";

export function PanelEstdisticas({ assignments, benefits, recipients }) {
  

  return (
    <div className="flex  w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-4 md:px-8 ">
        <StatusCardEstadisticas/>
        <div className=" grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {/* <RecentsTableAssignments /> */}
          <TotalCards />
          <Calculator />
        </div>
      </main>
    </div>
  )
}