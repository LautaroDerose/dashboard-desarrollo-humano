'use client'

import RecentsTableAssignments from "@/app/(roles-internos)/subsecretaria/(components-panel)/vencimientos-subse"
import StatusCardAssignments from "@/app/(roles-internos)/subsecretaria/(components-panel)/statusCards-assignments"
import TablaSubseVencimientos from "@/app/(roles-internos)/subsecretaria/(components-panel)/vencimientos-subse"


export default function ClientPanelSubsecretaria() {
  
    return (
      <div className="flex  w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 md:gap-4 md:px-8 ">
          <StatusCardAssignments />
          <div className=" ">
            <TablaSubseVencimientos />
          </div>
        </main>
      </div>
    )
  }
      // <div className="flex  w-full flex-col">
      //   <main className="flex flex-1 flex-col gap-4 md:gap-4 md:px-8 ">
      //     <StatusCardAssignments />
      //     <div className=" grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      //       <RecentsTableAssignments />
      //       <NextCardAssignments />
      //     </div>
      //   </main>
      // </div>