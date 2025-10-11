import { User } from "@/types/user";
import axios from "axios";

export async function createUser(user:User):Promise<boolean> {
    await axios.post(`${process.env.API_URL}/users`, {
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