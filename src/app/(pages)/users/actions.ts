import { User } from "@/types/user";
import axios from "axios";

export async function createUser(user:User):Promise<boolean> {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        name: user.name,
        password: user.password,
        admin: user.admin
    }).then((res) => {
        console.log(res)
        return true;
    }).catch((err) => {
        console.log("err",err.status)
    })
    return false;
}

export async function getUsers(): Promise<User[]> {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`).then((res) => {
        console.log(res.data.data);
        return res.data.data;
    }).catch((err) => {
        console.log("err", err.status);
        return [];
    });
}


export async function deleteUser(uuid : string | undefined): Promise<void> {
    if(typeof uuid !== 'undefined'){
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users`, {params: { uuid: uuid}}).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log("err",err.status)
        })
    }
}