import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server";
 
const { auth: middleware } = NextAuth(authConfig);

const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/api/auth/verify-email",
];

export default middleware((req) => {
  const { nextUrl, auth } = req
  const isLoogedIn = !!auth?.user
  console.log({ isLoogedIn })

  // proteger /dashboard /admin
  // if (!publicRoutes.includes(nextUrl.pathname) && !isLoogedIn ) {
  //   return NextResponse.redirect(new URL("/login", nextUrl))
  // }
  return NextResponse.next();

});

//obtenido e Clerk
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};