import Navbar from "@/components/navbar";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { getSession } from "@/lib/actions";
import Login from "./login/page";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

{
  const session = await getSession();

  if(session === null) {
    return ( 
      <html lang="en">
        <body className={`sans-serif antialiased h-200`}>
          <main className="col-span-4">
            <Login/>
          </main>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className={`sans-serif antialiased h-200`}>
        <Navbar/>
        <div className="grid grid-cols-5 h-full">
          <Sidebar className="col-span-1"/>
          <main className="col-span-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
