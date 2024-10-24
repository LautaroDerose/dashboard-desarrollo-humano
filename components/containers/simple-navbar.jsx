import Link from "next/link";
import { CircleUser, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "../theme/mode-toggle";
import { auth } from "@/auth";
import LogoutButton from "../auth/logout-button";
import clsx from "clsx";

// Componente Navbar simplificado con baseHref como prop
export default async function SimpleNavbar({ baseHref }) {
  const session = await auth();
  const user = session?.user;

  // Determina el contenido basado en el rol del usuario
  const getRoleContent = () => {
    switch (user?.role) {
      case "subsecretaria":
        return <span className="align-middle">SSG</span>;
      case "contaduria":
        return <span className="align-middle">CNT</span>;
      default:
        return <span className="align-middle">DH</span>;
    }
  };

  // Enlaces de navegación basados en el baseHref
  const navLinks = [
    { id: 1, label: "Panel", href: `${baseHref}` },
    { id: 2, label: "Lista", href: `${baseHref}/list` },
  ];

  return (
    <header className="sticky z-10 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 mb-2">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Link href="#" className="w-fit flex items-center justify-center border-4 rounded-full p-2">
            {getRoleContent()}
          </Link>
        </div>
        {navLinks.map((link) => (
          <div className="hidden md:block" key={link.id}>
            <Link
              href={link.href}
              className={clsx(
                "text-muted-foreground transition-colors hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          </div>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <div className="w-fit flex items-center justify-center border-4 rounded-full p-2">
                {getRoleContent()}
              </div>
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="rounded-full">
              <span>{user ? user.name : "Name"}</span>
              <CircleUser className="h-5 w-5 ml-4" />
            </Button>
          </DropdownMenuTrigger>
          <ModeToggle />
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

// import Link from "next/link"
// import {
//   Activity,
//   ArrowUpRight,
//   CircleUser,
//   CreditCard,
//   DollarSign,
//   Menu,
//   Package2,
//   Search,
//   Users,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// import { MdCheck, MdClose, MdInfoOutline, MdMoreHoriz, MdOutlinePause, MdOutlinePauseCircle, MdOutlinePriorityHigh } from "react-icons/md"
// import { ModeToggle } from "../theme/mode-toggle";
// import clsx from "clsx";
// import { auth } from "@/auth";
// import LogoutButton from "../auth/logout-button"


// const styles = {
//   container: 'flex px-4 py-2 items-center gap-2 text-slate-300 hover:bg-slate-600 active:bg-slate-600 rounded-md m-2   ', 
//   containerActive: ' bg-slate-600  ', 
// };

// // const nasvLinks = [
// //   {
// //     id: 1,
// //     label: "Panel",
// //     href: "/subsecretaria"
// //   },
// //   {
// //     id: 2,
// //     label: "Lista",
// //     href: "/subsecretaria/list"
// //   },
// // ]

// export default async function SimpleNavbar () {
//   const session = await auth();
//   const user =  session?.user

//    // Determina el contenido basado en el rol del usuario
//    const getRoleContent = () => {
//     switch (user?.role) {
//       case 'subsecretaria':
//         return <span className="align-middle">SSG</span>;
//       case 'contaduria':
//         return <span className="align-middle">CNT</span>;
//       default:
//         return <span className="align-middle">DH</span>; // Default case or handle unrecognized roles
//     }
//   };

//   // Genera los enlaces dinámicos basados en el rol del usuario
//   const generateNavLinks = () => {
//     const baseHref = `/${user?.role || 'default'}`;
//     return [
//       { id: 1, label: "Panel", href: `${baseHref}` },
//       { id: 2, label: "Lista", href: `${baseHref}/list` },
//     ];
//   };
  
//   const navLinks = generateNavLinks();
//   {/* <Link
//     key={link.id}
//     href={link.href}
//     className={clsx(
//       'text-muted-foreground transition-colors hover:text-foreground',
//     )}
//   >
//   <p className="hidden md:block">{link.label}</p>
//   </Link> */}

//   return (
//       <header className="sticky z-10 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 mb-2 ">
//         <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
//           <div className="flex items-center gap-2 text-lg font-semibold md:text-base" >
//             {/* <Package2 className="h-6 w-6" /> <span className="sr-only">Acme Inc</span> */}
//             <Link  href="#" className="w-fit flex items-center justify-center border-4 rounded-full p-2">
//             {getRoleContent()}
//           </Link>
//           </div>
//           {navLinks.map((link) => {
//             return (
//               <div className="hidden md:block" >
//                 <Link 
//                   key={link.id}
//                   href={link.href}
//                   className={clsx(
//                     'text-muted-foreground transition-colors hover:text-foreground',
//                   )}
//                 >{link.label}</Link>
//               </div>
//             );
//           })}
//         </nav>
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button
//               variant="outline"
//               size="icon"
//               className="shrink-0 md:hidden"
//             >
//               <Menu className="h-5 w-5" /> <span className="sr-only">Toggle navigation menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left">
//             <nav className="grid gap-6 text-lg font-medium">
//               <Link href="#" className="flex items-center gap-2 text-lg font-semibold" >
//                 {/* <Package2 className="h-6 w-6" /> <span className="sr-only">Acme Inc</span> */}
//                 <div className="w-fit flex items-center justify-center border-4 rounded-full p-2"><span className=" align-middle ">DH</span></div>                
//               </Link>
//               <Link href="/dashboard" className="text-muted-foreground hover:text-foreground"> Dashboard </Link>
//               <Link href="/dashboard/assignments" className="text-muted-foreground hover:text-foreground" > Asignaciones </Link>

//             </nav>
//           </SheetContent>
//         </Sheet>
//         <div className="flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="secondary"  className="rounded-full">
//               {/* <Button variant="secondary" size="icon" className="rounded-full"> */}
//                 <span>{ user ? user.name : 'Name'}</span>
//                 <CircleUser className="h-5 w-5 ml-4" />
//                 {/* <span className="sr-only">Toggle user menu</span> */}
//               </Button>
//             </DropdownMenuTrigger>
//             <ModeToggle />
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Settings</DropdownMenuItem>
//               <DropdownMenuItem>Support</DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem><LogoutButton /></DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </header>
//   )
// }
