import { Slot } from "@radix-ui/react-slot"
import { Trash } from "phosphor-react"
import { INotification } from "../interfaces/INotification"
import { Text } from "./Text"

interface NotificationDivProps{
  notification: INotification
}

function NotificationDiv({ notification }: NotificationDivProps) {
  return (
    <div className="flex items-center justify-between gap-3 bg-gray-700 p-2 rounded">
      <Text>{notification.text}</Text>
      <Slot className="w-6 h-6 cursor-pointer">
        <Trash/>
      </Slot>
    </div>
  )
}

export default NotificationDiv