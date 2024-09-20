'use client'

import AtmosfericoSubsidyCard from "./atmosferico-card";
import CredentialSubsidyCard from "./credential-card";
import GarrafaSubsidyCard from "./garrafa-card";
import TravelSubsidyCard from "./pasajes-card";
import SubsidyCard from "./subsidy-card";
import WaterSubsidyCard from "./water-card";

export default function RenderSubsidyCard({ assignment }) {
  console.log(assignment); // Verifica la estructura del objeto assignment
  const benefitId = assignment.benefit?.id; // Asegurarte de acceder correctamente

  switch (benefitId) {
    case 1: 
    case 2: 
    case 3: 
    case 4: 
    case 5: 
    case 6: 
    case 7: 
    case 8: 
      return <div><SubsidyCard assignment={assignment} /></div>;
    case 9: 
    case 10: 
      return <div>Detalles de beneficio no disponible</div>;
    case 11: 
      return <GarrafaSubsidyCard assignment={assignment} />;
    case 12: 
      return <div>Detalles de beneficio de Lena no disponible</div>;
    case 13: 
      return <TravelSubsidyCard assignment={assignment} />;
    case 14: 
      return <WaterSubsidyCard assignment={assignment} />;
    case 15: 
      return <AtmosfericoSubsidyCard assignment={assignment} />;
    case 16: 
      return <CredentialSubsidyCard assignment={assignment} />;
    default:
      return <div>Sin componentes {benefitId}</div>;
  }
}