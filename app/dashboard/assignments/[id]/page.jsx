
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";

export default async function AssignmentDetail({ params }) {
  const id = params.id;
  const assignment = await prisma.assignment.findUnique({
    where: { id: parseInt(id) },
    include: {
      benefit: true,
      recipient: true
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
