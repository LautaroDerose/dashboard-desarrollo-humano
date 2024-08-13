'use client'
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handlerClick = async () => {
    await signOut({
      // redirect: "/login"
      callbackUrl:"/login"
    
    })
  }
  return(
    <div>
      <button onClick={handlerClick} >
        Cerrar sesion
      </button>
    </div>
  )
}