//'use client'
import { FaPlus, FaUserGroup, FaDoorOpen } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import Link from "next/link";
import { logout } from "@/lib/actions";
import { redirect } from "next/navigation";

export default function Sidebar(props: { className: string }) {

/*   const handleLogout = () : void => {
    logout();
  } */

  return (
    <aside role="navigation" className={`flex flex-col justify-between h-full items-center bg-teal-700 text-teal-50 px-6 p-8 ` + props.className}>
        <div className="flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-2 px-6 p-2 rounded hover:bg-teal-600 transition"> <FaPlus/> Novo</Link>
            <Link href="/reports" className="flex items-center gap-2 px-6 p-2 rounded hover:bg-teal-600 transition"> <FaClipboardList/> Histórico</Link>
            <Link href="/users" className="flex items-center gap-2 px-6 p-2 rounded hover:bg-teal-600 transition"> <FaUserGroup/> Usuários</Link>
        </div>

        <div className="flex flex-col gap-8">
          <form action={async() => {
            'use server';
            await logout();
            redirect('/');
          }}>
            <button type="submit">Sair</button>
          {/* <p onClick={()=> logout()} className="flex items-center gap-2 px-6 p-2 rounded hover:bg-teal-600 transition"> <FaDoorOpen/> Sair</p> */}
          </form>
        </div>
    </aside>
  );
}