import { ReactNode } from "react"

interface ContentDivProps{
  children: ReactNode
}

function ContentDiv({ children }: ContentDivProps) {
  return (
    <div className="w-screen h-screen bg-gray-900 text-gray-100 flex">
      {children}
    </div>
  )
}

export default ContentDiv