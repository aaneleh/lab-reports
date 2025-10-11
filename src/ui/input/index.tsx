'use client'
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function Input(props: { label: string, name: string, placeholder: string, type: "text" | "password" }) {

    switch(props.type){
        case "password":
            const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
        
            return (
              <label htmlFor={props.name} className="relative">
                  <p>{props.label}</p>
                  <input className="login_input" type={passwordVisible ? 'text' : 'password'} name={props.name} id={props.name} placeholder={props.placeholder}/>
                  <span className="absolute top-[38px] right-[6px] select-none hover:bg-teal-100 p-2 rounded" aria-hidden="true" onClick={() => setPasswordVisible(!passwordVisible)}> 
                  {passwordVisible ? 
                      <FaEyeSlash/> :
                      <FaEye/>
                  }
                  </span>
              </label>
            );
        case "text":
            return (
              <label htmlFor={props.name} className="relative">
                  <p>{props.label}</p>
                  <input className="login_input" type='text' name={props.name} id={props.name} placeholder={props.placeholder}/>
              </label>
            );
    }

}
