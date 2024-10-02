'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/actions/auth-action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/zod";

export default function FormLogin() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setError(null);

    const response = await loginAction(values);

    if (response?.error) {
      setError(response.error);
    } else {
      // Redirige a una página de carga mientras se maneja la sesión
      router.push("/loading");
    }
  }

  return (
    <div className="max-w-52">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su email" type="email" {...field} />
                </FormControl>
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
                  <Input placeholder="Ingrese su Contraseña" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormMessage>{error}</FormMessage>}
          <Button type="submit">Enviar</Button>
        </form>
      </Form>
    </div>
  );
}
// 'use client'
// import { z } from "zod";
// import { loginSchema } from "@/lib/zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
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
// import { loginAction } from "@/actions/auth-action"
// import { useState, useTransition } from "react"
// import { useRouter } from "next/navigation"
// import { auth } from "@/auth"


// export default function FormLogin() {
//   const router = useRouter();
//   const [error, setError] = useState(null);
//   const [isPending, startTransition] = useTransition();
  
//   const form = useForm({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });
  
//   async function onSubmit(values) {
//     setError(null);
//     startTransition(async() => {
//       const response = await loginAction(values);
//       // console.log(response)
//       if (response.error) {
//         setError(response.error);
//       } else {
//         router.push("/dashboard-panel");
//       }
//     });
//   };

//   return(
//     <div className="max-w-52 ">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input 
//                     placeholder="Ingrese su email"
//                     type= "email"
//                     {...field} 
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   Ingrese con el email asignado.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Contraseña</FormLabel>
//                 <FormControl>
//                   <Input 
//                     placeholder="Ingrese su Contraseña" 
//                     type="password"
//                     {...field} 
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {
//             error && <FormMessage>{error}</FormMessage>
//           }
//           <Button 
//             type="submit"
//             disabled={isPending}
//           >Enviar</Button>
//         </form>
//       </Form>
//     </div>
//   )
// }