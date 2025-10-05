import Button from "@/components/button";
import Input from "@/components/input";
import { login } from "@/lib/actions";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

export default function Login() {

  return (
    <div className="main-content">
      <h2>Login</h2>
      <form
        action={async (formData) => {
          'use server';
          let formName = formData.get('usuario');
          let formPassword = formData.get('senha');

          if(formData.get('usuario') != null && formData.get('senha') != null &&
            typeof formName === "string" && typeof formPassword === "string"
          ){
            const user : User = {name: formName, password: formPassword};
            await login(user);
            redirect('/');
          }
        }}>
          <Input label={"Usuário"} name={"usuario"} placeholder={"Seu nome de usuário"} type={"text"}/>
          <Input label={"Senha"} name={"senha"} placeholder={"Sua senha"} type={"password"}/>
      <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
}
