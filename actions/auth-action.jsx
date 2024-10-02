'use server'
import { z } from "zod";
import { signIn } from "@/auth"
import { loginSchema, registerSchema } from "@/lib/zod"
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

// export async function loginAction(values) {
//   try {
//     // Lógica de login (esto puede incluir la validación del usuario en la base de datos)
//     const session = await auth(values);

//     if (session?.user) {
//       const role = session.user.role;

//       // Redirige al usuario según su rol
//       switch (role) {
//         case 'subsecretaria':
//           redirect("/desarrollo-humano/subsecretaria");
//           break;
//         case 'contaduria':
//           redirect("/contaduria");
//           break;
//         case 'tesoreria':
//           redirect("/tesoreria");
//           break;
//         case 'trabajador_social':
//           redirect("/desarrollo-humano/trabajador_social");
//           break;
//         case 'secretaria_dh':
//           redirect("/desarrollo-humano/secretaria_dh");
//           break;
//         case 'provedor':
//           redirect("/provedor");
//           break;
//         case 'admin':
//           redirect("/dashboard-panel");
//           break;
//         default:
//           redirect("/dashboard-panel"); // Ruta predeterminada
//           break;
//       }
//     } else {
//       throw new Error("Credenciales inválidas");
//     }
//   } catch (error) {
//     return { error: error.message };
//   }
// }

export const loginAction = async(values) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password, 
      redirect: false,
    });
    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" }
  }
}

export const registerAction = async(values) => {
  try {
    const {data, success} = registerSchema.safeParse(values);
    
    if (!success) {
      return {
        error: "Invalid data",
      }
    };
    
    // Verificar si el usuario existe en la base
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      }
    });
    
    if (user) {
      return {
        error: "Usuario Existente",
      }
    };

    // Hash de contrasena
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Crear usuario
    await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: passwordHash,
      }
    });
    
    await signIn("credentials", {
      email: values.email,
      password: values.password, 
      redirect: false,
    });

    return { success: true }
    
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" }
  }
}