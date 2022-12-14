import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode;
  className?: string
}

export function Button({children, className, ...props}: ButtonProps) {

  return (
    <button
      className={'py-2 px-2 bg-cyan-700 rounded font-semibold text-white text-sm w-full max-w-sm transition-colors hover:bg-cyan-500 focus:ring-2 ring-white '+ className}
      {...props}
    >
      {children}
    </button>
  )
}