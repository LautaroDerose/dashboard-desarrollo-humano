import "../../../globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import SimpleNavbar from "@/components/containers/simple-navbar";
import { auth } from "@/auth"

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default async function ContaduriaLayout({ children }) {
  
  const session = await auth()
  
  if (session?.user?.role !== "secretaria_dh" && session?.user?.role !== "admin") {
    return <div>No eres del área de Secretaria de Desarrollo Humano</div>
 }

  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
      <SimpleNavbar baseHref={"/secretaria_dh"} />
        {children}
      </ThemeProvider>
    </div>
  );
}