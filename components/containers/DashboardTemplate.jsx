// import Link from "next/link"

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar"

// import {
//   ChevronLeft,
//   ChevronRight,
//   Copy,
//   CreditCard,
//   File,
//   Home,
//   LineChart,
//   ListFilter,
//   MoreVertical,
//   Package,
//   Package2,
//   PanelLeft,
//   Search,
//   Settings,
//   ShoppingCart,
//   Truck,
//   Users2,
// } from "lucide-react"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs"

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// import { 
//   MdCheck, 
//   MdClose, 
//   MdInfoOutline, 
//   MdMoreHoriz, 
//   MdOutlinePause,
//   MdArrowOutward, 
//   MdOutlinePauseCircle, 
//   MdOutlinePriorityHigh 
// } from "react-icons/md"

// export function Dashboard() {
//   return (
//     <div className="flex min-h-screen w-full flex-col">
//       <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
//         <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
//           {/* <Card x-chunk="dashboard-01-chunk-0">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 Proximos vencimientos
//               </CardTitle>
//               <div className=" flex items-center justify-center border-2 p-1  border-orange-500 w-8 h-8 rounded-full">
//                 <MdOutlinePriorityHigh className="text-orange-500" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">3 Asignaciones</div>
//               <p className="text-xs text-muted-foreground">
//                 +20.1% from last month
//               </p>
//             </CardContent>
//           </Card> */}
//           <Card x-chunk="dashboard-01-chunk-0">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 Rechazdos
//               </CardTitle>
//               {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
//               <div className=" flex items-center justify-center border-2 p-1  border-red-200 w-8 h-8 rounded-full">
//                 <MdClose className="text-red-200" />
//               </div>
//                 {/* <MdInfoOutline  /> */}
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">3 Asignaciones</div>
//               <p className="text-xs text-muted-foreground">
//                 +20.1% from last month
//               </p>
//             </CardContent>
//           </Card>
//           <Card x-chunk="dashboard-01-chunk-1">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 Pendientes
//               </CardTitle>
//               {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
//               <div className=" flex items-center justify-center border-2 p-1  border-yellow-200 w-8 h-8 rounded-full">
//                 <MdOutlinePause className="text-yellow-200" />
//               </div>

//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">1 Asignacion</div>
//               <p className="text-xs text-muted-foreground">
//                 +180.1% from last month
//               </p>
//             </CardContent>
//           </Card>
//           <Card x-chunk="dashboard-01-chunk-2">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">En procesos</CardTitle>
//               <div className=" flex items-center justify-center border-2 p-1  border-blue-200 w-8 h-8 rounded-full">
//                 <MdMoreHoriz MdCheck className="text-blue-200" />
//               </div>
//               {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">15 Asignaciones</div>
//               <p className="text-xs text-muted-foreground">
//                 +19% from last month
//               </p>
//             </CardContent>
//           </Card>
//           <Card x-chunk="dashboard-01-chunk-3">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Concretado</CardTitle>
//               <div className=" flex items-center justify-center border-2 p-1  border-green-200 w-8 h-8 rounded-full">
//                 <MdCheck className="text-green-200" />
//               </div>
//               {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">40 Asignaciones</div>
//               <p className="text-xs text-muted-foreground">
//                 +201 since last hour
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//         <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
//           <Card
//             className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
//           >
//             <CardHeader className="flex flex-row items-center">
//               <div className="grid gap-2">
//                 <CardTitle>Beneficios disponibles</CardTitle>
//                 {/* <CardDescription>
//                   Recent transactions from your store.
//                 </CardDescription> */}
//               </div>
//               <Button asChild size="sm" className="ml-auto gap-1">
//                 <Link href="#">
//                   View All
//                   <MdArrowOutward  className="h-4 w-4" />
//                 </Link>
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Tipo de Beneficios</TableHead>
//                     <TableHead className="hidden xl:table-column">
//                       Type
//                     </TableHead>
//                     <TableHead className="hidden xl:table-column">
//                       Status
//                     </TableHead>
//                     <TableHead className="">
//                       Monto
//                     </TableHead>
//                     <TableHead className="text-right">Cantidad</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell>
//                       <div className="font-medium">Material de construccion</div>
//                       <div className="hidden text-sm text-muted-foreground md:inline">
//                         clavadera/tirantes/chapa
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       Sale
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       <Badge className="text-xs" variant="outline">
//                         Approved
//                       </Badge>
//                     </TableCell>
//                     <TableCell className=" ">
//                       $000
//                     </TableCell>
//                     <TableCell className="text-right">15</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>
//                       <div className="font-medium">Servicios</div>
//                       <div className="hidden text-sm text-muted-foreground md:inline">
//                         Luz/gas/agua
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       Refund
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       <Badge className="text-xs" variant="outline">
//                         Declined
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="">
//                       $340000
//                     </TableCell>
//                     <TableCell className="text-right">----</TableCell>
//                   </TableRow>
                  
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//           <Card x-chunk="dashboard-01-chunk-5">
//             <CardHeader>
//               <CardTitle>Proximos Vencimientos</CardTitle>
//             </CardHeader>
//             <CardContent className="grid gap-8">
//               <div className="flex items-center gap-4">
//                 <Avatar className="hidden h-9 w-9 sm:flex">
//                   <AvatarImage src="/avatars/01.png" alt="Avatar" />
//                   <AvatarFallback>CP</AvatarFallback>
//                 </Avatar>
//                 <div className="grid gap-1">
//                   <p className="text-sm font-medium leading-none">
//                     Carlos Perez
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     Bono Jubilados
//                   </p>
//                 </div>
//                 <div className="ml-auto font-medium">05/06</div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Avatar className="hidden h-9 w-9 sm:flex">
//                   <AvatarImage src="/avatars/02.png" alt="Avatar" />
//                   <AvatarFallback>PG</AvatarFallback>
//                 </Avatar>
//                 <div className="grid gap-1">
//                   <p className="text-sm font-medium leading-none">
//                     Paula Gonzales
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     Servicio de luz
//                   </p>
//                 </div>
//                 <div className="ml-auto font-medium">08/06</div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Avatar className="hidden h-9 w-9 sm:flex">
//                   <AvatarImage src="/avatars/03.png" alt="Avatar" />
//                   <AvatarFallback>FD</AvatarFallback>
//                 </Avatar>
//                 <div className="grid gap-1">
//                   <p className="text-sm font-medium leading-none">
//                     Fulano DeTal
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     Visita medica
//                   </p>
//                 </div>
//                 <div className="ml-auto font-medium">29/06</div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Avatar className="hidden h-9 w-9 sm:flex">
//                   <AvatarImage src="/avatars/04.png" alt="Avatar" />
//                   <AvatarFallback>ML</AvatarFallback>
//                 </Avatar>
//                 <div className="grid gap-1">
//                   <p className="text-sm font-medium leading-none">
//                     Mengano Lopez
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     Servicio de gas
//                   </p>
//                 </div>
//                 <div className="ml-auto font-medium">04/07</div>
//               </div>
              
//             </CardContent>
//           </Card>
//         </div>
        
//       </main>
//     </div>
//   )
// }