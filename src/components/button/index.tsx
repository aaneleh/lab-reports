'use client'

import './style.css';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline",
}

export default function Button({ variant, ...props } : ButtonProps) {

  return (
    <button role="button" className={`${variant ? variant : 'default'} flex justify-center items-center px-4 py-2 rounded font-semibold hover:bg-teal-500 transition cursor-pointer select-none`}>
      {props.children}
    </button>
  );
}
