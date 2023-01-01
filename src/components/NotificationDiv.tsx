import { INotification } from "../interfaces/INotification"
import { Text } from "./Text"

interface NotificationDivProps{
  notification: INotification
}

function NotificationDiv({ notification }: NotificationDivProps) {
  return (
    <div className="flex items-center justify-center gap-3 bg-gray-700 p-2 rounded">
      <Text>{notification.text}</Text>
    </div>
  )
}

export default NotificationDiv