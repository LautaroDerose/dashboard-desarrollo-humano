import { TooltipProvider } from "@/components/ui/tooltip";
import { PanelAssignment } from "./panel-assignment";
import { Dashboard } from "./form/assignment-form";

async function getAssignments() {
  try {
    const res = await fetch('http://localhost:3000/api/assignment');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    throw error;
  }
}

export default async function AssignmentsPage() {
  const data = await getAssignments();
  // console.log(data)
  if (!data) {
    return <div>Error loading data</div>;
  }
  
  // console.log("Data passed to DataTable:", data);  // Aquí

  return (
    <div>
      {/* <ContentAssignment data={data}  /> */}
        <PanelAssignment data={data}/>
        {/* <Dashboard /> */}
    </div>
 )
}

//------------funcion para CONTACT INFO
// async function getContactinfo() {
//   try {
//     const res = await fetch('/api/contactinfo'); // Usa la ruta relativa
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch data:", error.message);
//     throw error;
//   }
// }

// import AssignmentsContent from "./content";

// export default async function AssignmentsPage() {
//   try {
//     const data = await getContactinfo();
//     c;h
//     if (!data) {
//       return <div>Error loading data</div>;
//     }
//     return (
//       <div>
//         <AssignmentsContent data={data} />
//       </div>
//     );
//   } catch (error) {
//     console.error("Error rendering page:", error.message);
//     return <div>Error loading data</div>;
//   }
// }