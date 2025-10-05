//'use client'
import { FaPlus, FaUserGroup, FaDoorOpen } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import Link from "next/link";
import { getSession, logout } from "@/lib/actions";
import { redirect } from "next/navigation";
import './style.css';

export default async function Sidebar(props: { className: string }) {

  const session = await getSession()

  return (
    <aside role="navigation" className={`flex flex-col justify-between h-full items-center bg-teal-700 text-teal-50 px-6 p-8 ` + props.className}>
        <div className="sidebar-group">
            <Link href="/" className="sidebar-item"> <FaPlus/> Novo</Link>
            <Link href="/reports" className="sidebar-item"> <FaClipboardList/> Histórico</Link>
            { session.admin ?
              <Link href="/users" className="sidebar-item"> <FaUserGroup/> Usuários</Link>
              : 
              <p className="flex items-center gap-2 px-6 p-2 rounded opacity-30"><FaUserGroup/> Usuários</p>
            }            
        </div>

        <div className="sidebar-group">
          <form action={async() => {
            'use server';
            await logout();
            redirect('/');
          }}>
            <button type="submit" className="sidebar-item">Sair</button>
          </form>
        </div>
    </aside>
  );
}