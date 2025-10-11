'use client'

import { ReactEventHandler } from 'react';
import './style.css';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline",
  type?: string,
  onClick?: ReactEventHandler
}

export default function Button({ onClick, type, variant = 'default', ...props } : ButtonProps) {

  return (
    <button onClick={onClick} role="button" className={`${variant} flex justify-center items-center px-4 py-2 rounded font-semibold transition cursor-pointer select-none`}>
      {props.children}
    </button>
  );
}
