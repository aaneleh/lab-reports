import UserModal from "@/components/userModal";
import UserTable from "@/components/userTable";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Users() {

  const session = await getSession();
  if(session == undefined || !session.admin) redirect('/');

  return (
    <div>
      <h2>Usuários</h2>
      <UserTable/>
      <UserModal/>
    </div>
  )

}
