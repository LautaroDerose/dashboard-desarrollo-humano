import { auth } from "@/auth"
import LogoutButton from "@/components/auth/logout-button"
import Link from 'next/link';

 
export default async function DashboardPage() {
  const session = await auth()
 
  if (!session) {
    return <div>Not authenticated</div>
  }
 
  return (
    <div className="container">
      <pre>
        {
          JSON.stringify(session, null, 2)
        }
      </pre>
      <div>
      <Link className="text-blue-500 hover:underline" href="/auth">Auth</Link>
         <Link className="text-blue-500 hover:underline" href="/providers">Providers</Link>
         <Link className="text-blue-500 hover:underline" href="/roles-internos">Roles Internos</Link>
         <Link className="text-blue-500 hover:underline" href="/admin">Admin</Link>
         <Link className="text-blue-500 hover:underline" href="/api">API</Link>
         <Link className="text-blue-500 hover:underline" href="/dashboard">Dashboard</Link>
         <Link className="text-blue-500 hover:underline" href="/dashboard-panel">Dashboard Panel</Link>
      </div>
      <LogoutButton />
    </div>
  )
}
    // <div className="container">
    //   <pre>{session}</pre>
    // </div>