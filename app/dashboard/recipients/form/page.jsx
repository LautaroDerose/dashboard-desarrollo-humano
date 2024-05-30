
import { RecipientForm } from "./recipient-form";

async function fetchData() {
  const response = await fetch('http://localhost:3000/api/create-person');
  const data = await response.json();
  return data;
}

export default async function RecipientFormPage() {
  const { localities, socialConditions, riskFactors } = await fetchData()

  return (
    <div className=" flex justify-center mx-auto">
      <RecipientForm 
        localities={localities} 
        socialConditions={socialConditions} 
        riskFactors={riskFactors}  
      />
      {/* <LocalitiesAndStreets allData={allData} /> */}
    </div>
  );
}

// import { RecipientForm } from "./recipient-form";

// async function fetchLocalities() {
//   const response = await fetch('http://localhost:3000/api/localities');
//   const data = await response.json();
//   return data;
// }

// export default async function RecipientFormPage() {
//   const data = await fetchLocalities();

//   return (
//     <div className=" flex justify-center mx-auto">
//       <RecipientForm data={data} />
//       {/* <LocalitiesAndStreets allData={allData} /> */}
//     </div>
//   );
// }