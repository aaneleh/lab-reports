import UserTable from "@/app/(pages)/users/table";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import ModalTrigger from "@/ui/modal";
import UserForm from "@/app/(pages)/users/form";

export default async function Users() {

  const session = await getSession();
  if(session == undefined || !session.admin) redirect('/');

  return (
    <div className="main-content">
      <div className="flex items-center justify-between">
        <h2>Usuários</h2>
        <ModalTrigger label={"Criar usuário"}>
          <UserForm></UserForm>
        </ModalTrigger>
      </div>
      <UserTable/>
    </div>
  )

}