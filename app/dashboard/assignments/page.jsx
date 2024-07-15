import { PanelAssignment } from "./panel-assignment";

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
        <PanelAssignment data={data}/>
    </div>
 )
}

