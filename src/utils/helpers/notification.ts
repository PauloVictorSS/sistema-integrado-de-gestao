import { IBill } from "../../interfaces/IBill"
import { IComponent } from "../../interfaces/IComponent"
import { INotification } from "../../interfaces/INotification"

export const makeNotificationsForBills = (allBills:Array<IBill>) => {

  let allBillsNotifications:Array<INotification> = []
  let todayDate = new Date()
  todayDate.setDate(todayDate.getDate() - 1)

  allBills.filter((bill) => {
    let billDueDate = new Date(bill.dueDate)
    billDueDate.setDate(billDueDate.getDate() + 1)
    
    let timeDiff = Math.abs(todayDate.getTime() - billDueDate.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    if (diffDays <= 5 && (billDueDate > todayDate))
      allBillsNotifications.push({
        id: bill.id,
        text: bill.name + " vence na data " + bill.dueDate.split('-').reverse().join('/')
      })
  })

  return allBillsNotifications
}

export const makeNotificationsForComponents = (allComponents:Array<IComponent>) => {

  let allComponentsNotifications:Array<INotification> = []

  allComponents.filter((component) => {

    if (component.qtdMin > 0 && component.qtdMin > component.qtd)
      allComponentsNotifications.push({
        id: component.id,
        text: component.name + " está com uma qtd " + component.qtd + " sendo que o mínimo é " + component.qtdMin
      })
  })

  return allComponentsNotifications
}