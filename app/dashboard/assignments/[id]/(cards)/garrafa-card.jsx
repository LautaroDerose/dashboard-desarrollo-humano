'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function GarrafaSubsidyCard({ assignment }) {
  const { GarrafaSubsidy } = assignment;

  // Verifica que `GarrafaSubsidy` no sea nulo o indefinido
  if (!GarrafaSubsidy) {
    return <p>No hay información disponible sobre el subsidio de agua.</p>;
  }

  return (
    <div>
      <Card className="w-[800px] flex flex-col mx-auto justify-center">
        <CardHeader>
          <CardTitle className="flex justify-around">
            Detalle del subsidio de Gas
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400">Número de Suministro</h2>
                <p>{GarrafaSubsidy.provider_name}</p>
              </div>
              <Separator />
            </div>
            <div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400">Valor de Suministro</h2>
                <p>{GarrafaSubsidy.verification_dni}</p>
              </div>
              <Separator />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}