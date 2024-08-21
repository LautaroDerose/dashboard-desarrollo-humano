import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth: middleware } = NextAuth(authConfig);

const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/api/auth/verify-email",
];

// Define las rutas principales por rol
const roleBasedHomepages = {
  subsecretaria: "/subsecretaria",
  contaduria: "/contaduria",
  provedores: "/provedores",
  admin: "/admin",
};

export default middleware(async (req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;
  const userRole = auth?.user?.role;
  const roleHomepage = roleBasedHomepages[userRole];

  // Si no está logueado, redirigir al login
  if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  switch (userRole) {
    case "subsecretaria":
      if (!nextUrl.pathname.startsWith('/contaduria')) {
        return NextResponse.redirect(new URL('/subsecretaria', nextUrl));
      }
      break;
    // case "contaduria":
    //   if (!nextUrl.pathname.startsWith(roleHomepage)) {
    //         return NextResponse.redirect(new URL(roleHomepage, nextUrl));
    //       }
    //   break;
  
    default:
      break;
  }

  // Si está logueado y no tiene el rol adecuado, redirigir a la página principal del rol
  // if (isLoggedIn) {
  //   if (userRole !== 'contaduria' && nextUrl.pathname.startsWith('/contaduria')) {
  //     return NextResponse.redirect(new URL(roleHomepage, nextUrl));
  //   }
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
// import NextAuth from "next-auth"
// import authConfig from "./auth.config"
// import { NextResponse } from "next/server";
 
// const { auth: middleware } = NextAuth(authConfig);

// const publicRoutes = [
//   "/",
//   "/login",
//   "/register",
//   "/api/auth/verify-email",
// ];

// // Define las rutas principales por rol
// const roleBasedHomepages = {
//   subsecretaria: "/roles-internos/subsecretaria",
//   contaduria: "/roles-internos/contaduria",
//   provedores: "/provedores",
//   admin: "/admin",
// };

// export default middleware((req) => {
//   const { nextUrl, auth } = req
//   const isLoogedIn = !!auth?.user
//   // console.log({ isLoogedIn })

//   // Si no está logueado, redirigir al login
//   if (!publicRoutes.includes(nextUrl.pathname) && !isLoogedIn ) {
//     return NextResponse.redirect(new URL("/login", nextUrl))
//   }
  
  
//   return NextResponse.next();

// });

// //obtenido e Clerk
// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };