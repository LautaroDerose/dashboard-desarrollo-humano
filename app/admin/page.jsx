import { auth } from "@/auth"
import LogoutButton from "@/components/auth/logout-button"
import Link from 'next/link';

export default async function Admin() {
  const session = await auth()

  if (session?.user?.role !== "admin") {
    return <div>No eres administrador</div>
  }

  return(
    <div className="container">
      AdminPage
      <pre>
        {
          JSON.stringify(session, null, 2)
        }
      </pre>
      <Link className="text-blue-500 hover:underline" href="/auth">Auth</Link>
         <Link className="text-blue-500 hover:underline" href="/providers">Providers</Link>
         <Link className="text-blue-500 hover:underline" href="/roles-internos">Roles Internos</Link>
         <Link className="text-blue-500 hover:underline" href="/admin">Admin</Link>
         <Link className="text-blue-500 hover:underline" href="/api">API</Link>
         <Link className="text-blue-500 hover:underline" href="/dashboard">Dashboard</Link>
         <Link className="text-blue-500 hover:underline" href="/dashboard-panel">Dashboard Panel</Link>
      <LogoutButton />
    </div>
  )
}