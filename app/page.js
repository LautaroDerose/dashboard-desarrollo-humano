import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import HomeClient from '@/components/home-page';

// Forzamos la renderización dinámica
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Verificamos la sesión en el servidor
  const session = await auth();

  // Si el usuario está autenticado, redirigimos basado en su rol
  if (session?.user) {
    const role = session.user.role;

    switch (role) {
      case 'subsecretaria':
        redirect("/subsecretaria");
        break;
      case 'contaduria':
        redirect("/contaduria");
        break;
      case 'tesoreria':
        redirect("/tesoreria");
        break;
      case 'trabajador_social':
        redirect("/trabajador_social");
        break;
      case 'secretaria_dh':
        redirect("/secretaria_dh");
        break;
      case 'provedor':
        redirect("/provedor");
        break;
      case 'admin':
        redirect("/dashboard-panel");
        break;
      default:
        redirect("/dashboard-panel"); // Ruta predeterminada
        break;
    }
  }

  // Si no está autenticado, mostramos el componente cliente con el login
  return <HomeClient />;
}

// import { auth } from '@/auth';
// import { redirect } from 'next/navigation';
// import HomeClient from '@/components/home-page';

// export default async function Home() {
//   // Verificamos la sesión en el servidor
//   const session = await auth();

//   // Si el usuario está autenticado, redirigimos basado en su rol
//   if (session?.user) {
//     const role = session.user.role;

//     switch (role) {
//       case 'subsecretaria':
//         redirect("/subsecretaria");
//         break;
//       case 'contaduria':
//         redirect("/contaduria");
//         break;
//       case 'tesoreria':
//         redirect("/tesoreria");
//         break;
//       case 'trabajador_social':
//         redirect("/trabajador_social");
//         break;
//       case 'secretaria_dh':
//         redirect("/secretaria_dh");
//         break;
//       case 'provedor':
//         redirect("/provedor");
//         break;
//       case 'admin':
//         redirect("/dashboard-panel");
//         break;
//       default:
//         redirect("/dashboard-panel"); // Ruta predeterminada
//         break;
//     }
//   }

//   // Si no está autenticado, mostramos el componente cliente con el login
//   return <HomeClient />;
// }


// import FormLogin from '@/components/auth/form-login';
// import Link from 'next/link';

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center p-24">
//       <h1 className="text-2xl font-bold mb-4">HomePage</h1>
//       <FormLogin />
//     </main>
//   );
// }


// import Link from 'next/link';

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <h1 className="text-2xl font-bold mb-4">HomePage</h1>
//       <nav className="flex flex-col items-center space-y-4">
//         <Link className="text-blue-500 hover:underline" href="/auth">
//           Auth
//         </Link>
//         <Link className="text-blue-500 hover:underline" href="/providers">
//           Providers
//         </Link>
//         <Link className="text-blue-500 hover:underline" href="/roles-internos">
//           Roles Internos
//         </Link>
//         <Link className="text-blue-500 hover:underline" href="/admin">
//           Admin
//         </Link>
//         <Link className="text-blue-500 hover:underline" href="/api">
//           API
//         </Link>
//         <Link className="text-blue-500 hover:underline" href="/dashboard">
//           Dashboard
//         </Link>
//         <Link className="text-blue-500 hover:underline" href="/dashboard-panel">
//           Dashboard Panel
//         </Link>
//       </nav>
//     </main>
//   );
// }