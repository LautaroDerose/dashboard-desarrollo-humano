import Navbar from "@/components/containers/Navbar";
// import { auth } from "@/auth"

export default async function DashboardLayout({ children }) {

//   const session = await auth()
  
//   if (session?.user?.role !== "user_dh" && session?.user?.role !== "admin") {
//     return <div>No eres del área de Desarrollo Humano</div>
//  }

  return (
    <div className="flex" >
      {/* <div className="h-screen flex bg-slate-800 p-5">
        <Sidebar />
      </div> */}

      <div className=" flex-auto px-4">
        <Navbar />
        {children}
      </div>
    </div>
  );
}