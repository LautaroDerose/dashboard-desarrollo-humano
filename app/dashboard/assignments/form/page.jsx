import AssignmentForm from "./assignment-form";

async function fetchData() {
  const response = await fetch('http://localhost:3000/api/create-assignment');
  const data = await response.json();
  return data;
}


export default async function AssignmentsFormPage() {
  const { assignments, recipients, benefits } = await fetchData()

  return (
    <div className="flex justify-center mx-auto mt-8 max-w-[600px]">
      <AssignmentForm 
        assignments={assignments}
        recipients={recipients}
        benefits={benefits}
      />
    </div>
  );
}

// import AssignmentForm from "./assignment-form";

// async function fetchData() {
//   const response = await fetch('http://localhost:3000/api/create-assignment');
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.error || 'Error fetching data');
//   }
//   const data = await response.json();
//   return data;
// }

// export default async function AssignmentsFormPage() {
//   try {
//     const { assignments, recipients, benefits } = await fetchData();

//     return (
//       <div className="flex justify-center mx-auto">
//         <AssignmentForm 
//           assignments={assignments}
//           recipients={recipients}
//           benefits={benefits}
//         />
//       </div>
//     );
//   } catch (error) {
//     return (
//       <div className="flex justify-center mx-auto">
//         <p>Error: {error.message}</p>
//       </div>
//     );
//   }
// }