
import { RecipientForm } from "./recipient-form";

async function fetchData() {
  const response = await fetch('http://localhost:3000/api/create-person');
  const data = await response.json();
  return data;
}

export default async function RecipientFormPage() {
  const { localities, recipientSocialConditions, socialConditions } = await fetchData()

  return (
    <div className=" flex justify-center mx-auto mt-8 max-w-[600px]">
      <RecipientForm 
        localities={localities} 
        recipientSocialConditions={recipientSocialConditions} 
        socialConditions={socialConditions} 
      />
      {/* <LocalitiesAndStreets allData={allData} /> */}
    </div>
  );
}


// import { RecipientForm } from "./recipient-form";

// async function fetchData() {
//   const response = await fetch('http://localhost:3000/api/create-person');
//   const data = await response.json();
//   return data;
// }

// export default async function RecipientFormPage() {
//   const { localities, socialConditions, riskFactors } = await fetchData()

//   return (
//     <div className=" flex justify-center mx-auto mt-8 max-w-[600px]">
//       <RecipientForm 
//         localities={localities} 
//         socialConditions={socialConditions} 
//         riskFactors={riskFactors}  
//       />
//       {/* <LocalitiesAndStreets allData={allData} /> */}
//     </div>
//   );
// }

