"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

import { useState } from "react"
import { FiCalendar } from "react-icons/fi";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";

export default function FormModalAssignment({ benefits, recipients }) {

  const [selectedBenefit, setSelectedBenefit] = useState("");

  // Extraer solo los nombres de los recipients del objeto data
  const recipientNames = recipients.map((recipient) => recipient.first_name + " " + recipient.last_name );

  // Extraer solo los nombres de las localidades del objeto data
  const benefitNames = benefits.map((benefit) => benefit.name );

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
    // console.log({ values });

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
 
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className=" space-y-8 w-full ">
          <div className="grid grid-cols-2 gap-3">
          {/* <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {field.value
                      ? recipientNames.find((recipient) => recipient === field.value) || "Select recipient..."
                      : "Select recipient..."}
                    <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      {...field}
                      placeholder="Search recipient..."
                    />
                    {recipientNames.length === 0 && (
                      <CommandEmpty>No recipient found.</CommandEmpty>
                    )}
                    {recipientNames.length > 0 && (
                      <CommandGroup>
                       <CommandList>
                        {recipientNames.map((recipient, index) => (
                            <CommandItem
                              key={index}
                              value={recipient}
                              onSelect={(currentValue) => {
                                field.onChange(currentValue === field.value ? "" : currentValue);
                                setOpen(false);
                              }}
                            >
                              <FaCheck
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === recipient ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {recipient}
                            </CommandItem>
                          ))}
                       </CommandList>
                      </CommandGroup>
                    )}
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          /> */}
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personas</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una Receptor">
                          {form.watch("recipient")}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent >
                      <ScrollArea className="h-80">
                        {recipientNames.map((item, index) => (
                          <SelectItem key={index} value={item}>{item}</SelectItem>
                        ))}
                      </ScrollArea>                     
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <SelectContent>
                    <ScrollArea className="h-80">
                      {benefitNames.map((item, index) => (
                          <SelectItem key={index} value={item}>{item}</SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
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
              name="enrollment_date"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Fecha de Registro</FormLabel>
                  <Popover key={field.value?.getDate()}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        <FiCalendar className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP", {locale: es}) : <span>Seleccione una fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className=" w-auto p-0">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={field}
                        onSelect={field.onChange}
                        fromYear={1950}
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
                <FormItem >
                  <FormLabel>Fecha de vencimiento</FormLabel>
                  <Popover key={field.value?.getDate()}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        <FiCalendar className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP", {locale: es}) : <span>Seleccione una fecha</span>}
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
        <Button type="submit">Agregar</Button>
      </form>
    </Form>
  )
}

