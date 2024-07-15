"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultiSelect, MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "@/components/ui/multi-select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

import { FiCalendar } from "react-icons/fi";


export function FormEditRecipient({ data }) {
  const localities = data.localities;
  const socialConditions = data.socialConditions;

  const localityNames = localities.map((locality) => locality.name);
  const conditionNames = [...new Set(socialConditions.map((condition) => condition.name))];

  const streetsByLocality = {};
  localities.forEach((locality) => {
    streetsByLocality[locality.name] = locality.Street.map((street) => street.name);
  });
  
  const formSchema = z.object({
    first_name: z.string().min(3, { message: "El nombre debe tener al menos 3." }),
    last_name: z.string().min(2, { message: "El apellido debe tener al menos 3." }),
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
      // toast({
      //   title:"Contacto agregado exitosamente",
      //   // description:{values}
      // })
      alert("Contacto agregado exitosamente");
    } catch (error) {
      // alert(error.message);
      toast({
        title:"Algo salio mal",
        variant:"destructive"
      })
    }
  };
 
  return (
    <Form {...form}  >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-full ">
        <div className="grid grid-cols-2 gap-3">
          <div className="grid grid-cols-2 gap-3">
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
                <FormItem >
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <Popover key={field.value?.getDate()}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full h-10 justify-start text-left font-normal", !field.value && "text-muted-foreground")}
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
          </div>
          <div className="flex flex-col gap-3 ml-4 pl-4 border-l border-slate-400">
            <FormField
              control={form.control}
              name="social_conditions"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Conicion Social</FormLabel>
                  <MultiSelector
                    onValuesChange={field.onChange}
                    values={field.value}
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput placeholder="Marque una o varias condiciones" />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        <ScrollArea className="h-40">
                          {conditionNames.map((item) => (
                            <MultiSelectorItem key={item} value={item}>
                              <div className="flex items-center space-x-2">
                                <span>{item}</span>
                              </div>
                            </MultiSelectorItem>
                          ))}
                        </ScrollArea>
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
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
          </div>
        </div>
        <Button type="submit">Agregar</Button>
        
      </form>
    </Form>
  );
}
