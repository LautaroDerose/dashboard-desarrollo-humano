'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const styles = {
  container: 'w-full flex px-4 py-2 items-center gap-2 text-slate-300 hover:bg-slate-600 active:bg-slate-600 rounded-md m-2   ', 
  containerActive: ' bg-slate-600  ', 
};

export default function MenuLink({item}) {
  
  const pathname = usePathname()


  return(
    <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.containerActive}`}>
      {item.icon}
      {item.title}
    </Link>
  )
}