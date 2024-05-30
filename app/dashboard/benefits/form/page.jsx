import { RecipientForm } from "./recipient-form";

async function fetchData() {
  const response = await fetch('http://localhost:3000/api/create-assignment');
  const data = await response.json();
  return data;
}

export default async function RecipientFormPage() {
  const { assignments, recipients, benefits } = await fetchData()

  return (
    <div className=" flex justify-center mx-auto max-w-[600px]">
      <RecipientForm 
        assignments={assignments} 
        recipients={recipients} 
        benefits={benefits}  
      />
      {/* <LocalitiesAndStreets allData={allData} /> */}
    </div>
  );
}
