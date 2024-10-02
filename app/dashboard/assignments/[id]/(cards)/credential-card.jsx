'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CredentialSubsidyCard({ assignment }) {
  const { HospitalCredential } = assignment;

  // Verifica que `HospitalCredential` no sea nulo o indefinido
  if (!HospitalCredential) {
    return <p>No hay información disponible sobre el subsidio de agua.</p>;
  }

  return (
    <div>
      <Card className="w-[800px] flex flex-col mx-auto justify-center">
        <CardHeader>
          <CardTitle className="flex justify-around">
            Detalle del subsidio de Agua
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400">Número de Suministro</h2>
                <p>{HospitalCredential.supply_number}</p>
              </div>
              <Separator />
            </div>
            <div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400">Valor de Suministro</h2>
                <p>{HospitalCredential.supply_value}</p>
              </div>
              <Separator />
            </div>
            <div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400">1er Vencimiento</h2>
                <p>{new Date(HospitalCredential.first_expiry).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}</p>
              </div>
              <Separator />
            </div>
            <div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400">2do Vencimiento</h2>
                <p>{new Date(HospitalCredential.second_expiry).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}</p>
              </div>
              <Separator />
            </div>
          </div>
          <div className="flex my-2">
            <h3 className="mr-4 text-slate-400">Periodo del subsidio:</h3>
            {new Date(HospitalCredential.period).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </div>
            <Separator />
        </CardContent>
      </Card>
    </div>
  );
}