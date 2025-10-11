import Input from "../../../ui/input";
import Button from "../../../ui/button";

import { User } from "@/types/user";
import { createUser } from "./actions";

export default function UserForm() {

  return (
    <form action={
        async(formData) => {
            'use server';
            let formName = formData.get('name');
            let formPassword = formData.get('password');
            let formAdmin = formData.get('admin')=='on'?true:false;

            if(formPassword === formData.get('password_confirmation') &&
            formName != '' && formPassword != '' &&
            typeof formName === "string" && typeof formPassword === "string"
            ) {
                const user : User = {name: formName, password: formPassword, admin: formAdmin};
                const res = await createUser(user);
                //console.log('createUser res=',res)
            } else{
                console.log('form não preenchido corretamente')
            }
        }
    }>
        <h2>Novo usuário</h2>
        <Input label={"Nome"} name={"name"} placeholder={"Nome do usuário"} type={"text"}/>
        <Input label={"Senha"} name={"password"} placeholder={"Senha do usuário"} type={"password"}/>
        <Input label={"Repita a senha"} name={"password_confirmation"} placeholder={"Senha do usuário novamente"} type={"password"}/>
        
        <div className="flex items-center">
            <input type="checkbox" name="admin" className="max-w-8"/>
            <label htmlFor="admin">É administrador?</label>
        </div>
        <Button type="submit">Criar</Button>
    </form>
  );
}
