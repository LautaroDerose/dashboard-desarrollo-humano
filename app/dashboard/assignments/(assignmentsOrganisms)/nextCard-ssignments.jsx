'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";

export default function NextCardAssignments({ proximos }) {
 
  return(
    <Card >
      <CardHeader>
        <CardTitle>Proximos Vencimientos</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {
          proximos.map((item) => (
            <div key={item.id} className="flex flex-col ">
              <div className="flex items-center gap-x-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  {/* <AvatarImage src="/path/to/image" alt={`${item.recipient.first_name} ${item.recipient.last_name}`} /> */}
                  <AvatarFallback>
                    {item.recipient.first_name.charAt(0)}
                    {item.recipient.last_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {`${item.recipient.first_name} ${item.recipient.last_name}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.benefit.name}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  {new Date(item.expiry_date).toLocaleDateString()}
                </div>
              </div>
                <Separator className="mt-4" />
            </div>
          ))
        }
      </CardContent>
    </Card>
  )
}