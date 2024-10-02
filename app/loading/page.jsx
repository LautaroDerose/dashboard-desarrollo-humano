// app/loading/page.js
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function LoadingPage() {
  // Obtener la sesión en el servidor
  const session = await auth();

  if (session?.user) {
    const role = session.user.role;

    // Redirigir según el rol
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
  } else {
    // Si no hay sesión, redirige al login
    redirect("/login");
  }

  return (
    <div>
      <div className="w-8 h-8 border-4 border-t-primary border-r-primary border-b-primary-foreground border-l-primary-foreground rounded-full animate-spin"></div>
    </div>
  ); // Página temporal de carga
}