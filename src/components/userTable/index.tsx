"use client"
import { User } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function UserTable() {

    const [users, setUsers] = useState<User[] | []>([])
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(()=> {
      const getUsers = async():Promise<User[] | []> => {
  
          await axios.get(`${API_URL}/users`).then((res) => {
              console.log(res)
              setUsers(res.data.data)
              return 
          }).catch((err) => {
              console.log("err",err.status)
          })
  
          return [];
      };

      getUsers();
  }, [])

    async function handleClick(uuid: string | undefined): Promise<void> {
        await axios.delete(`${API_URL}/users`, {params: { uuid: uuid}}).then((res) => {
              console.log(res)
              setUsers(users.filter(el => el.uuid !== uuid))
            }).catch((err) => {
              console.log("err",err.status)
          })
    }

  return (
    <div>
        <div className="flex">
            <p> NOME </p>
            <p> ADMIN? </p>
            <p> AÇÕES </p>
        </div>
        { users.map((el : User, key : number)=>
        <div key={key} className="flex">
            <p> {el.name} </p>
            <p> {el.admin ? "Admin" : "Usuário"} </p>
            <p onClick = {()=> handleClick(el.uuid)}>
                <MdDeleteForever />
            </p>
        </div>
        )}
    </div>
  );
}
