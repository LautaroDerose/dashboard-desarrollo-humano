'use client'
import { usePathname } from "next/navigation";
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { MdCheck, MdClose, MdInfoOutline, MdMoreHoriz, MdOutlinePause, MdOutlinePauseCircle, MdOutlinePriorityHigh } from "react-icons/md"
import { ModeToggle } from "../mode-toggle";
import { nasvLinks } from "@/constants";
import clsx from "clsx";


const styles = {
  container: 'flex px-4 py-2 items-center gap-2 text-slate-300 hover:bg-slate-600 active:bg-slate-600 rounded-md m-2   ', 
  containerActive: ' bg-slate-600  ', 
};


const Navbar = () => {

  const pathname = usePathname()

  return (
      <header className="sticky z-10 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 mb-2 ">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base" >
            {/* <Package2 className="h-6 w-6" /> <span className="sr-only">Acme Inc</span> */}
            <div className="w-fit flex items-center justify-center border-4 rounded-full p-2"><span className=" align-middle ">DH</span></div>
          </Link>
        
          {nasvLinks.map((link) => {
            return (
              <Link
                key={link.label}
                href={link.href}
                className={clsx(
                  'text-muted-foreground transition-colors hover:text-foreground',
                  {
                    'text-bold text-white': pathname === link.href,
                  },
                )}
              >
              <p className="hidden md:block">{link.label}</p>
              </Link>
            );
          })}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" /> <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="#" className="flex items-center gap-2 text-lg font-semibold" >
                {/* <Package2 className="h-6 w-6" /> <span className="sr-only">Acme Inc</span> */}
                <div className="w-fit flex items-center justify-center border-4 rounded-full p-2"><span className=" align-middle ">DH</span></div>                
              </Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground"> Dashboard </Link>
              <Link href="/dashboard/assignments" className="text-muted-foreground hover:text-foreground" > Asignaciones </Link>
              <Link href="/dashboard/recipients" className="text-muted-foreground hover:text-foreground" > Personas </Link>
              <Link href="/dashboard/benefits" className="text-muted-foreground hover:text-foreground" > Beneficios </Link>
              <Link href="/dashboard/estadisticas" className="text-muted-foreground hover:text-foreground" > Estadisticas</Link>
              {/* <Link href="/dashboard/estadisticas" className="text-muted-foreground hover:text-foreground" > Estadisticas <//Link> */}
              <Link href="#" className="text-muted-foreground hover:text-foreground" > Informes </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <ModeToggle />
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
  )
}

export default Navbar
// 'use client'
// import { usePathname } from "next/navigation";
// import { MdNotifications, MdOutlineChat, MdPublic, MdSearch, } from "react-icons/md"
// import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";

// import { ModeToggle } from "../elements/mode-toggle";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { TbDots } from "react-icons/tb";


// const styles = {
//   container: 'flex px-4 py-2 items-center gap-2 text-slate-300 hover:bg-slate-600 active:bg-slate-600 rounded-md m-2   ', 
//   containerActive: ' bg-slate-600  ', 
// };

// const Navbar = () => {

//   const pathname = usePathname()

//   return (
//     <div className="flex items-center justify-between rounded-lg  py-4  ">
//       <div className="font-bold  px-4 capitalize">{pathname.split("/").pop()}</div>
//       <div className="flex py-4 px-2 gap-2">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="gap-2">
//             <IoSettingsSharp/>
//               UserAdmin

//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>User</DropdownMenuLabel>
//             {/* <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(recipient.id)}
//             >
//               Copy recipient ID
//             </DropdownMenuItem> */}
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Settings</DropdownMenuItem>
//             <DropdownMenuItem>Help</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//         <Button variant="ghost"><Link href={"/"} >Dashboard</Link></Button>
//         <Button variant="ghost"><Link href={"/"} >Beneficiarios</Link></Button>
//         <Button variant="ghost"><Link href={"/"} >Beneficios</Link></Button>
//       </div>
//       <div className="flex items-center gap-5 ">
//         <div className="flex items-center gap-3  p-1  rounded-md ">
//           <MdSearch />
//           <input type="text" placeholder="Search..." className='bg-transparent outline-none rounded-md'/>
//         </div>
//         <div className="flex gap-3 px-3">
//           <MdOutlineChat className="" size={20} />
//           <MdNotifications className="" size={20} />s
//           <MdPublic className="" size={20} />
//           <ModeToggle />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar
