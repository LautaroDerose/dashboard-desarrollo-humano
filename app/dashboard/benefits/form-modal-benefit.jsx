
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

import { FiCalendar } from "react-icons/fi";

export function FormModalBenefit({ benefits, benefitCategories }) {

  // console.log(data)
  // const benefits = data.benefits
  // const categories = data.benefitCategories
  const categories = benefitCategories.map((category) => category.name);
  const formSchema = z.object({
    category: z.enum(benefitCategories, { required_error: "Seleccione una categoria" }),
    benefit:z.string().min(3, { message: "El nombre debe tener al menos 3." }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      benefit: ""
    },
  });

  // const locality = form.watch("locality");

  const handleSubmit = async (values) => {
    console.log({ values });
    
    // const selectedCategory = categories.find(category => category.name === values.category);
    const payload = {
      category_id:categories.find(category => category.name === values.category).id,
      name:values.benefit
    };

    console.log('Payload:', payload);

    try {
      const response = await fetch('/api/benefit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Error al agregar un Beneficio");
      }
      const result = await response.json();
      console.log('Result:', result);
      alert("Beneficio creado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <Form {...form}  >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8  ">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria de Beneficio</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={form.watch("category") || "Seleccione una categoria"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((item, index) => (
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
            name="benefit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Beneficio</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese el nombre del beneficio" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Agregar</Button>
      </form>
    </Form>
  );
}

