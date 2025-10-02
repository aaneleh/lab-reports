//'use client'
import Button from "@/components/button";
import { login } from "@/lib/actions";
import { redirect } from "next/navigation";
//import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {

  //const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const passwordVisible = true;

  return (
    <div className="main-content">
        <h2>Login</h2>
        <form
          action={async (formData) => {
            'use server';
            await login(formData); //TODO Criar um type para usuário e utilizar em todo lugar q deveria
            redirect('/');
          }}>
            <label htmlFor="usuario"> {/* //TODO Transformar input em um componente genérico para usar o state passwordVisible */}
                <p>Usuário</p>
                <input className="login_input" type="text" name="usuario" placeholder="Seu nome de usuário"/>
            </label>

            <label htmlFor="senha" className="relative">
                <p>Senha</p>
                <input className="login_input" type={passwordVisible ? 'text' : 'password'} name="senha" placeholder="Sua senha"/>
                <span className="absolute top-[38px] right-[6px] select-none hover:bg-teal-100 p-2 rounded" aria-hidden="true" /* onClick={() => setPasswordVisible(!passwordVisible)} */> 
                  {passwordVisible ? 
                    <FaEyeSlash/> :
                    <FaEye/>
                    }
                </span>
            </label>
        <Button type="submit">Entrar</Button>
        </form>
    </div>
  );
}
