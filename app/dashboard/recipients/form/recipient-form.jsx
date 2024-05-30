
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FiCalendar } from "react-icons/fi";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function RecipientForm({ localities, socialConditions, riskFactors }) {

  const localityNames = localities.map((locality) => locality.name);
  const conditionNames = [...new Set(socialConditions.map((condition) => condition.name))];
  const FactorNames = [...new Set(riskFactors.map((factor) => factor.name))];

  const streetsByLocality = {};
  localities.forEach((locality) => {
    streetsByLocality[locality.name] = locality.Street.map((street) => street.name);
  });

  const formSchema = z.object({
    first_name: z.string().min(3, { message: "first_name must be at least 2 characters." }),
    last_name: z.string().min(2, { message: "last_name must be at least 2 characters." }),
    dni: z.string().refine(dni => !isNaN(parseFloat(dni))),
    // dni: z.string(),
    birth_date: z.date(),
    sex: z.enum(["Femenino", "Masculino", "Otro"]),
    locality: z.enum(localityNames),
    street: z.string().optional(),
    street_number: z.string().refine(street_number => !isNaN(parseFloat(street_number))),
    emailAddress: z.string().email(),
    phone: z.string().refine(phone => !isNaN(parseFloat(phone))),
    socialCondition: z.enum(conditionNames),
    riskFactor: z.enum(FactorNames),
  }).refine(
    (data) => {
      const selectedStreets = streetsByLocality[data.locality];
      return !selectedStreets || selectedStreets.includes(data.street);
    }, {
      message: "Debes ingresar una calle válida para la localidad seleccionada",
      path: ["street"],
    }
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      dni: "",
      birth_date: null,
      sex: "",
      locality: "",
      street: "",
      street_number: "",
      emailAddress: "",
      phone: "",
      socialCondition: "",
      riskFactors: "",
    },
  });

  const locality = form.watch("locality");

  // const handleSubmit = (values) => {
  //   console.log({ values });
  // };

  const handleSubmit = async (values) => {
    console.log({ values });
    try {
      const response = await fetch('/api/recipient', { // Ensure the endpoint is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: values.first_name,
          last_name: values.last_name,
          birth_date: values.birth_date,
          dni: values.dni,
          sex: values.sex,
          phone: values.phone,
          email: values.emailAddress,
          street_id: streetsByLocality[values.locality].findIndex(street => street === values.street) + 1,
          street_number: values.street_number,
          locality_id: localities.find(locality => locality.name === values.locality).id,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al agregar el contacto response");
      }
  
      const result = await response.json();
      alert("Contacto agregado exitosamente");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese su nombre" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese su apellido" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dni"
          render={({ field }) => (
            <FormItem className="mt-2 pt-2">
              <FormLabel>DNI</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el DNI" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birth_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de nacimiento</FormLabel>
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
                <PopoverContent align="start" className="w-auto p-0">
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
                La fecha de nacimiento se utiliza para calcular su edad
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Indique el sexo correspondiente</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={form.watch("sex") || "Seleccione el sexo"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Femenino">Femenino</SelectItem>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="locality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localidad</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={form.watch("locality") || "Seleccione una localidad"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {localityNames.map((item, index) => (
                    <SelectItem key={index} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {locality && (
          <div>
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seleccionar calle</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={form.watch("street") || "Seleccione una calle"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {streetsByLocality[locality].map((street, index) => (
                        <SelectItem key={index} value={street}>
                          {street}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street_number"
              render={({ field }) => (
                <FormItem className="mt-2 pt-2">
                  <FormLabel>Número de hogar</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese la altura de su dirección" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="mt-2 pt-2">
              <FormLabel>Número de teléfono</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el número de contacto" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="nombre@mail.com" {...field} type="email" />
              </FormControl>
              <FormDescription>
                Ingrese su dirección de email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="socialCondition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condición social</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={form.watch("socialCondition") || "Seleccione una condición social"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {conditionNames.map((item, index) => (
                    <SelectItem key={index} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="riskFactor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Factor de riesgo</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={form.watch("riskFactor") || "Seleccione los factores de riesgo"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {FactorNames.map((item, index) => (
                    <SelectItem key={index} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// export function RecipientForm({localities, socialConditions, riskFactors}) {
//   const localityNames = localities.map((locality) => locality.name);
//   const conditionNames = [...new Set(socialConditions.map((condition) => condition.name))];
//   const FactorNames = [...new Set(riskFactors.map((factor) => factor.name))];

//   const streetsByLocality = {};
//   localities.forEach((locality) => {
//     streetsByLocality[locality.name] = locality.Street.map((street) => street.name);
//   });

//   const formSchema = z.object({
//     first_name: z.string().min(3, { message: "first_name must be at least 2 characters." }),
//     last_name: z.string().min(2, { message: "last_name must be at least 2 characters." }),
//     birth_date: z.date(),
//     sex: z.enum(["Femenino", "Masculino", "Otro"]),
//     locality: z.enum(localityNames),
//     street: z.string().optional(),
//     street_number: z.string().refine(street_number => !isNaN(parseFloat(street_number))),
//     emailAddress: z.string().email(),
//     phone: z.string().refine(phone => !isNaN(parseFloat(phone))),
//     socialCondition: z.enum(socialConditions),
//     riskFactor: z.enum(riskFactors),
//   }).refine(
//     (data) => {
//       // Verificar si la calle seleccionada es válida para la localidad
//       const selectedStreets = streetsByLocality[data.locality];
//       return !selectedStreets || selectedStreets.includes(data.street);
//     }, {
//       message: "Debes ingresar una calle válida para la localidad seleccionada",
//       path: ["street"],
//     }
//   );

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       first_name: "",
//       last_name: "",
//       birth_date: null,
//       sex: "",
//       locality: "",
//       street: "",
//       street_number: "",
//       emailAddress: "",
//       phone: "",
//       socialCondition: "",
//       riskFactors: "",
//     }
//   });

//   const locality = form.watch("locality");
  
//   const handleSubmit = (values) => {
//     console.log({values})
//   }
//   // const handleSubmit = async (values) => {
//   //   console.log({values});
//   //   try {
//   //     const response = await fetch('/api/contactInfo', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({
//   //         recipient_id: values.recipient_id, // Aquí debes asignar el ID del destinatario si está disponible
//   //         phone: values.phone,
//   //         email: values.emailAddress,
//   //         street_id: streetsByLocality[values.locality].findIndex(street => street === values.street) + 1, // Supongamos que las calles están ordenadas y comienzan en 1
//   //         street_number: values.street_number,
//   //         locality_id: localities.find(locality => locality.name === values.locality).id
//   //       })
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error("Error al agregar el contacto");
//   //     }

//   //     const result = await response.json();
//   //     toast.success("Contacto agregado exitosamente");
//   //   } catch (error) {
//   //     toast.error(error.message);
//   //   }
//   // }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSubmit)} className=" space-y-8">
//           <FormField
//             control={form.control}
//             name="first_name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Nombre </FormLabel>
//                 <FormControl>
//                   <Input placeholder="Ingrese su nombre" {...field} type="text" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="last_name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Apellido </FormLabel>
//                 <FormControl>
//                   <Input placeholder="Ingrese su apellido" {...field} type="text" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="birth_date"
//             render={({ field }) => (
//               <FormItem className="flex flex-col">
//                 <FormLabel>Fecha de nacimiento</FormLabel>
//                 <Popover key={field.value?.getDate()}>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant={"outline"}
//                       className={cn("w-[240px] justify-start text-left font-normal", !field.value && "text-muted-foreground")}
//                     >
//                       <FiCalendar className="mr-2 h-4 w-4" />
//                       {field.value ? format(field.value, "PPP") : <span>Seleccione una fecha</span>}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent align="start" className=" w-auto p-0">
//                     <Calendar
//                       mode="single"
//                       captionLayout="dropdown-buttons"
//                       selected={field.value}
//                       onSelect={field.onChange}
//                       fromYear={1960}
//                       toYear={2030}
//                     />
//                   </PopoverContent>
//                 </Popover>
//                 <FormDescription>
//                   La fecha de nacimiento se utiliza para calcular su edad
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="sex"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Indique el sexo correspondiente</FormLabel>
//                 <Select onValueChange={field.onChange}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder={form.watch("sex") || "Seleccione el sexo"} />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="Femenino">Femenino</SelectItem>
//                     <SelectItem value="Masculino">Masculino</SelectItem>
//                     <SelectItem value="Otro">Otro</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
     
//           <FormField
//             control={form.control}
//             name="locality"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Localidad</FormLabel>
//                 <Select onValueChange={field.onChange}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder={form.watch("locality") || "Seleccione una localidad"} />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {localityNames.map((item, index) => (
//                       <SelectItem key={index} value={item}>{item}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {locality && (
//             <div>
//               <FormField
//                 control={form.control}
//                 name="street"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Seleccionar calle</FormLabel>
//                     <Select onValueChange={field.onChange}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder={form.watch("street") || "Seleccione una calle"} />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {streetsByLocality[locality].map((street, index) => (
//                           <SelectItem key={index} value={street}>
//                             {street}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="street_number"
//                 render={({ field }) => (
//                   <FormItem className="mt-2 pt-2">
//                     <FormLabel>Número de hogar</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Ingrese la altura de su dirección" {...field} type="text" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           )}
//           <FormField
//             control={form.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem className="mt-2 pt-2">
//                 <FormLabel>Número de teléfono</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Ingrese el número de contacto" {...field} type="text" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="emailAddress"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email Address</FormLabel>
//                 <FormControl>
//                   <Input placeholder="nombre@mail.com" {...field} type="email" />
//                 </FormControl>
//                 <FormDescription>
//                   Ingrese su dirección de email
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
        
//           <FormField
//             control={form.control}
//             name="socialCondition"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Condición social</FormLabel>
//                 <Select onValueChange={field.onChange}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder={form.watch("socialCondition") || "Seleccione una condición social"} />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {conditionNames.map((item, index) => (
//                       <SelectItem key={index} value={item}>{item}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="riskFactor"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Factor de riesgo</FormLabel>
//                 <Select onValueChange={field.onChange}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder={form.watch("riskFactor") || "Seleccione los factores de riesgo"} />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {FactorNames.map((item, index) => (
//                       <SelectItem key={index} value={item}>{item}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
               
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   )
// }
