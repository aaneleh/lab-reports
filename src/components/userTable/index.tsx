"use client"
import { User } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function UserTable() {

    const [users, setUsers] = useState<[User] | []>([])
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(()=> {
      const getUsers = async():Promise<[User] | []> => {
  
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

  return (
    <div>
        <div className="flex">
            <p> NOME </p>
            <p> ADMIN? </p>
            <p> AÇÕES </p>
        </div>
        { users.map((el, key)=>
        <div key={key} className="flex">
            <p> {el.name} </p>
            <p> {el.admin} </p>
            <p>
                <MdDeleteForever />
            </p>
        </div>
        )}
    </div>
  );
}
