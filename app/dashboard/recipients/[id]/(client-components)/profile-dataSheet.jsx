import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";

function calculateAge(birthDateString) {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

function getInitials(firstName, lastName) {
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
  const initials = firstInitial + lastInitial
  return initials;
}

export default function ProfileDataSheet({ recipient }) {

  const contactInfo = recipient.contact_info || {};
  const socialConditions = recipient.recipientSocialConditions || {};
  const age = calculateAge(recipient.birth_date)
  const initials = getInitials(recipient.first_name, recipient.last_name)

  return (
    <Card className="w-1/4">
      <CardHeader className="flex items-center justify-center mx-auto">
        <Avatar className=" w-20 h-20">
          {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="" /> */}
          <AvatarFallback className="font-bolds text-3xl">{initials}</AvatarFallback>
        </Avatar>
        <CardTitle> {recipient.first_name} {recipient.last_name}</CardTitle>
        <CardDescription>
          {recipient.sex} |  {age} años de edad
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex justify-between">
           <span className="font-extralight  ">Fecha de nacimiento: </span>
           <p>
           {recipient.birth_date ? (
              <>
                {new Date(new Date(recipient.birth_date).getTime() + 86400000).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </>
            ) : "No especificada"}
           </p>
          </div>
          <Separator/>
          <div className="flex justify-between">
           <span className="font-extralight  ">DNI: </span><p>{recipient.dni}</p>
          </div>
          <Separator/>
          <div className="flex justify-between">
           <span className="font-extralight  ">Localidad: </span><p>{contactInfo.locality.name}</p>
          </div>
          <Separator/>
          <div className="flex justify-between">
            <span className="font-extralight  ">Direccion: </span><p>{contactInfo.street.name}{" "}{contactInfo.street_number}</p>
          </div>
          <Separator/>
          <div className="flex justify-between">
            <span className="font-extralight  ">Telefono: </span><p>{contactInfo.phone}</p>
          </div>
          <Separator/>
          <div className="flex justify-between">
            <span className="font-extralight  ">Email: </span><p>{contactInfo.email}</p>
          </div>
          <Separator/>
          <div>
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
  )
}