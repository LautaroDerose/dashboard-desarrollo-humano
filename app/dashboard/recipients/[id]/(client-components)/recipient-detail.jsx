'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function RecipientDetailView({ details }) {

  // console.log("Detalle de beneficiozs",details.assignmentsWithBenefitNames)

  return (
    <Card className="w-full">
    <CardHeader>
      <CardTitle>Detalles del Beneficiario</CardTitle>
      <CardDescription>Asignaciones del último mes y año</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="grid ">
            <p className="font-thin">Asignaciones del último mes: <span className="font-bold">{details.assignmentsLastMonth}</span></p>
            <p className="font-thin">Asignaciones del último año: <span className="font-bold">{details.assignmentsLastYear}</span></p>
          </div>
            <Separator />
          <div>
            <p className="font-thin">Asignaciones por tipo de beneficio:</p>
            <ul>
              {details.assignmentsWithBenefitNames.map((benefit) => (
                <li key={benefit.benefit_id}>
                  <span>{benefit.benefitName}</span>: {benefit._count._all}
                </li>
              ))}
            </ul>
          </div>
          <Separator />
          
          {details.familyGroup.length > 0 && (
            <>
              <p className="font-thin">Grupo familiar:</p>
              <ul>
                {details.familyGroup.map((familyMember) => (
                  <li key={familyMember.id}>
                    {familyMember.first_name} {familyMember.last_name} - DNI: {familyMember.dni}
                  </li>
                ))}
              </ul>
              <Separator />
            </>
          )}
          <p className="font-thin">Observaciones:</p>
          <ul>
            {details.observations.map((observation) => (
              <li key={observation.id}>
                <p>{observation.text} - <strong>{observation.subject}</strong></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardContent>
  </Card>
);
}