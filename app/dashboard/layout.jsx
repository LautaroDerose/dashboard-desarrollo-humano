import Navbar from "@/components/containers/Navbar";
import Sidebar from "@/components/containers/sidebar/Sidebar";
import Link from "next/link";

export default function DashboardLayout({ children }) {
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