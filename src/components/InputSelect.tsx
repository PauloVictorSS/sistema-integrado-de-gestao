import { ReactNode, SelectHTMLAttributes } from "react";

interface InputSelect extends SelectHTMLAttributes<HTMLSelectElement>{
  children: ReactNode;
  className?: string
}

export function InputSelect({ children, className, ...props }: InputSelect) {
  return (
    <select className={"h-12 py-2 px-2 rounded bg-gray-800 w-full max-w-sm text-xs focus-within:ring-2 ring-cyan-300 outline-none text-gray-100" + className} {...props}>
      {children}
    </select>
  )
}