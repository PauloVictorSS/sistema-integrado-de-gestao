import { InputHTMLAttributes } from "react"

interface ITextArea extends InputHTMLAttributes<HTMLTextAreaElement>{
  className?:string
}

export function TextArea({className, ...props}:ITextArea){

  return(
    <textarea 
      className={"resize-none	scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-700 rounded outline-none flex-1 text-gray-100 text-xs placeholder:text-gray-400 bg-gray-800 w-full h-[100px] p-2 max-w-sm outline-none focus-within:ring-2 ring-cyan-300 " + className} 
      {...props}
    >
    </textarea>
  )
}