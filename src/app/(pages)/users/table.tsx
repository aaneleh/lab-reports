import { User } from "@/types/user";
import { MdDeleteForever } from "react-icons/md";
import Row from "../../../ui/row";
import { deleteUser, getUsers } from "./actions";
import Table, { Column } from "@/ui/table";

export default async function UserTable() {

/*     const columns: Column<User>[] = [
        { id: "name", label: "Usuário" },
        { id: "admin", label: "Tipo"}
    ] */

    const users = await getUsers();

    return (
        <>
            {/* <Table columns={columns} rows={users}/>  */}
            <div role="table">
                <Row className="bg-teal-700 text-white font-semibold" cells={[
                    <p> Nome </p>,
                    <p> Tipo </p>,
                    <p> Ações </p>
                ]}/>
                { (users).map((el : User, key : number)=>
                    <Row key={key} cells={[
                        <p>{el.name}</p>,
                        <p>{el.admin ? "Admin" : "Usuário"}</p>,
                        <MdDeleteForever className="text-2xl"
                            onClick={async() => {
                                'use server';
                                deleteUser(el.uuid)
                            }}
                        />
                    ]}/>
                )}
            </div>
        </>

  );
}
