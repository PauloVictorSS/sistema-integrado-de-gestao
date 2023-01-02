import BoxDiv from "../components/BoxDiv";
import ContentDiv from "../components/ContentDiv";
import NavBar from "../components/NavBar";
import {Text} from "../components/Text";
import {InputText} from "../components/InputText";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Client } from "../functions/clientsFunctions";
import { IClient } from "../interfaces/IClient";
import { GraphsData, IRepairsInPeriod } from "../functions/graphicsDataFunctions";
import { Table } from "../components/Table";
import { Loading } from "../components/Loading";

function GraphsDatas() {

  const [firstDate, setFirstDate] = useState("")
  const [lastDate, setLastDate] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const [allClients, setAllClients] = useState<IClient[]>([])
  const [repairsInPeriod, setRepairsInPeriod] = useState<IRepairsInPeriod[]>([])
  const [totalBudgetComponent, setTotalBudgetComponent] = useState<number>(0)
  const [totalBudgetLabel, setTotalBudgetLabel] = useState<number>(0)

  const recoverProfitInPeriod = async () => {
    
    setIsLoading(true)
    const repairsInPeriod = GraphsData.calculateProfitInPeriod(allClients, firstDate, lastDate)

    let totalBudgetComponent:number = 0
    let totalBudgetLabel:number = 0

    for (let i = 0; i < repairsInPeriod.length; i++) {
      const repair = repairsInPeriod[i]

      totalBudgetComponent += repair.budgetComponent
      totalBudgetLabel += repair.budgetLabel
    }

    setTotalBudgetLabel(totalBudgetLabel)
    setTotalBudgetComponent(totalBudgetComponent)
    setRepairsInPeriod(repairsInPeriod)
    setIsLoading(false)
  }

  const getAllClients = async () => {
    let newAllClients = await Client.getAll()
    setAllClients(newAllClients)
  }

  useEffect(() => {
    getAllClients()
  }, [])

  return (
    <ContentDiv>
      <NavBar active="Dados" />
      <div className="w-full">
        <h2 className="font-bold text-2xl max-w-sm mx-auto text-center">Consulta de dados</h2>
        <BoxDiv className="w-[600px] mx-auto mt-10">
          <h2 className="font-bold text-md max-w-sm mx-auto text-center">Lucro em um determinado período</h2>
          <div className="flex items-end justify-between mt-4">
            <label htmlFor="firstDate" className="flex flex-col gap-1 w-44">
                <Text className="font-semibold">Data de entrada</Text>
                <InputText
                    className="bg-gray-900"
                    type="date"
                    id="firstDate"
                    value={firstDate}
                    onChange={(e) => setFirstDate(e.target.value)}
                />
            </label>
            <label htmlFor="lastDate" className="flex flex-col gap-1 w-44">
                <Text className="font-semibold">Data de saída</Text>
                <InputText
                    className="bg-gray-900"
                    type="date"
                    id="lastDate"
                    value={lastDate}
                    onChange={(e) => setLastDate(e.target.value)}
                />
            </label>
            <Button onClick={recoverProfitInPeriod} className="w-24">
              Pesquisar
            </Button>
          </div>
          {isLoading ? <Loading /> :
            <>
              <Table.content className="mt-8">
                <Table.thead>
                  <Table.tr>
                    <Table.th>Equipamento</Table.th>
                    <Table.th>Modelo</Table.th>
                    <Table.th>Custo total</Table.th>
                  </Table.tr>
                </Table.thead>
                <Table.tbody>
                  {
                    repairsInPeriod.map((repair, index) => {
                      if(repair.budgetComponent + repair.budgetLabel !== 0)
                        return (
                          <Table.tr key={index}>
                            <Table.td>{repair.equipment}</Table.td>
                            <Table.td>{repair.model}</Table.td>
                            <Table.td>{repair.budgetComponent + repair.budgetLabel}</Table.td>
                          </Table.tr>
                        )
                    })
                  }
                </Table.tbody>
              </Table.content>
            </>
          }
          <div className="mt-7">
            <Text>Custo em mão-de-obra: R$ {totalBudgetLabel}</Text>
            <Text>Custo em componentes: R$ {totalBudgetComponent}</Text>
            <Text>Total de orçamento aprovado nesse período: R$ {totalBudgetLabel + totalBudgetComponent}</Text>
          </div>
        </BoxDiv>
      </div>
    </ContentDiv>
  )
}

export default GraphsDatas