import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode;
}

export function Button({children, ...props}: ButtonProps) {

  return (
    <button
      className='py-2 px-2 bg-cyan-500 rounded font-semibold text-black text-sm w-full max-w-sm transition-colors hover:bg-cyan-300 focus:ring-2 ring-white'
      {...props}
    >
      {children}
    </button>
  )
}