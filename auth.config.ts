import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./lib/zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"
// import { nanoid } from "nanoid";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);
        
        if (!success) {
          throw new Error("Invalid Credentials");
        }
        
        // Verificar si el usuario existe en la base de datos
        const user = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
        });
        
        if (!user) {
          throw new Error("Usuario no encontrado || credenciales invalidas");
        }
        
        // Verificar si la contrasena es correcta
        const isValid = await bcrypt.compare(data.password, user.password);
        
        if (!isValid) {
          throw new Error("Contrasena incorrecta || credenciales invalidas");
        }

        // // Verificacion de email
        // if(!user.emailVerified) {
        //   const verifyTokenExists = await prisma.verificationToken.findFirst({
        //     where: { 
        //       identifier: user.email 
        //     },
        //   });

        //   // si existe un token, lo eliminamos.

        //   if(verifyTokenExists?.identifier) {
        //     await prisma.verificationToken.delete({
        //       where:{
        //         identifier: user.email,
        //       },
        //     });
        //   }

        //   const token = nanoid()

        //   await prisma.verificationToken.create({
        //     data: {
        //       identifier: user.email, 
        //       token,
        //       expires: new Date(Date.now() + 1000 * 60 * 60 * 24 ),
        //     },
        //   });


        //   // enviar email de verificacion
        //   throw new Error("Chequear email de verificacion")

        // } 



        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

// Notice this is only an object, not a full Auth.js instance
// export default {
//   providers: [
//     Credentials({
//       authorize: async (credentials) => {
        
//         const { data, success } = loginSchema.safeParse(credentials);
        
//         if(!success) {
//           throw new Error("Invalid Credentials");          ;
//         }
        
//         // Verificar si el usuario existe en la base
//         const user = await prisma.user.findUnique({
//           where: {
//             email: data.email,
//             password: data.password
//           }
//         });
        
//         if(!user || !user.password ) {
//           throw new Error("usuario no encontrado || credenciales invalidas");          ;
//         }
        
//         // Verificar si la contrasena es correcta
//         const isValid = await bcrypt.compare(data.password, user.password);
        
//         if(!isValid ) {
//           throw new Error("Contrasena incorrecta || credenciales invalidas");          ;
//         }

//         return user;

//       },
//     }),
//   ],
// } satisfies NextAuthConfig;


