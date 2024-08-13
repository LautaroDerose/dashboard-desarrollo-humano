import { auth } from "@/auth"
import LogoutButton from "@/components/auth/logout-button"

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
      <LogoutButton />
    </div>
  )
}