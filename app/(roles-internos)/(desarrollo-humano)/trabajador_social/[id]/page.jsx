
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import FormattedDate from "@/components/formatted-data";
import FormTsObservation from "./form-ts-observation";
import ReusableDialogForm from "./reusable-dialog-form";
import FormTsVisit from "./form-ts-visit";
import ObservationCard from "./observation-card";
import FormVisitConfirm from "./form-visit-confirm";
import prisma from "@/lib/prisma";

export default async function AssignmentDetail({ params }) {
  
  const { id } = params;
  // const id = parseInt(params.id, 10);
  
  const assignment = await prisma.assignment.findUnique({
    where: { id: parseInt(id) },
    include: {
      Observation:{
        where: { is_active: true }
      },
      benefit: true,
      HospitalCredential: true,
      recipient: {
        include: {
          // observation:true,
          recipientSocialConditions: {
            include: { social_condition: true },
          },
          contact_info:{
            include:{
              locality: true,
              street: true,
            }
          },
        }
      },
    }
  });
  const socialConditions = assignment.recipient.recipientSocialConditions || {}
  const observations = assignment.Observation || []
  
  return (
    <div className="h-[86vh] mt-4 flex flex-col gap-3">
      <Card className="w-[800px] flex flex-col mx-auto justify-center">
        <CardHeader>
          <CardTitle className=" flex items-center justify-between text-2xl font-bold">
            Estado de tramite
            <ReusableDialogForm assignmentId={assignment.id} nameButton={"Confirmar Visita"} dialogTitle={"Confirmar visita realizada"} dialogDescription={"Recuerde que antes de confirmar debe enviar antes el informe socio-economico a secretaria "} FormComponent={FormVisitConfirm} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="">
          
          </div>
        </CardContent>
      </Card>
      <Card className="w-[800px] flex flex-col mx-auto justify-center" >
        <CardHeader >
         <div className="flex justify-between gap-3">
          <div className="w-full">
            <div className="flex items-center py-2">
              <span className="text-slate-400  mr-2">Beneficiario:</span> 
              <span>{assignment.recipient.first_name} {assignment.recipient.last_name}</span>
            </div>
            <Separator /> 
          </div>
          <div className="w-full">
            <div className="flex items-center py-2">
              <span className="text-slate-400  mr-2">Beneficio:</span> 
              <span>{assignment.benefit.name} </span>
            </div>
            <Separator />
          </div> 
         </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center">
                <p className="font-light py-2 ">Fecha de Registro: </p>
                <div className="font-bold ml-2">
                  {new Date(assignment.enrollment_date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div>
              </div>
              <Separator />
            </div>
            <div>
              <div className="flex items-center">
                <p className="font-light py-2 ">Fecha de Vencimiento: </p>
                <div className="font-bold ml-2">
                  {new Date(assignment.expiry_date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div>
              </div>
              <Separator />
            </div>
            <div className="w-full ">
              <div className="flex items-center">
                <p className="font-light py-2  ">TS asignado: </p>
                <span className="font-bold ml-2">{assignment?.HospitalCredential?.ts_name} </span>
              </div>
              <Separator />
            </div>
            <div className="w-full">
              <div className="flex w-full items-center">
                <p className="font-light py-2 ">Fecha de visita: </p>
                <div className="font-bold ml-2">
                  <FormattedDate date={assignment?.HospitalCredential?.visit_date} fallback={"Fecha a definir"} />
                </div>
              </div>
              <Separator />
            </div>
            <div className="w-full">
              <div className="flex w-full items-center">
                <p className="font-light py-2  ">TS asignado: </p>
                <span className="font-bold ml-2">{assignment?.HospitalCredential?.visiting_shift} </span>
              </div>
              <Separator /> 
            </div>
            <div>
              <ReusableDialogForm assignmentId={assignment.id} phone={assignment.recipient.contact_info.phone} nameButton={"Editar datos"} dialogTitle={"Crear de Visita Domiciliaria"} FormComponent={FormTsVisit} />
              {/* <DetailForm assignmentId={assignment.id} phone={assignment.recipient.contact_info.phone} /> */}
            </div>
            </div>
            {/* <div>
              <form>
                <input type="hidden" name="assignmentId" value={assignment.id} />
                {
                  assignment?.HospitalCredential?.visit_confirm
                  ? "Fecha confirmada"
                  : <button type="submit"> Confirmar Fecha </button>
                }
              </form>
            </div> */}
        </CardContent>
      </Card>
      <Card className="w-[800px] flex flex-col mx-auto justify-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Informacion de contacto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="">
            <div className="grid grid-cols-2 gap-3 ">
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-light py-2  ">Localidad: </p>
                  <span className="font-bold ml-2">{assignment.recipient.contact_info.locality.name} </span>
                </div>
                <Separator />
              </div>
              <div>
                <div className="flex items-center">
                  <p className="font-light py-2  ">Direccion: </p>
                  <span className="font-bold ml-2">
                    {assignment.recipient.contact_info.street.name}{" "}{assignment.recipient.contact_info.street_number}
                  </span>
                </div>
                <Separator />
              </div>
              <div>
                <div className="flex items-center">
                  <p className="font-light py-2  ">Telefono: </p>
                  <span className="font-bold ml-2">
                    {assignment.recipient.contact_info.phone}
                  </span>
                </div>
                <Separator />
              </div>
              <div>
                <div className="flex items-center">
                  <p className="font-light py-2  ">Correo Electronico: </p>
                  <span className="font-bold ml-2">
                    {assignment.recipient.contact_info.email}
                  </span>
                </div>
                <Separator />
              </div>
            </div>
            <div className="mt-2">
              <span className="font-extralight">Condición Social: </span>
              <div className="flex flex-wrap gap-2">
                {socialConditions.map((condition) => (
                  <div key={condition.id}  >
                    <Badge className=" w-full text-sm" >
                      {condition.social_condition.name}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-[800px] flex flex-col mx-auto justify-center">
        <CardHeader>
          <CardTitle className=" flex items-center justify-between text-2xl font-bold">
            Observaciones
            <ReusableDialogForm assignmentId={assignment.id} recipientId={assignment.recipient.id} phone={assignment.recipient.contact_info.phone} nameButton={"Crear Observacion"} dialogTitle={"Crear Informe de Observacion"} FormComponent={FormTsObservation} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="">
          {observations.length > 0 ? (
              observations.map((observation) => (
                <ObservationCard
                  key={observation.id}
                  observation={observation}
                  // disableObservation={disableObservation} // Acción para deshabilitar la observación
                />
              ))
            ) : (
              <p>No hay observaciones registradas.</p>
            )}
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}
