import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"
import NextAuth from "next-auth"
import authConfig from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    // jwt() se ejecut cada vez que e crea o actualiz un token jwt
    // Aqui es donde puedes agregar informacion addicional al token
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.role = user.role;
      }
      return token
    },
    // session() se utiliza para agregar la informacion del token a la sesion de usuario. Lo que hace que este disponible en el cliente
    session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
})