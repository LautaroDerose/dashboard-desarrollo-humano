
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import CreateDecreeDocForm from "./form-doc-contaduria";
import { FaRegSquareCheck } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import CreatePaymentDocForm from "./form-doc-contaduria";
import prisma from "@/lib/prisma";


export default async function AssignmentDetail({ params }) {
  const id = params.id;
  const assignment = await prisma.assignment.findUnique({
    where: { id: parseInt(id) },
    include: {
      benefit: true,
      recipient: true,
      subsidy_stage: {
        include: {
          note_doc: true,
          decree_doc: true,
          expense_doc: true,
          payment_doc: true,
        },
      },

    }
  });
   
  const getStatusClass = (status) => {
    switch (status) {
      case "En Proceso":
        return "text-yellow-500";
      case "Pendiente":
        return "text-red-500";
      case "Concretado":
        return "text-green-500";
      default:
        return "";
    }
  };

  return (
    <div className="h-[86vh] mt-4">
      <Card className="w-[800px] flex flex-col mx-auto justify-center" >
          <CardHeader>
            <CardTitle className="grid grid-cols-2">
              <div>
              <span className="text-slate-400">Beneficiario:</span> {assignment.recipient.first_name} {assignment.recipient.last_name}
              </div>
              <div>
              <span className="text-slate-400">Beneficio:</span> {assignment.benefit.name} 
              </div>
            </CardTitle>
              <Separator /> 
            {/* <CardDescription>
              El Beneficiario cuenta con * asignaciones en los ultimos * años
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="font-light py-2 ">Fecha de Registro: <span className="font-bold ml-2">
                  {new Date(assignment.enrollment_date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span></p>
                <Separator />
              </div>
              <div>
                <p className="font-light py-2 ">Fecha de Vencimiento: 
                <span className="font-bold ml-2">
                  {new Date(assignment.expiry_date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span></p>
                <Separator />
              </div>
              <div>
                <p className="font-light py-2 ">Monto: <span className="font-bold ml-2"> {assignment.amount} </span></p>
                <Separator />
              </div>
              <div>
                <p className="font-light py-2 ">Cantidad: <span className="font-bold ml-2"> {assignment.quantity} </span></p>
                <Separator />
              </div>
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-bold">Documentos</h1>
              <div className="grid grid-cols-2 gap-3 ">
                <div>
                  <div className="flex items-center justify-between">
                  <p className="font-light py-2  ">Tipo: <span className="font-bold ml-2">Nota de Asignacion </span></p>
                  {  
                    assignment.subsidy_stage.note_doc.is_confirm
                    ? <FaRegSquareCheck className="text-2xl mr-4 text-green-400"/>
                    : <FaRegSquareCheck className="text-2xl mr-4 text-slate-500"/>
                  }
                  </div>
                  <Separator />
                </div>
                <div>
                  <p className="font-light py-2  ">Numero: <span className="font-bold ml-2"> {assignment.subsidy_stage.note_doc.doc_number} </span></p>
                  <Separator />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                  <p className="font-light py-2  ">Tipo: <span className="font-bold ml-2">Doc. de Decreto </span></p>
                  {  
                    assignment.subsidy_stage.decree_doc.is_confirm
                    ? <FaRegSquareCheck className="text-2xl mr-4 text-green-400"/>
                    : <FaRegSquareCheck className="text-2xl mr-4 text-slate-500"/>
                  }
                  </div>
                  <Separator />
                </div>
                <div>
                  <p className="font-light py-2  ">Numero: <span className="font-bold ml-2"> {assignment.subsidy_stage.decree_doc.doc_number} </span></p>
                  <Separator />
                </div>
                <div>
                  <p className="font-light py-2  ">Tipo: <span className="font-bold ml-2">Gasto Aprobado</span></p>
                  <Separator />
                </div>
                <div>
                  {
                    assignment.subsidy_stage.decree_doc.is_confirm
                    ? <CreatePaymentDocForm assignmentId={assignment.id} buttonName={"Crear Orden de pago"} />
                    : <Button variant="secondary" className="cursor-not-allowed " >Debes recibir el decreto fisico para crear orden </Button>
                  }
                  {/* <p className="font-light py-2  ">Numero: <span className="font-bold ml-2"> {assignment.subsidy_stage.decree_doc?.doc_number} </span></p>
                  <Separator /> */}
                </div>
              </div>
            </div>
            <p className="font-light py-2 mt-4 ">
              Estado de Asignación:
              <span className={`font-bold ml-2 ${getStatusClass(assignment.status)}`}> {assignment.status} </span>
            </p>
            <Separator />
          </CardContent>
        </Card>
    </div>
  );
}
