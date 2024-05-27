"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  emailAddress: z.string().email(),
  password: z.string().min(3),
  passwordConfirm: z.string(),
  locality: z.enum(["Carhue", "San Miguel", "Rivera"]),
  streetCrahue: z.enum(["Av. Alsina", "Av. Roca"]).optional(),
  streetRivera: z.enum(["Av. Avellaneda", "Av. Lavalle"]).optional()
}).refine(
  (data) => {
    return data.password === data.passwordConfirm
  }, {
    message:"Contrasen no coincide",
    path: ["passwordConfirm"]
  }
).refine(
  (data) => {
    if (data.locality === "Carhue") {
      return !!data.streetCrahue;
    } else if (data.locality === "Rivera") {
      return !!data.streetRivera;
    }
    return true;
  }, {
    message: "Debes ingresar una calle válida para la localidad seleccionada",
    path: ["locality"],
  }
);

export function RecipientForm() {
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      passwordConfirm: "",
      locality: "",
      streetCrahue: "",
      streetRivera: ""
    }
  })

  const locality = form.watch("locality")

  const handleSubmit = (values) => {
    console.log({values})
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="Ej.: Pablo" {...field} />
              </FormControl>
              <FormDescription>
                Ingrese su nombre de pila
              </FormDescription>
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
                    <SelectValue placeholder>
                      {form.watch("locality") || "Seleccione una localidad"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Carhue">Carhue</SelectItem>
                  <SelectItem value="Rivera">Rivera</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          locality === "Carhue" && 
            <FormField
          control={form.control}
          name="streetCarhue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seleccionar calle de Carhue</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder>
                      {form.watch("streetCarhue") || "Seleccione una direccion"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Av. Roca">Av. Roca</SelectItem>
                  <SelectItem value="Av. Alsina">Av. Alsina</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        }
        {
          locality === "Rivera" && 
            <FormField
          control={form.control}
          name="streetRivera"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seleccionar calle de Rivera</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder>
                      {form.watch("streetRivera") || "Seleccione una direccion"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Av. Avellaneda">Av. Avellaneda</SelectItem>
                  <SelectItem value="Av. Lavalle">Av. Lavalle</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        }
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
                Ingrese su direccion de email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*******" {...field} type="password" />
              </FormControl>
              <FormDescription>
                Ingrese su contrsena
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Confirm</FormLabel>
              <FormControl>
                <Input placeholder="confirme su contrasena" {...field} type="password" />
              </FormControl>
              {/* <FormDescription>
                Ingrese su direccion de email
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
