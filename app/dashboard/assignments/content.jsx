'use client'
import { useState, useEffect } from "react";
import AssignmentForm from "./form";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [editingAssignment, setEditingAssignment] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await fetch("/api/assignments");
      const data = await res.json();
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const handleSave = async (assignmentData) => {
    try {
      const method = editingAssignment ? "PUT" : "POST";
      const url = editingAssignment ? `/api/assignments/${editingAssignment.id}` : "/api/assignments";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(assignmentData)
      });
      if (!res.ok) throw new Error("Failed to save assignment");
      fetchAssignments();
      setEditingAssignment(null);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/assignments/${id}`, {
        method: "DELETE"
      });
      fetchAssignments();
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  return (
    <div>
      <h1>Assignments</h1>
      <AssignmentForm assignment={editingAssignment} onSave={handleSave} />
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id}>
            <p>Benefit: {assignment.benefit.name}</p>
            <p>Recipient: {assignment.recipient.first_name} {assignment.recipient.last_name}</p>
            <p>Quantity: {assignment.quantity}</p>
            <p>Status: {assignment.status}</p>
            <button onClick={() => handleEdit(assignment)}>Edit</button>
            <button onClick={() => handleDelete(assignment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
// } from "@/components/ui/tabs";

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



// export default function AssignmentsContent() {
//   return(
//     <Tabs defaultValue="week">
//               <div className="flex items-center">
//                 <TabsList>
//                   <TabsTrigger value="week">Semana</TabsTrigger>
//                   <TabsTrigger value="month">Mes</TabsTrigger>
//                   <TabsTrigger value="year">Año</TabsTrigger>
//                 </TabsList>
//                 <div className="ml-auto flex items-center gap-2">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="h-7 gap-1 text-sm"
//                       >
//                         <ListFilter className="h-3.5 w-3.5" />
//                         <span className="sr-only sm:not-sr-only">filtro</span>
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuLabel>Filter by</DropdownMenuLabel>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuCheckboxItem checked>
//                         Fulfilled
//                       </DropdownMenuCheckboxItem>
//                       <DropdownMenuCheckboxItem>
//                         Declined
//                       </DropdownMenuCheckboxItem>
//                       <DropdownMenuCheckboxItem>
//                         Refunded
//                       </DropdownMenuCheckboxItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     className="h-7 gap-1 text-sm"
//                   >
//                     <File className="h-3.5 w-3.5" />
//                     <span className="sr-only sm:not-sr-only">Export</span>
//                   </Button>
//                 </div>
//               </div>
//               <TabsContent value="week">
//                 <Card x-chunk="dashboard-05-chunk-3">
//                   <CardHeader className="px-7">
//                     <CardTitle>Asignaciones</CardTitle>
//                     <CardDescription>
//                       Recent orders from your store.
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>Recipients</TableHead>
//                           <TableHead className="hidden sm:table-cell">
//                             Type
//                           </TableHead>
//                           <TableHead className="hidden sm:table-cell">
//                             Beneficio
//                           </TableHead>
//                           <TableHead className="hidden sm:table-cell">
//                             Status
//                           </TableHead>
//                           <TableHead className="hidden md:table-cell">
//                             Date
//                           </TableHead>
//                           <TableHead className="text-right">Amount</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         <TableRow className="bg-accent">
//                           <TableCell>
//                             <div className="font-medium">Liam Johnson</div>
//                             <div className="hidden text-sm text-muted-foreground md:inline">
//                               liam@example.com
//                             </div>
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Sale
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Sale
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             <Badge className="text-xs" variant="secondary">
//                               Fulfilled
//                             </Badge>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             2023-06-23
//                           </TableCell>
//                           <TableCell className="text-right">$250.00</TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell>
//                             <div className="font-medium">Olivia Smith</div>
//                             <div className="hidden text-sm text-muted-foreground md:inline">
//                               olivia@example.com
//                             </div>
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Refund
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Refund
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             <Badge className="text-xs" variant="outline">
//                               Declined
//                             </Badge>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             2023-06-24
//                           </TableCell>
//                           <TableCell className="text-right">$150.00</TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell>
//                             <div className="font-medium">Noah Williams</div>
//                             <div className="hidden text-sm text-muted-foreground md:inline">
//                               noah@example.com
//                             </div>
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Subscription
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Subscription
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             <Badge className="text-xs" variant="secondary">
//                               Fulfilled
//                             </Badge>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             2023-06-25
//                           </TableCell>
//                           <TableCell className="text-right">$350.00</TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell>
//                             <div className="font-medium">Emma Brown</div>
//                             <div className="hidden text-sm text-muted-foreground md:inline">
//                               emma@example.com
//                             </div>
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Sale
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Sale
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             <Badge className="text-xs" variant="secondary">
//                               Fulfilled
//                             </Badge>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             2023-06-26
//                           </TableCell>
//                           <TableCell className="text-right">$450.00</TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell>
//                             <div className="font-medium">Liam Johnson</div>
//                             <div className="hidden text-sm text-muted-foreground md:inline">
//                               liam@example.com
//                             </div>
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Sale
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Sale
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             <Badge className="text-xs" variant="secondary">
//                               Fulfilled
//                             </Badge>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             2023-06-23
//                           </TableCell>
//                           <TableCell className="text-right">$250.00</TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell>
//                             <div className="font-medium">Liam Johnson</div>
//                             <div className="hidden text-sm text-muted-foreground md:inline">
//                               liam@example.com
//                             </div>
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Sale
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Sale
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             <Badge className="text-xs" variant="secondary">
//                               Fulfilled
//                             </Badge>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             2023-06-23
//                           </TableCell>
//                           <TableCell className="text-right">$250.00</TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell>
//                             <div className="font-medium">Olivia Smith</div>
//                             <div className="hidden text-sm text-muted-foreground md:inline">
//                               olivia@example.com
//                             </div>
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Refund
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Refund
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             <Badge className="text-xs" variant="outline">
//                               Declined
//                             </Badge>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             2023-06-24
//                           </TableCell>
//                           <TableCell className="text-right">$150.00</TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell>
//                             <div className="font-medium">Emma Brown</div>
//                             <div className="hidden text-sm text-muted-foreground md:inline">
//                               emma@example.com
//                             </div>
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Sale
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Sale
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             <Badge className="text-xs" variant="secondary">
//                               Fulfilled
//                             </Badge>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             2023-06-26
//                           </TableCell>
//                           <TableCell className="text-right">$450.00</TableCell>
//                         </TableRow>
//                       </TableBody>
//                     </Table>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//   )
// }