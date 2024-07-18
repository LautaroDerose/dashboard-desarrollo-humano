
//                 <div>
//                   {isLoading ? (
//                     <p>Loading...</p>
//                   ) : (
//                     <TableBody>
//                       {recientes.map((item) => (
//                         <TableRow key={item.id}>
//                           <TableCell>
//                             <div className="font-medium">{item.benefit?.name || 'Beneficio no disponible'}</div>
//                             <div className="hidden text-sm text-muted-foreground md:inline">
//                               {item.quantity}/{item.amount}
//                             </div>
//                           </TableCell>
//                           <TableCell className="">
//                             {new Date(item.expiry_date).toLocaleDateString()}
//                           </TableCell>
//                           <TableCell className="">
//                             <Badge className="text-xs" variant="outline">
//                               {item.status}
//                             </Badge>
//                           </TableCell>
//                           <TableCell className="">
//                             {item.recipient?.first_name} {item.recipient?.last_name}
//                           </TableCell>
//                           <TableCell className="text-right">
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button variant="ghost" className="h-8 w-8 p-0">
//                                   <span className="sr-only">Open menu</span>
//                                   <TbDots className="h-4 w-4" />
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end">
//                                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                                 <DropdownMenuItem
//                                   onClick={() => navigator.clipboard.writeText(item.recipient.id)}
//                                 >
//                                   Copiar ID de Persona
//                                 </DropdownMenuItem>
//                                 <DropdownMenuSeparator />
//                                 <DropdownMenuItem>Editar</DropdownMenuItem>
//                                 <DropdownMenuItem>Eliminar</DropdownMenuItem>
//                                 <DropdownMenuItem>Ver en detalle</DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   )}
//                 </div>


'use client'

import { useEffect, useState } from "react";
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ChevronLeft, ChevronRight, Copy, CreditCard, File, Home, LineChart, ListFilter, MoreVertical, Package, Package2, PanelLeft, Search, Settings, ShoppingCart, Truck, Users2 } from "lucide-react"
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineInsertDriveFile } from "react-icons/md";
import { MdCheck, MdClose, MdInfoOutline, MdMoreHoriz, MdOutlinePause, MdArrowOutward, MdAssignmentAdd, MdOutlinePriorityHigh } from "react-icons/md"
import { TbDots } from "react-icons/tb";

import FormModalAssignment from "./form-modal-assignment";
import FormActionAssignment from "./form-action-assignment";
import { getInfoCards } from "@/actions/assignment-actions";
import { Separator } from "@/components/ui/separator";



export function PanelAssignment({ assignments, benefits, recipients }) {

  const [rechazados, setRechazados] = useState()
  const [pendientes, setPendientes] = useState()
  const [enProceso, setEnProceso] = useState()
  const [concretado, setConcretado] = useState()
  const [recientes, setRecientes] = useState()
  const [proximos, setProximos] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData(){
      try {
        const data = await getInfoCards();
        setRechazados(data.rechazados)
        setPendientes(data.pendientes)
        setEnProceso(data.enProcesos)
        setConcretado(data.concretados)
        setProximos(data.proximosVencimientos)
        setRecientes(data.recientes)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
      // const [ rechazados, enProceso, pendiente, concretado, recientes, proximosVencimientos ] = await getInfoCards();
    }
    fetchData();
  }, [])
 
  const [openModalCreate, setOpenModalCreate] = useState(false)
  return (
    <div className="flex  w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-4 md:px-8 md:py-2">
      <div>
        <Card x-chunk="dashboard-01-chunk-0 " className="p-4">
        {/* <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> */}
          {/* <CardTitle className="text-sm font-medium">
            Acciones
          </CardTitle> */}
          {/* <div className=" flex items-center justify-center border-2 p-1  border-red-200 w-8 h-8 rounded-full">
            <MdClose className="text-red-200" />
          </div> */}
        {/* </CardHeader> */}
        {/* <CardContent>
          <div className="text-2xl font-bold">3 Asignaciones</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent> */}
        <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <IoFilterSharp className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Archived
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <MdOutlineInsertDriveFile className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Dialog className="max-w-4xl" open={openModalCreate} onOpenChange={setOpenModalCreate} >
              <DialogTrigger asChild>
                <Button>
                  <MdAssignmentAdd className="h-5 w-5 mr-2" />
                  <p>Agregar Asignacion</p>
                </Button>
              </DialogTrigger>
              <DialogContent className="z-50">
                <DialogHeader>
                  <DialogTitle>Crear Asignacion</DialogTitle>
                  <DialogDescription>Una ddescripcion pertinente</DialogDescription>
                </DialogHeader>
                {/* <FormModalAssignment benefits={benefits} recipients={recipients} /> */}
                <FormActionAssignment benefits={benefits} recipients={recipients} />
              </DialogContent>
            </Dialog>
        </div>
      </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {/* <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Proximos vencimientos
              </CardTitle>
              <div className=" flex items-center justify-center border-2 p-1  border-orange-500 w-8 h-8 rounded-full">
                <MdOutlinePriorityHigh className="text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 Asignaciones</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card> */}
          <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
              <CardTitle className="text-sm font-medium">
                Rechazdos
              </CardTitle>
              {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
              <div className=" flex items-center justify-center border-2 p-1  border-red-200 w-6 h-6 rounded-full">
                <MdClose className="text-red-200" />
              </div>
                {/* <MdInfoOutline  /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rechazados} Asignacion/es</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
              <CardTitle className="text-sm font-medium">
                Pendientes
              </CardTitle>
              {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
              <div className=" flex items-center justify-center border-2 p-1  border-yellow-200 w-6 h-6 rounded-full">
                <MdOutlinePause className="text-yellow-200" />
              </div>

            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendientes} Asignacion/es</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
              <CardTitle className="text-sm font-medium">En procesos</CardTitle>
              <div className=" flex items-center justify-center border-2 p-1  border-blue-200 w-6 h-6 rounded-full">
                <MdMoreHoriz className="text-blue-200" />
              </div>
              {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enProceso} Asignacion/es</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
              <CardTitle className="text-sm font-medium">Concretado</CardTitle>
              <div className=" flex items-center justify-center border-2 p-1  border-green-200 w-6 h-6 rounded-full">
                <MdCheck className="text-green-200" />
              </div>
              {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{concretado} Asignacion/es</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className=" grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card
            className="xl:col-span-2"
          >
            <CardHeader className="flex flex-row py-2 items-center">
              <div className="grid gap-2">
                <CardTitle>Asignaciones recientes</CardTitle>
                {/* <CardDescription>
                  Recent transactions from your store.
                </CardDescription> */}
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/dashboard/assignments/list">
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
                     <TableBody>Loading...</TableBody>
                   ) : (
                     <TableBody>
                       {recientes.map((item) => (
                        
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
                             <Badge className="text-xs" variant="outline">
                               {item.status}
                             </Badge>
                           </TableCell>
                           <TableCell className="">
                             {new Date(item.expiry_date).toLocaleDateString()}
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
                                 <DropdownMenuItem
                                   onClick={() => navigator.clipboard.writeText(item.recipient.id)}
                                 >
                                   Copiar ID de Persona
                                 </DropdownMenuItem>
                                 <DropdownMenuSeparator />
                                 <DropdownMenuItem>Editar</DropdownMenuItem>
                                 <DropdownMenuItem>Eliminar</DropdownMenuItem>
                                 <DropdownMenuItem>Ver en detalle</DropdownMenuItem>
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
          <Card >
            <CardHeader>
              <CardTitle>Proximos Vencimientos</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
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
              )}
            </CardContent>
          </Card>
        </div>
        
      </main>
    </div>
  )
}



  // <TableBody>
    {/* <TableRow> */}
      {/* <TableCell> */}
        {/* <div className="font-medium">Material de construccion</div> */}
        {/* <div className="hidden text-sm text-muted-foreground md:inline"> */}
          {/* clavadera/tirantes/chapa */}
        {/* </div> */}
      {/* </TableCell> */}
      // <TableCell className="hidden xl:table-column">
      {/* <TableCell className=""> */}
        {/* 15/04/2024 */}
      {/* </TableCell> */}
      {/* <TableCell className=""> */}
        {/* <Badge className="text-xs" variant="outline"> */}
          {/* En proceso */}
        {/* </Badge> */}
      {/* </TableCell> */}
      {/* <TableCell className=" "> */}
        {/* Fulano */}
      {/* </TableCell> */}
      {/* <TableCell className="text-right"> */}
        {/* <DropdownMenu> */}
          {/* <DropdownMenuTrigger asChild> */}
            {/* <Button variant="ghost" className="h-8 w-8 p-0"> */}
              {/* <span className="sr-only">Open menu</span> */}
              {/* <TbDots  className="h-4 w-4" /> */}
            {/* </Button> */}
          {/* </DropdownMenuTrigger> */}
          {/* <DropdownMenuContent align="end"> */}
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(recipient.id)} > */}
              {/* Copiar ID de Persona */}
            {/* </DropdownMenuItem> */}
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem>Editar</DropdownMenuItem> */}
            {/* <DropdownMenuItem>Eliminar</DropdownMenuItem> */}
            {/* <DropdownMenuItem>Ver en  detalle</DropdownMenuItem> */}
          {/* </DropdownMenuContent> */}
        {/* </DropdownMenu> */}
      {/* </TableCell> */}
    {/* </TableRow> */}
    {/* <TableRow> */}
      {/* <TableCell> */}
        {/* <div className="font-medium">Servicios</div> */}
        {/* <div className="hidden text-sm text-muted-foreground md:inline"> */}
          {/* Luz/gas/agua */}
        {/* </div> */}
      {/* </TableCell> */}
      {/* <TableCell className=""> */}
      {/* <TableCell className="hidden xl:table-column"> */}
        {/* 04/072024 */}
      {/* </TableCell> */}
      {/* <TableCell className=""> */}
        {/* <Badge className="text-xs" variant="outline"> */}
          {/* pendiente */}
        {/* </Badge> */}
      {/* </TableCell> */}
      {/* <TableCell className=""> */}
        {/* Mengano */}
      {/* </TableCell> */}
      {/* <TableCell className="text-right"> */}
        {/* <DropdownMenu> */}
            {/* <DropdownMenuTrigger asChild> */}
              {/* <Button variant="ghost" className="h-8 w-8 p-0"> */}
                {/* <span className="sr-only">Open menu</span> */}
                {/* <MoreHorizontal  /> */}
                {/* <TbDots  className="h-4 w-4" /> */}
              {/* </Button> */}
            {/* </DropdownMenuTrigger> */}
            {/* <DropdownMenuContent align="end"> */}
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(recipient.id)} > */}
                {/* Copy recipient ID */}
              {/* </DropdownMenuItem> */}
              {/* <DropdownMenuSeparator /> */}
              {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
              {/* <DropdownMenuItem>View recipient details</DropdownMenuItem> */}
            {/* </DropdownMenuContent> */}
          {/* </DropdownMenu> */}
      {/* </TableCell> */}
    {/* </TableRow> */}
    {/*  */}
  {/* </TableBody> */}


  // <CardContent className="grid gap-8">
  //             <div className="flex items-center gap-4">
  //               <Avatar className="hidden h-9 w-9 sm:flex">
  //                 {/* <AvatarImage src="/avatars/01.png" alt="Avatar" /> */}
  //                 <AvatarFallback>CP</AvatarFallback>
  //               </Avatar>
  //               <div className="grid gap-1">
  //                 <p className="text-sm font-medium leading-none">
  //                   Carlos Perez
  //                 </p>
  //                 <p className="text-sm text-muted-foreground">
  //                   Bono Jubilados
  //                 </p>
  //               </div>
  //               <div className="ml-auto font-medium">05/06</div>
  //             </div>
  //             <div className="flex items-center gap-4">
  //               <Avatar className="hidden h-9 w-9 sm:flex">
  //                 {/* <AvatarImage src="/avatars/02.png" alt="Avatar" /> */}
  //                 <AvatarFallback>PG</AvatarFallback>
  //               </Avatar>
  //               <div className="grid gap-1">
  //                 <p className="text-sm font-medium leading-none">
  //                   Paula Gonzales
  //                 </p>
  //                 <p className="text-sm text-muted-foreground">
  //                   Servicio de luz
  //                 </p>
  //               </div>
  //               <div className="ml-auto font-medium">08/06</div>
  //             </div>
  //             <div className="flex items-center gap-4">
  //               <Avatar className="hidden h-9 w-9 sm:flex">
  //                 {/* <AvatarImage src="/avatars/03.png" alt="Avatar" /> */}
  //                 <AvatarFallback>FD</AvatarFallback>
  //               </Avatar>
  //               <div className="grid gap-1">
  //                 <p className="text-sm font-medium leading-none">
  //                   Fulano DeTal
  //                 </p>
  //                 <p className="text-sm text-muted-foreground">
  //                   Visita medica
  //                 </p>
  //               </div>
  //               <div className="ml-auto font-medium">29/06</div>
  //             </div>
  //             <div className="flex items-center gap-4">
  //               <Avatar className="hidden h-9 w-9 sm:flex">
  //                 {/* <AvatarImage src="/avatars/04.png" alt="Avatar" /> */}
  //                 <AvatarFallback>ML</AvatarFallback>
  //               </Avatar>
  //               <div className="grid gap-1">
  //                 <p className="text-sm font-medium leading-none">
  //                   Mengano Lopez
  //                 </p>
  //                 <p className="text-sm text-muted-foreground">
  //                   Servicio de gas
  //                 </p>
  //               </div>
  //               <div className="ml-auto font-medium">04/07</div>
  //             </div>
              
  //           </CardContent>