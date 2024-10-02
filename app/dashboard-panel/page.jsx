import { auth } from "@/auth"
import LogoutButton from "@/components/auth/logout-button"
 
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
      <LogoutButton />
    </div>
  )
}
    // <div className="container">
    //   <pre>{session}</pre>
    // </div>