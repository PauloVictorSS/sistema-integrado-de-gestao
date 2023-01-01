import { InputHTMLAttributes } from "react"

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement>{
  className?:string
}

export function TextArea({className, ...props}:TextAreaProps){

  return(
    <textarea 
      className={"resize-none	scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-700 rounded flex-1 text-gray-100 text-xs placeholder:text-gray-400 w-full h-[100px] py-1 px-2 max-w-sm outline-none focus-within:ring-2 ring-cyan-300 " + className} 
      {...props}
    >
    </textarea>
  )
}