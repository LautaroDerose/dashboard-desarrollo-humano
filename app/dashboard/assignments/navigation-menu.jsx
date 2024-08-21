import React from 'react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Asegúrate de importar correctamente los componentes de Tabs
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BsBagPlus, BsCashCoin, BsCreditCard2Back, BsFillDiagram3Fill, BsHouse, BsListColumnsReverse, BsThreeDotsVertical, BsTruck, BsXDiamondFill } from 'react-icons/bs';

export default function NavigationMenuAssignments() {
  const pathname = usePathname(); // Obtiene la ruta actual

  // Mapea los valores de los tabs con las rutas correspondientes
  const tabs = [
    { value: "home", label: "Home", href: "/dashboard/assignments", icon:<BsHouse/> },
    { value: "list", label: "Lista completa", href: "/dashboard/assignments/list", icon:<BsListColumnsReverse/> },
    { value: "subsidios", label: "Subsidios", href: "/dashboard/assignments/subsidios", icon:<BsCreditCard2Back /> },
    { value: "entregas", label: "Entregas", href: "/dashboard/assignments/entregas", icon:<BsBagPlus/> },
    { value: "de-proveedores", label: "De Provedores", href: "/dashboard/assignments/de-proveedores", icon:<BsTruck/> },
    { value: "otros", label: "Otros", href: "/dashboard/assignments/otros", icon:<BsXDiamondFill/> },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Estado de asignacion</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {tabs.map((tab) => (
                <Link href={tab.href} key={tab.label} className='flex items-center gap-2 px-4 py-2 hover:bg-secondary rounded-md  '>
                  {tab.icon} <p>{tab.label}</p>
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}


 {/* <ListItem
                  key={tab.label}
                  title={tab.label}
                  href={tab.href}
                >
                </ListItem> */}
                  {/* {tab.description} */}
export const ListItem = React.forwardRef(function ListItem({ className, title, children, ...props }, ref) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

    // <Tabs value={pathname.slice(1)} className="space-y-4">
    //   <TabsList>
    //     {tabs.map((tab) => (
    //       <Link key={tab.value} href={tab.href} passHref>
    //         <TabsTrigger value={tab.value} asChild>
    //           <span >
    //           {/* <span className={pathname === tab.href ? "selected" : ""}> */}
    //             {tab.label}
    //           </span>
    //         </TabsTrigger>
    //       </Link>
    //     ))}
    //   </TabsList>
    // </Tabs>