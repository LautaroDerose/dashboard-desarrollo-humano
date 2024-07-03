"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

import { useState } from "react"
import { FiCalendar } from "react-icons/fi";
import { MultiSelect, MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "@/components/ui/multi-select"

export function FormModal({ data }) {
  const localities = data.localities;
  const socialConditions = data.socialConditions;

  const localityNames = localities.map((locality) => locality.name);
  const conditionNames = [...new Set(socialConditions.map((condition) => condition.name))];
  // const options = conditionNames.map((name) => ({
  //   value: name.toLowerCase().replace(/\s+/g, '-'), // Ejemplo de cómo se podría formatear el value
  //   label: name,
  // }));

  const streetsByLocality = {};
  localities.forEach((locality) => {
    streetsByLocality[locality.name] = locality.Street.map((street) => street.name);
  });
  
  
  const formSchema = z.object({
    first_name: z.string().min(3, { message: "first_name must be at least 2 characters." }),
    last_name: z.string().min(2, { message: "last_name must be at least 2 characters." }),
    dni: z.string().refine(dni => !isNaN(parseFloat(dni))),
    birth_date: z.date(),
    sex: z.enum(["Femenino", "Masculino", "Otro"]),
    locality: z.enum(localityNames),
    street: z.string().optional(),
    street_number: z.string().refine(street_number => !isNaN(parseFloat(street_number))),
    emailAddress: z.string().email(),
    phone: z.string().refine(phone => !isNaN(parseFloat(phone))),
    social_conditions: z.string().array() ,
    // riskFactor: z.enum(FactorNames),
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
      social_conditions: [],
      // riskFactors: "",
    },
  });

  const locality = form.watch("locality");

  // const handleSubmit = (values) => {
  //   console.log({ values });
  //   // console.log(values.socialCondition)
  // };

  const handleSubmit = async (values) => {
    console.log({ values });
    try {
      // Convertir social_conditions a un array de IDs si es una cadena
      const social_conditions = Array.isArray(values.social_conditions) ? values.social_conditions : [values.social_conditions];
  
      // Convertir nombres de condiciones sociales a sus IDs correspondientes
      const socialConditionIds = social_conditions.map(conditionName => {
        const condition = socialConditions.find(cond => cond.name === conditionName);
        return condition ? condition.id : null;
      }).filter(id => id !== null);
  
      const response = await fetch('/api/recipient', {
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
          social_conditions: socialConditionIds, // Pasar IDs de condiciones sociales
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al agregar el contacto");
      }
  
      const result = await response.json();
      alert("Contacto agregado exitosamente");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Form {...form}  >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-full ">
        <div className="grid grid-cols-3 gap-3">
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
              <FormItem className="">
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
                {/* <FormDescription>
                  La fecha de nacimiento se utiliza para calcular su edad
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

        {/* <FormField
          control={form.control}
          name="social_conditions"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Condicion Social</FormLabel>
                <FormDescription>
                  Marcar condiciones sociales que correspondan
                </FormDescription>
              </div>
              {conditionNames.map((item) => (
                <FormField
                  key={item}
                  control={form.control}
                  name="social_conditions" // Nombre del campo debe ser "socialCondition"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={Array.isArray(field.value) && field.value.includes(item)}
                            onCheckedChange={(checked) => {
                              const updatedValue = Array.isArray(field.value) ? [...field.value] : []; // Ensure field.value is an array
                              if (checked) {
                                field.onChange([
                                  ...updatedValue,
                                  item,
                                ]);
                              } else {
                                field.onChange(
                                  updatedValue.filter(
                                    (value) => value !== item
                                  )
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="social_conditions"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Invite people</FormLabel>
              <MultiSelector
                onValuesChange={field.onChange}
                values={field.value}
              >
                <MultiSelectorTrigger>
                  <MultiSelectorInput placeholder="Select people to invite" />
                </MultiSelectorTrigger>
                <MultiSelectorContent>
                  <MultiSelectorList>
                    {conditionNames.map((item) => (
                      <MultiSelectorItem key={item} value={item}>
                        <div className="flex items-center space-x-2">
                          <span>{item}</span>
                        </div>
                      </MultiSelectorItem>
                    ))}
                  </MultiSelectorList>
                </MultiSelectorContent>
              </MultiSelector>
              <FormDescription>
                Select people to invite to this event
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
          name="phone"
          render={({ field }) => (
            <FormItem >
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
        
        
        {/* <FormField
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
        /> */}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import { format } from "date-fns"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { FiCalendar } from "react-icons/fi";

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { toast } from "@/components/ui/use-toast"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useState } from "react"
// import { Checkbox } from "@/components/ui/checkbox"

// export function FormModal({ data }) {
//   const { localities, socialConditions, recipientSocialConditions } = data;
//   // console.log(recipientSocialConditions)
  
//   const localityNames = localities.map((locality) => locality.name);
//   const conditionNames = [...new Set(socialConditions.map((condition) => condition.name))];

//   const streetsByLocality = {};
//   localities.forEach((locality) => {
//     streetsByLocality[locality.name] = locality.Street.map((street) => street.name);
//   });

//   const formSchema = z.object({
//     first_name: z.string().min(3, { message: "first_name must be at least 2 characters." }),
//     last_name: z.string().min(2, { message: "last_name must be at least 2 characters." }),
//     dni: z.string().refine(dni => !isNaN(parseFloat(dni))),
//     birth_date: z.date(),
//     sex: z.enum(["Femenino", "Masculino", "Otro"]),
//     locality: z.enum(localityNames),
//     street: z.string().optional(),
//     street_number: z.string().refine(street_number => !isNaN(parseFloat(street_number))),
//     emailAddress: z.string().email(),
//     phone: z.string().refine(phone => !isNaN(parseFloat(phone))),
//     social_conditions: z.string().array() ,
//   }).refine(
//     (data) => {
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
//       dni: "",
//       birth_date: null,
//       sex: "",
//       locality: "",
//       street: "",
//       street_number: "",
//       emailAddress: "",
//       phone: "",
//       social_conditions: [],
//     },
//   });

//   const locality = form.watch("locality");

//   const handleSubmit = (values) => {
//     console.log({ values });
//   };

//   // const handleSubmit = async (values) => {
//   //   console.log({ values });
//   //   try {
//   //     // Convertir social_conditions a un array de IDs si es una cadena
//   //     const social_conditions = Array.isArray(values.social_conditions) ? values.social_conditions : [values.social_conditions];
  
//   //     // Convertir nombres de condiciones sociales a sus IDs correspondientes
//   //     const socialConditionIds = social_conditions.map(conditionName => {
//   //       const condition = socialConditions.find(cond => cond.name === conditionName);
//   //       return condition ? condition.id : null;
//   //     }).filter(id => id !== null);
  
//   //     const response = await fetch('/api/recipient', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({
//   //         first_name: values.first_name,
//   //         last_name: values.last_name,
//   //         birth_date: values.birth_date,
//   //         dni: values.dni,
//   //         sex: values.sex,
//   //         phone: values.phone,
//   //         email: values.emailAddress,
//   //         street_id: streetsByLocality[values.locality].findIndex(street => street === values.street) + 1,
//   //         street_number: values.street_number,
//   //         locality_id: localities.find(locality => locality.name === values.locality).id,
//   //         social_conditions: socialConditionIds, // Pasar IDs de condiciones sociales
//   //       }),
//   //     });
  
//   //     if (!response.ok) {
//   //       throw new Error("Error al agregar el contacto");
//   //     }
  
//   //     const result = await response.json();
//   //     alert("Contacto agregado exitosamente");
//   //   } catch (error) {
//   //     alert(error.message);
//   //   }
//   // };


//   return (
//     <Form {...form}  >
//       <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-full ">
//       <FormField
//           control={form.control}
//           name="social_conditions"
//           render={({ field }) => (
//             <FormItem>
//               <div className="mb-4">
//                 <FormLabel className="text-base">Condicion Social</FormLabel>
//                 <FormDescription>
//                   Marcar condiciones sociales que correspondan
//                 </FormDescription>
//               </div>
//               {conditionNames.map((item) => (
//                 <FormField
//                   key={item}
//                   control={form.control}
//                   name="social_conditions" // Nombre del campo debe ser "socialCondition"
//                   render={({ field }) => {
//                     return (
//                       <FormItem
//                         key={item}
//                         className="flex flex-row items-start space-x-3 space-y-0"
//                       >
//                         <FormControl>
//                           <Checkbox
//                             checked={Array.isArray(field.value) && field.value.includes(item)}
//                             onCheckedChange={(checked) => {
//                               const updatedValue = Array.isArray(field.value) ? [...field.value] : []; // Ensure field.value is an array
//                               if (checked) {
//                                 field.onChange([
//                                   ...updatedValue,
//                                   item,
//                                 ]);
//                               } else {
//                                 field.onChange(
//                                   updatedValue.filter(
//                                     (value) => value !== item
//                                   )
//                                 );
//                               }
//                             }}
//                           />
//                         </FormControl>
//                         <FormLabel className="font-normal">
//                           {item}
//                         </FormLabel>
//                       </FormItem>
//                     );
//                   }}
//                 />
//               ))}
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="first_name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Nombre</FormLabel>
//               <FormControl>
//                 <Input placeholder="Ingrese su nombre" {...field} type="text" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="last_name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Apellido</FormLabel>
//               <FormControl>
//                 <Input placeholder="Ingrese su apellido" {...field} type="text" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="dni"
//           render={({ field }) => (
//             <FormItem className="mt-2 pt-2">
//               <FormLabel>DNI</FormLabel>
//               <FormControl>
//                 <Input placeholder="Ingrese el DNI" {...field} type="text" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="birth_date"
//           render={({ field }) => (
//             <FormItem className="flex flex-col">
//               <FormLabel>Fecha de nacimiento</FormLabel>
//               <Popover key={field.value?.getDate()}>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant={"outline"}
//                     className={cn("w-[240px] justify-start text-left font-normal", !field.value && "text-muted-foreground")}
//                   >
//                     <FiCalendar className="mr-2 h-4 w-4" />
//                     {field.value ? format(field.value, "PPP") : <span>Seleccione una fecha</span>}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent align="start" className="w-auto p-0">
//                   <Calendar
//                     mode="single"
//                     captionLayout="dropdown-buttons"
//                     selected={field.value}
//                     onSelect={field.onChange}
//                     fromYear={1960}
//                     toYear={2030}
//                   />
//                 </PopoverContent>
//               </Popover>
//               <FormDescription>
//                 La fecha de nacimiento se utiliza para calcular su edad
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="sex"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Indique el sexo correspondiente</FormLabel>
//               <Select onValueChange={field.onChange}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder={form.watch("sex") || "Seleccione el sexo"} />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="Femenino">Femenino</SelectItem>
//                   <SelectItem value="Masculino">Masculino</SelectItem>
//                   <SelectItem value="Otro">Otro</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="locality"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Localidad</FormLabel>
//               <Select onValueChange={field.onChange}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder={form.watch("locality") || "Seleccione una localidad"} />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {localityNames.map((item, index) => (
//                     <SelectItem key={index} value={item}>{item}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {locality && (
//           <div>
//             <FormField
//               control={form.control}
//               name="street"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Seleccionar calle</FormLabel>
//                   <Select onValueChange={field.onChange}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder={form.watch("street") || "Seleccione una calle"} />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {streetsByLocality[locality].map((street, index) => (
//                         <SelectItem key={index} value={street}>
//                           {street}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="street_number"
//               render={({ field }) => (
//                 <FormItem className="mt-2 pt-2">
//                   <FormLabel>Número de hogar</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Ingrese la altura de su dirección" {...field} type="text" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         )}
//         <FormField
//           control={form.control}
//           name="phone"
//           render={({ field }) => (
//             <FormItem className="mt-2 pt-2">
//               <FormLabel>Número de teléfono</FormLabel>
//               <FormControl>
//                 <Input placeholder="Ingrese el número de contacto" {...field} type="text" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="emailAddress"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email Address</FormLabel>
//               <FormControl>
//                 <Input placeholder="nombre@mail.com" {...field} type="email" />
//               </FormControl>
//               <FormDescription>
//                 Ingrese su dirección de email
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }