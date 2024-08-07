import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"
import NextAuth from "next-auth"
import authConfig from "./auth.config"
// import { PrismaClient } from "@prisma/client"
// const prisma = new PrismaClient


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: { strategy: "jwt" },
})