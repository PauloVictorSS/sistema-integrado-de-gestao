import { ReactNode } from "react"

interface ModelBackgroundProps{
  children: ReactNode
}

function ModelBackground({ children }: ModelBackgroundProps) {
  return (
    <div className="w-screen h-screen bg-black/50 text-gray-100 flex items-center justify-center absolute top-0 left-0 z-10">
      {children}
    </div>
  )
}

export default ModelBackground