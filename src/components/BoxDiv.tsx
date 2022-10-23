import { ReactNode } from "react"

interface BoxDivProps{
  children: ReactNode
  className?: string
}

function BoxDiv({ children, className }: BoxDivProps) {
  return (
    <div className={"bg-gray-800 px-6 py-4 rounded " + className}>
      {children}
    </div>
  )
}

export default BoxDiv