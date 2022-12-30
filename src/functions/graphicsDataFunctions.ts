import { IClient } from "../interfaces/IClients"

export interface IRepairsInPeriod {

  equipment: string,
  model: string,
  budgetComponent: number,
  budgetLabel: number
}

const calculateProfitInPeriod = (allClients: Array<IClient>, firstDate: string, lastDate: string) => {
  
  let repairsInPeriod: Array<IRepairsInPeriod> = []

  allClients.map((client) => {
    if (client.firstDate >= firstDate && client.lastDate <= lastDate && client.approval === "Sim") {
      repairsInPeriod.push({
        equipment: client.equipment,
        model: client.model,
        budgetComponent: (client.budgetComponent !== "" ? parseInt(client.budgetComponent) : 0),
        budgetLabel: (client.budgetLabel !== "" ? parseInt(client.budgetLabel) : 0)
      })
    }
  })

  return repairsInPeriod
}

export const GraphsData = { calculateProfitInPeriod }