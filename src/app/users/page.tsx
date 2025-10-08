import Button from "@/components/button";
import UserModal from "@/components/userModal";
import UserTable from "@/components/userTable";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Users() {

  const session = await getSession();
  if(session == undefined || !session.admin) redirect('/');

  //const [ modalOpen, setModalOpen ] = useState<boolean>(false);

  return (
    <div className="main-content">
      <div className="flex items-center justify-between">
        <h2>Usuários</h2>
        <Button>Criar usuário</Button>
      </div>
      <UserTable/>
      <UserModal/>
    </div>
  )

}
