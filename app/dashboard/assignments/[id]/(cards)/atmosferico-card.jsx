'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AtmosfericoSubsidyCard({ assignment }) {
  const { AtmosphericOrder } = assignment;

  // Verifica que `AtmosphericOrder` no sea nulo o indefinido
  if (!AtmosphericOrder) {
    return <p>No hay información disponible sobre el subsidio de agua.</p>;
  }

  return (
    <div>
      <Card className="w-[800px] flex flex-col mx-auto justify-center">
        <CardHeader>
          <CardTitle className="flex justify-around">
            Detalle del subsidio Atmosferico
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400">Fecha deseada</h2>
                {/* <p>{formatDate(AtmosphericOrder.desired_service_date)}</p> */}
                <p>{new Date(AtmosphericOrder.desired_service_date).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}</p>
              </div>
              <Separator />
            </div>
            <div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400">Dirección</h2>
                <p>{AtmosphericOrder.address}</p>
              </div>
              <Separator />
            </div>
            <div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400">Teléfono</h2>
                <p>{AtmosphericOrder.phone}</p>
              </div>
              <Separator />
            </div>
          </div>
          {
            AtmosphericOrder.complication_desc
            ? (
              <div>
                <p>{AtmosphericOrder.complication_desc}</p>
              </div>
            )
            : null
          }
          {
            AtmosphericOrder.payment_confirmed
              ? (
                <div className="mt-4">
                  <div className="flex">
                    <h2 className="mr-4 text-slate-400">Fecha de pago efectuado</h2>
                    <p>{new Date(AtmosphericOrder.payment_date).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}</p>
                  </div>
                  <Separator />
                  {
                    AtmosphericOrder.task_confirmed
                      ? (
                        <div>
                          <div className="flex">
                            <h2 className="mr-4 text-slate-400">Se concluyó la tarea la fecha:</h2>
                            {/* <p>{formatDate(AtmosphericOrder.task_date)}</p> */}
                            <p>{new Date(AtmosphericOrder.task_date).toLocaleDateString("es-ES", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}</p>
                          </div>
                          <Separator />
                        </div>
                      )
                      : <div className="flex w-full mt-2"><p>No se ha confirmado la tarea</p></div>
                  }
                </div>
              )
              : <p>Pago pendiente</p>
            }
        </CardContent>
      </Card>
    </div>
  );
}
