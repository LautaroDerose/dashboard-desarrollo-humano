"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

import { Calendar } from "@/components/ui/calendar"
import { FiCalendar } from "react-icons/fi";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "./date-range-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"



export default function AssignmentForm({assignments, recipients, benefits}) {
  
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [selectedBenefit, setSelectedBenefit] = useState("");

  // Extraer solo los nombres de los recipients del objeto data
  const recipientNames = recipients.map((recipient) => recipient.first_name + " " + recipient.last_name );
  // console.log(recipientNames)

  // Extraer solo los nombres de las localidades del objeto data
  const benefitNames = benefits.map((benefit) => benefit.name );
  // console.log(benefitNames)


  // // Extraer solo los nombres únicos de las condiciones sociales del objeto data
  // const conditionNames = [...new Set(socialConditions.map((condition) => condition.name))];
  // console.log(conditionNames);
 
  // // Extraer solo los nombres únicos de los factores de riesgo del objeto data
  // const FactorNames = [...new Set(riskFactors.map((factor) => factor.name))];
  // console.log(riskFactors);

  // const streetsByLocality = {};
  // // Mapear las calles por localidad
  // localities.forEach((locality) => {
  //   streetsByLocality[locality.name] = locality.Street.map((street) => street.name);
  // });
  
  // console.log(streetsByLocality)  

  
  const formSchema = z.object({
    recipient: z.enum(recipientNames),
    benefit: z.enum(benefitNames),
    enrollment_date: z.date(),
    expiry_date: z.date(),
    status: z.enum(["Pendiente", "En Proceso", "Concretado"]),
    amount: z.string().refine(amount => !isNaN(parseFloat(amount))),
    quantity: z.string().refine(quantity => !isNaN(parseFloat(quantity))),
  })
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipient: "",
      benefit: "",
      enrollment_date: null,
      expiry_date: null,
      status: "",
      amount: "",
      quantity: "",
    }
  })

  // const recipient = form.watch("recipient")
  // const benefit = form.watch("benefit")

  // const handleSubmit = (values) => {
  //   console.log({values})
  // }

  const handleSubmit = async (values) => {
    console.log({ values });

    const payload = {
      enrollment_date: values.enrollment_date.toISOString(),
      expiry_date: values.expiry_date.toISOString(),
      status: values.status,
      amount: Number(values.amount),
      quantity: Number(values.quantity),
      recipient_id: recipients.find(recipient => recipient.first_name + " " + recipient.last_name === values.recipient).id,
      benefit_id: benefits.find(benefit => benefit.name === values.benefit).id,
    };

    console.log('Payload:', payload);

    try {
      const response = await fetch('/api/assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error al agregar una asignacion");
      }

      const result = await response.json();
      console.log('Result:', result);
      alert("Asignacion creada exitosamente");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  // const handleSubmit = async (values) => {
  //   console.log({ values });

  //   try {
  //     const response = await fetch('/api/assignment', { // Ensure the endpoint is correct
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         enrollment_date: values.enrollment_date.toISOString(),
  //         expiry_date: values.expiry_date.toISOString(),
  //         status: values.status,
  //         amount: values.amount,
  //         quantity: values.quantity,
  //         // recipient_id: recipient_id,
  //         // benefit_id: benefit_id
  //         recipient_id: recipients.find(recipient => recipient.first_name + " " + recipient.last_name === values.recipient).id,
  //         benefit_id: benefits.find(benefit => benefit.name === values.benefit).id,
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error("Error al agregar una asignacion");
  //     }
  
  //     const result = await response.json();
  //     alert("Asignacion creada exitosamente");
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className=" space-y-8 w-full ">
          <div className="">
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personas</FormLabel>
                  <Select onValueChange={field.onChange}>
                  {/* <Select onValueChange={(value) => {
                     // Actualizar el estado local cuando cambia la selección
                  setSelectedRecipient(value); 
                  // Llama a la función onChange proporcionada por react-hook-form
                  field.onChange(value); 
                  }}> */}
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una Receptor">
                          {form.watch("recipient")}
                          {/* {selectedRecipient} */}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>{
                      recipientNames.map((item, index) => (
                        <SelectItem key={index} value={item}>{item}</SelectItem>
                      ))
                    }</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="benefit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beneficios</FormLabel>
                {/* <Select onValueChange={field.onChange}> */}
                <Select onValueChange={(value) => { 
                  // Actualizar el estado local cuando cambia la selección
                  setSelectedBenefit(value); 
                  // Llama a la función onChange proporcionada por react-hook-form
                  field.onChange(value); 
                }}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un beneficio">
                        {/* {form.watch("benefit")} */}
                        {selectedBenefit}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>{
                    benefitNames.map((item, index) => (
                      <SelectItem key={index} value={item}>{item}</SelectItem>
                    ))
                  }</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad </FormLabel>
                <FormControl>
                  <Input placeholder="Indique la cantidad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto </FormLabel>
                <FormControl>
                  <Input placeholder="Indique el monto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder>
                        {form.watch("status") || "Seleccione una direccion"}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En Proceso">En Proceso</SelectItem>
                    <SelectItem value="Concretado">Concretado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="enrollment_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de Registro</FormLabel>
                  <Popover key={field.value?.getDate()}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-[240px] justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        <FiCalendar className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Seleccione una fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className=" w-auto p-0">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={field}
                        onSelect={field.onChange}
                        fromYear={1960}
                        toYear={2030}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Fecha de registro
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiry_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de vencimiento</FormLabel>
                  <Popover key={field.value?.getDate()}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-[240px] justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        <FiCalendar className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Seleccione una fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className=" w-auto p-0">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={field.value}
                        onSelect={field.onChange}
                        fromYear={1960}
                        toYear={2030}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Dia de caducacion de la asignacion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}



//------ORIGINAL VERSION

// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { cn } from "@/lib/utils"
// import { format } from "date-fns"

// import { Calendar } from "@/components/ui/calendar"
// import { FiCalendar } from "react-icons/fi";
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"

// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { DatePickerWithRange } from "./date-range-picker"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { useState } from "react"



// export default function AssignmentForm({assignments, recipients, benefits}) {
  
//   const [selectedRecipient, setSelectedRecipient] = useState("");
//   const [selectedBenefit, setSelectedBenefit] = useState("");

//   // Extraer solo los nombres de los recipients del objeto data
//   const recipientNames = recipients.map((recipient) => recipient.first_name + " " + recipient.last_name );
//   // console.log(recipientNames)

//   // Extraer solo los nombres de las localidades del objeto data
//   const benefitNames = benefits.map((benefit) => benefit.name );
//   // console.log(benefitNames)

//   // // Extraer solo los nombres únicos de las condiciones sociales del objeto data
//   // const conditionNames = [...new Set(socialConditions.map((condition) => condition.name))];
//   // console.log(conditionNames);
 
//   // // Extraer solo los nombres únicos de los factores de riesgo del objeto data
//   // const FactorNames = [...new Set(riskFactors.map((factor) => factor.name))];
//   // console.log(riskFactors);

//   // const streetsByLocality = {};
//   // // Mapear las calles por localidad
//   // localities.forEach((locality) => {
//   //   streetsByLocality[locality.name] = locality.Street.map((street) => street.name);
//   // });
  
//   // console.log(streetsByLocality)  

  
//   const formSchema = z.object({
//     recipient: z.enum(recipientNames),
//     benefit: z.enum(benefitNames),
//     enrollment_date: z.date(),
//     expiry_date: z.date(),
//     status: z.enum(["Pendiente", "En Proceso", "Concretado"]),
//     amount: z.string().refine(amount => !isNaN(parseFloat(amount))),
//     quantity: z.string().refine(quantity => !isNaN(parseFloat(quantity))),
//   })
  
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       recipient: "",
//       benefit: "",
//       enrollment_date: null,
//       expiry_date: null,
//       status: "",
//       amount: "",
//       quantity: "",
//     }
//   })

//   // const recipient = form.watch("recipient")
//   // const benefit = form.watch("benefit")

//   // const handleSubmit = (values) => {
//   //   console.log({values})
//   // }

//   const handleSubmit = async (values) => {
//     console.log({ values });
//     try {
//       const recipient = recipients.find(recipient => recipient.name === values.recipient);
//       const benefit = benefits.find(benefit => benefit.name === values.benefit);

//       if (!recipient) {
//         throw new Error(`No se encontró ningún destinatario con el nombre ${values.recipient}`);
//       }

//       if (!benefit) {
//         throw new Error(`No se encontró ningún beneficio con el nombre ${values.benefit}`);
//       }

//       // Ahora puedes acceder de forma segura a recipient.id y benefit.id
//       const recipient_id = recipient.id;
//       const benefit_id = benefit.id;
//       const response = await fetch('/api/recipient', { // Ensure the endpoint is correct
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           enrollment_date: values.enrollment_date,
//           expiry_date: values.expiry_date,
//           status: values.status,
//           amount: values.amount,
//           quantity: values.quantity,
//           recipient_id: recipient_id,
//           benefit_id: benefit_id
//           // recipient_id: recipients.find(recipient => recipient.name === values.recipient).id,
//           // benefit_id: benefits.find(benefit => benefit.name === values.benefit).id,
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error("Error al agregar el contacto response");
//       }
  
//       const result = await response.json();
//       alert("Contacto agregado exitosamente");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

  

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSubmit)} className=" space-y-8 w-full ">
//           <div className="">
//             <FormField
//               control={form.control}
//               name="recipient"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Personas</FormLabel>
//                   {/* <Select onValueChange={field.onChange}> */}
//                   <Select onValueChange={(value) => {
//                      // Actualizar el estado local cuando cambia la selección
//                   setSelectedRecipient(value); 
//                   // Llama a la función onChange proporcionada por react-hook-form
//                   field.onChange(value); 
//                   }}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Seleccione una Receptor">
//                           {/* {form.watch("recipient")} */}
//                           {selectedRecipient}
//                         </SelectValue>
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>{
//                       recipientNames.map((item, index) => (
//                         <SelectItem key={index} value={item}>{item}</SelectItem>
//                       ))
//                     }</SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <FormField
//             control={form.control}
//             name="benefit"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Beneficios</FormLabel>
//                 {/* <Select onValueChange={field.onChange}> */}
//                 <Select onValueChange={(value) => { 
//                   // Actualizar el estado local cuando cambia la selección
//                   setSelectedBenefit(value); 
//                   // Llama a la función onChange proporcionada por react-hook-form
//                   field.onChange(value); 
//                 }}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Seleccione un beneficio">
//                         {/* {form.watch("benefit")} */}
//                         {selectedBenefit}
//                       </SelectValue>
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>{
//                     benefitNames.map((item, index) => (
//                       <SelectItem key={index} value={item}>{item}</SelectItem>
//                     ))
//                   }</SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="quantity"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Cantidad </FormLabel>
//                 <FormControl>
//                   <Input placeholder="Indique la cantidad" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="amount"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Monto </FormLabel>
//                 <FormControl>
//                   <Input placeholder="Indique el monto" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="status"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Estado</FormLabel>
//                 <Select onValueChange={field.onChange}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder>
//                         {form.watch("status") || "Seleccione una direccion"}
//                       </SelectValue>
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="Pendiente">Pendiente</SelectItem>
//                     <SelectItem value="En Proceso">En Proceso</SelectItem>
//                     <SelectItem value="Concretado">Concretado</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="flex gap-4">
//             <FormField
//               control={form.control}
//               name="enrollment_date"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel>Fecha de Registro</FormLabel>
//                   <Popover key={field.value?.getDate()}>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant={"outline"}
//                         className={cn("w-[240px] justify-start text-left font-normal", !field.value && "text-muted-foreground")}
//                       >
//                         <FiCalendar className="mr-2 h-4 w-4" />
//                         {field.value ? format(field.value, "PPP") : <span>Seleccione una fecha</span>}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent align="start" className=" w-auto p-0">
//                       <Calendar
//                         mode="single"
//                         captionLayout="dropdown-buttons"
//                         selected={field}
//                         onSelect={field.onChange}
//                         fromYear={1960}
//                         toYear={2030}
//                       />
//                     </PopoverContent>
//                   </Popover>
//                   <FormDescription>
//                     Fecha de registro
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="expiry_date"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel>Fecha de vencimiento</FormLabel>
//                   <Popover key={field.value?.getDate()}>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant={"outline"}
//                         className={cn("w-[240px] justify-start text-left font-normal", !field.value && "text-muted-foreground")}
//                       >
//                         <FiCalendar className="mr-2 h-4 w-4" />
//                         {field.value ? format(field.value, "PPP") : <span>Seleccione una fecha</span>}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent align="start" className=" w-auto p-0">
//                       <Calendar
//                         mode="single"
//                         captionLayout="dropdown-buttons"
//                         selected={field.value}
//                         onSelect={field.onChange}
//                         fromYear={1960}
//                         toYear={2030}
//                       />
//                     </PopoverContent>
//                   </Popover>
//                   <FormDescription>
//                     Dia de caducacion de la asignacion
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   )
// }



//------stackoverflow VERSION

// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { cn } from "@/lib/utils"
// import { Calendar } from "@/components/ui/calendar"
// import { FiCalendar } from "react-icons/fi";
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"

// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { DatePickerWithRange } from "./date-range-picker"
// import { useState } from "react"



// export default function AssignmentForm({assignments, recipients, benefits}) {

//   // Extraer solo los nombres de los recipients del objeto data
//   const recipientNames = recipients.map((recipient) => recipient.first_name + " " + recipient.last_name );
//   // console.log(recipientNames)

//   // Extraer solo los nombres de las localidades del objeto data
//   const benefitNames = benefits.map((benefit) => benefit.name );
//   // console.log(benefitNames)

//   // // Extraer solo los nombres únicos de las condiciones sociales del objeto data
//   // const conditionNames = [...new Set(socialConditions.map((condition) => condition.name))];
//   // console.log(conditionNames);
 
//   // // Extraer solo los nombres únicos de los factores de riesgo del objeto data
//   // const FactorNames = [...new Set(riskFactors.map((factor) => factor.name))];
//   // console.log(riskFactors);

//   // const streetsByLocality = {};
//   // // Mapear las calles por localidad
//   // localities.forEach((locality) => {
//   //   streetsByLocality[locality.name] = locality.Street.map((street) => street.name);
//   // });
  
//   // console.log(streetsByLocality)  

  
//   const formSchema = z.object({
//     recipient: z.enum(recipientNames),
//     benefit: z.enum(benefitNames),
//     date: z.object(
//       {
//         from: z.date(),
//         to: z.date().optional(),
//       },
//       {required_error: "Data is required"},
//     )
//     .refine((date) => {
//       return !!date.to
//     }, "End Date is required"),
//   });
  
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       recipient: "",
//       benefit: "",
//       date: {
//         from: undefined,
//         to: undefined,
//       }
//     }
//   })

//   // const locality = form.watch("locality")

//   const handleSubmit = (values) => {
//     console.log({values})
//   }

//   // const [date, setDate] = useState({
//   //   from: new Date(),
//   //   to: addDays(new Date(), 20),
//   // })
//   const [date, setDate] = useState()

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSubmit)} className=" space-y-8   ">
//           <div className="w-[500px]">
//             <FormField
//               control={form.control}
//               name="recipient"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Personas</FormLabel>
//                   <Select onValueChange={field.onChange}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Seleccione una Receptor">
//                           {form.watch("recipient")}
//                         </SelectValue>
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>{
//                       recipientNames.map((item, index) => (
//                         <SelectItem key={index} value={item}>{item}</SelectItem>
//                       ))
//                     }</SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <FormField
//             control={form.control}
//             name="benefit"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Beneficios</FormLabel>
//                 <Select onValueChange={field.onChange}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Seleccione un beneficio">
//                         {form.watch("benefit")}
//                       </SelectValue>
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>{
//                     benefitNames.map((item, index) => (
//                       <SelectItem key={index} value={item}>{item}</SelectItem>
//                     ))
//                   }</SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="quantity"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Cantidad </FormLabel>
//                 <FormControl>
//                   <Input placeholder="Indique la cantidad" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="amount"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Monto </FormLabel>
//                 <FormControl>
//                   <Input placeholder="Indique el monto" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="status"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Estado</FormLabel>
//                 <Select onValueChange={field.onChange}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder>
//                         {form.watch("streetCarhue") || "Seleccione una direccion"}
//                       </SelectValue>
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="Femenino">Pendiente</SelectItem>
//                     <SelectItem value="Masculino">En Proceso</SelectItem>
//                     <SelectItem value="Otro">Concretado</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="status"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Seleccione fecha de registro y vencimiento</FormLabel>
//                 <DatePickerWithRange date={date} setDate={setDate} />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   )
// }
