export default function FormattedDate ({ date, fallback }) {
  if (!date || new Date(date).getFullYear() < 2020) {
    return fallback;
  }

  const isoDate = new Date(date).toISOString().split('T')[0]; // "2024-09-25"
  const [year, month, day] = isoDate.split('-');
  
  return`${day}/${month}/${year}`;
}

// {
//   !assignment?.HospitalCredential?.visit_date || 
//   new Date(assignment?.HospitalCredential?.visit_date).getFullYear() < 2020
//     ? "fecha a definir"
//     : (() => {
//         const isoDate = new Date(assignment?.HospitalCredential?.visit_date).toISOString().split('T')[0]; // "2024-09-25"
//         const [year, month, day] = isoDate.split('-');
//         return `${day}/${month}/${year}`; // "25/09/2024"
//       })()
// }