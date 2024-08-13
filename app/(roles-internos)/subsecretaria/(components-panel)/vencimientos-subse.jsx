'use client'

import { getInfoCards } from "@/actions/subse-actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useEffect, useState } from "react"
import { MdArrowOutward } from "react-icons/md"
import { TbDots } from "react-icons/tb"

export default function TablaSubseVencimientos() {
  const [vencimientos, setVencimientos] = useState()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData(){
      try {
        const data = await getInfoCards();
        const expiry = data.proximosVencimientos
        console.log("proximos", expiry)
        setVencimientos(data.proximosVencimientos)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
      // const [ rechazados, enProceso, pendiente, concretado, recientes, proximosVencimientos ] = await getInfoCards();
    }
    fetchData();
  }, [])


  return(
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row py-2 items-center">
        <div className="grid gap-2">
          <CardTitle>Asignaciones recientes</CardTitle>
          {/* <CardDescription>
            Recent transactions from your store.
          </CardDescription> */}
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/subsecretaria/list">
            Ver mas
            <MdArrowOutward  className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo de Beneficios</TableHead>
              <TableHead className="">
                Persona
              </TableHead>
              <TableHead className="">
                Estado
              </TableHead>
              <TableHead className="">
                Suministro fissico
              </TableHead>
              <TableHead className="">
                Registro
              </TableHead>
              <TableHead className="">
                Monto
              </TableHead>
              <TableHead className="">
                Cantidad
              </TableHead>
              <TableHead className="text-right">actions</TableHead>
            </TableRow>
          </TableHeader>
             {isLoading ? (
              <TableBody>
                <TableRow>
                  <TableCell>Loading...</TableCell>
                </TableRow>
              </TableBody>
             ) : (
               <TableBody>
                 {vencimientos.map((item) => (
                  
                   <TableRow key={item.id}>
                     <TableCell>
                       <div className="font-medium">{item.benefit.name}</div>
                       {/* <div className="hidden text-sm text-muted-foreground md:inline">
                         {item.quantity}/{item.amount}
                       </div> */}
                     </TableCell>
                     <TableCell className="">
                     {`${item.recipient.first_name} ${item.recipient.last_name}`} 
                     </TableCell>
                     <TableCell className="">
                       {
                        item.subsidy_id ? "Recibido" : "En espera"
                       }
                     </TableCell>
                     <TableCell className="">
                       <Badge className="text-xs" variant="outline">
                         {item.status}
                       </Badge>
                     </TableCell>
                     <TableCell className="">
                       {new Date(item.enrollment_date).toLocaleDateString()}
                     </TableCell>
                     <TableCell className="">
                       {item.amount}
                     </TableCell>
                     <TableCell className="">
                       {item.quantity}
                     </TableCell>
                     <TableCell className="text-right">
                       <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                           <Button variant="ghost" className="h-8 w-8 p-0">
                             <span className="sr-only">Open menu</span>
                             <TbDots className="h-4 w-4" />
                           </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent align="end">
                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
                           {/* <DropdownMenuItem
                             onClick={() => navigator.clipboard.writeText(item.assignment.id)}
                           >
                             Copiar ID de Persona
                           </DropdownMenuItem> */}
                           <DropdownMenuSeparator />
                           <DropdownMenuItem>Editar</DropdownMenuItem>
                           <DropdownMenuItem>Eliminar</DropdownMenuItem>
                           <Link href={`/subsecretaria/${item.id}`}>
                            <DropdownMenuItem>Ver en detalle</DropdownMenuItem>
                          </Link>
                         </DropdownMenuContent>
                       </DropdownMenu>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             )}
        </Table>
      </CardContent>
    </Card>
  )
}