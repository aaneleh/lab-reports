import { getSession } from "@/lib/actions";
import { LuGithub } from "react-icons/lu";

export default async function Navbar() {

  const session = await getSession()
  const username = session.name

  return (
    <div role="navigation" className="flex justify-between items-center bg-teal-700 text-teal-50 px-6 p-4">
        <h1 className="flex gap-2 items-center"> <LuGithub /> lab-reports</h1>
        <p> {username} </p>
    </div>
  );
}
