import { InputHTMLAttributes, ReactNode } from "react";
import { Slot } from '@radix-ui/react-slot';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement>{
  icon?: ReactNode;
  className?: string
}

export function InputText({ icon, className, ...props }: InputTextProps) {
  return (
    <div className={className + ' flex items-center gap-3 h-10 px-2 rounded w-full max-w-sm outline-none focus-within:ring-2 ring-cyan-300'}>
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