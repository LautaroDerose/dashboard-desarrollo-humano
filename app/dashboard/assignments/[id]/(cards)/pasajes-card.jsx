'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TravelSubsidyCard({ assignment }) {
  const { TravelSubsidy } = assignment;

  // Verifica que `TravelSubsidy` sea un array y tenga datos
  if (!TravelSubsidy || TravelSubsidy.length === 0) {
    return <p>No hay información disponible sobre el subsidio de viaje.</p>;
  }

  // Función para renderizar un tique de viaje
  const renderTicket = (ticketNumber, subsidy) => {
    const destination = subsidy[`destination${ticketNumber}`];
    const date = subsidy[`date${ticketNumber}`];
    const passengerType = subsidy[`passenger_type${ticketNumber}`];
    const name = subsidy[`name${ticketNumber}`];
    const dni = subsidy[`dni${ticketNumber}`];
    const amount = subsidy[`amount${ticketNumber}`];
    const provider = subsidy[`provider${ticketNumber}`];

    if (!destination || !date || !passengerType || !name || !dni || !amount || !provider) {
      return null; // No mostrar el tique si alguno de los campos principales es nulo
    }

    return (
      <div key={ticketNumber}>
        <CardHeader>
          <CardTitle className="flex justify-around">
            Detalle del Pasaje {ticketNumber}
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400">Destino</h2>
                <p>{destination}</p>
              </div>
              <Separator />
            </div>
            <div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400">Fecha</h2>
                <p>{new Date(date).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}</p>
              </div>
              <Separator />
            </div>
            <div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400">Tipo de Pasajero</h2>
                <p>{passengerType}</p>
              </div>
              <Separator />
            </div>
            <div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400">Nombre</h2>
                <p>{name}</p>
              </div>
              <Separator />
            </div>
            <div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400">DNI</h2>
                <p>{dni}</p>
              </div>
              <Separator />
            </div>
            <div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400">Monto</h2>
                <p>{amount}</p>
              </div>
              <Separator />
            </div>
            <div>
              <div className="flex">
                <h2 className="mr-4 text-slate-400">Proveedor</h2>
                <p>{provider}</p>
              </div>
              <Separator />
            </div>
          </div>
        </CardContent>
      </div>
    );
  };

  return (
    <div>
      <Card className="w-[800px] flex flex-col mx-auto justify-center">
        <CardHeader>
          <CardTitle className="flex justify-around">
            Detalle del Subsidio de Viaje
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          {/* Recorrer el array de TravelSubsidy y renderizar los tiques del 1 al 4 para cada subsidio */}
          {TravelSubsidy.map((subsidy, index) => (
            <div key={index}>
              {renderTicket(1, subsidy)}
              {renderTicket(2, subsidy)}
              {renderTicket(3, subsidy)}
              {renderTicket(4, subsidy)}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}