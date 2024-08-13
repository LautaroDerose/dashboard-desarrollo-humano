'use client'
import { registerSchema } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { registerAction } from "@/actions/auth-action"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

export default function FormRegister() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();
  
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    },
  });
  
  async function onSubmit(values) {
    setError(null);
    startTransition(async() => {
      const response = await registerAction(values);
      console.log(response)
      if (response.error) {
        setError(response.error);
      } else {
        router.push("/dashboard-panel");
      }
    });
  };

  return(
    <div className="max-w-52 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ingrese su nombre"
                    type= "text"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Ingrese 
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ingrese su email"
                    type= "email"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Ingrese con el email asignado.
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
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ingrese su Contraseña" 
                    type="password"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            error && <FormMessage>{error}</FormMessage>
          }
          <Button 
            type="submit"
            disabled={isPending}
          >Registrar</Button>
        </form>
      </Form>
    </div>
  )
}