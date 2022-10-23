import { InputHTMLAttributes, ReactNode } from "react";
import { Slot } from '@radix-ui/react-slot';

interface InputText extends InputHTMLAttributes<HTMLInputElement>{
  icon?: ReactNode;
  className?: string
}

export function InputText({ icon, className, ...props }: InputText) {
  return (
    <div className={'flex items-center gap-3 h-12 py-2 px-2 rounded bg-gray-800 w-full max-w-sm outline-none focus-within:ring-2 ring-cyan-300 ' + className}>
      <Slot className='w-6 h-6 text-gray-400'>
        {icon}
      </Slot>

      <input
        className="outline-none bg-transparent flex-1 text-gray-100 text-xs placeholder:text-gray-400"
        {...props}
      />
    </div>
  )
}