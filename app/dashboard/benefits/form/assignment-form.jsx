
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

export function RecipientForm({ assignments, recipients, benefits }) {

  const benefitNames = benefits.map((benefit) => benefit.name);

  const conditionNames = [...new Set(socialConditions.map((condition) => condition.name))];
  const FactorNames = [...new Set(riskFactors.map((factor) => factor.name))];

  const formSchema = z.object({
    
    benefit: z.enum(benefitNames),
    
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      benefit: "",
      
    },
  });

  // const locality = form.watch("locality");

  const handleSubmit = (values) => {
    console.log({ values });
  };

  return (
    <Form {...form}  >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-full ">
        <FormField
          control={form.control}
          name="benefit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localidad</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={form.watch("benefit") || "Seleccione una beneficio"} />
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
