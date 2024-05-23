import React from 'react'
import { MdAnalytics, MdAttachMoney, MdDashboard, MdHelpCenter, MdLogout, MdOutlineSettings, MdPeople, MdShoppingBag, MdSupervisedUserCircle, MdWork } from "react-icons/md"
import MenuLink from './menuLink/menuLink';
import Image from 'next/image';

const menuItems = [
  {
    title: "Inicio",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Usuarios",
        path: "/dashboard/recipients",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Beneficios",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Fondos",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Funciones",
    list: [
      {
        title: "Informes",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Estadisticas",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Balances",
        path: "/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];


const Sidebar = () => {

  const styles = {
    container: 'w-full flex px-4 py-2 items-center gap-2 text-slate-300 hover:bg-slate-600 active:bg-slate-600 rounded-md m-2   ', 
    containerActive: ' bg-slate-600  ', 
  };

  return (
    <div className='bg-slate-800 sticky top-10'>
      <div className={`user flex items-center justify-center gap-5 mb-5 `}>
        <Image src="/avatar.png" alt='' width={50} height={50} className='rounded-full object-cover ' />
        <div className={`userDetail flex flex-col `}>
          <span className={`userName font-medium`}>Juan Perez</span>
          <span className={`userTitle text-xs text-slate-400 `}>Administrador</span>
        </div>
      </div>
      <ul className={`list list-none `}>
        {
          menuItems.map((cat) => (
            <li key={cat.title}>
              <span className={`cat text-emerald-600 font-bold text-sm mt-10  `}>{cat.title}</span>
              {cat.list.map((item) => (
                <MenuLink item={item} key={item.title} />
              ))}
            </li>   
          ))
        }
      </ul>
      <button className={styles.container}><MdLogout />Logout</button>
    </div>
  )
}

export default Sidebar