import { IClient } from "../interfaces/IClients";
import { Button } from "./Button";
import { Table } from "./Table";
import { Eye, Trash } from "phosphor-react"
import { Slot } from "@radix-ui/react-slot";
import { useEffect, useState } from "react";
import { Client } from "../functions/clientsFunctions";
import { getAvaliablePages } from "../utils/helpers/pagination";
import { PaginationDiv } from "./PaginationDiv";
import { ISearchParametersClients } from "../interfaces/ISearchParameters";
import { Loading } from "./Loading";
import { getStringValue } from "../utils/helpers/verifications";

interface ClientsTableProps{
  toEditClient: (clientInfos: IClient) => void
  toDeleteClient: (id: string, name: string, collection: string) => void
  searchParameters: ISearchParametersClients
  refresh: boolean
}

export function ClientsTable({toEditClient, toDeleteClient, searchParameters, refresh}: ClientsTableProps) {

  const [allClients, setAllClients] = useState<IClient[]>([])
  const [isLoading, setIsLoading] = useState(true)
 
  const [currentPage, setCurrentPage] = useState(1)

  const filteredClients = Client.applyFilters(allClients, searchParameters)
  const allPages = getAvaliablePages(filteredClients)
  const paginatedClients = Client.applyPagination(filteredClients, currentPage)

  const getAllClients = async () => {
    setIsLoading(true)
    
    let newAllClients = await Client.getAll()

    setAllClients(newAllClients)
    setIsLoading(false)
  }

  useEffect(() => {
    getAllClients()
  }, [refresh])

  return (
    <>
      {isLoading ? <Loading /> :
         <>
            <Table.content className="mt-8">
              <Table.thead>
                <Table.tr>
                  <Table.th>ID</Table.th>
                  <Table.th>Nome</Table.th>
                  <Table.th>Entrada</Table.th>
                  <Table.th>Equipamento - marca - modelo</Table.th>
                  <Table.th>Orçamento aprovado - Entregue</Table.th>
                  <Table.th>Ações</Table.th>
                </Table.tr>
              </Table.thead>
              <Table.tbody>
                {
                  paginatedClients.map(client => {
                    return (
                      <Table.tr key={client.id}>
                        <Table.td>{client.id}</Table.td>
                        <Table.td>{client.name}</Table.td>
                        <Table.td>{getStringValue(client.firstDate).split('-').reverse().join('/')}</Table.td>
                        <Table.td>{getStringValue(client.equipment)} - {getStringValue(client.brand)} - {getStringValue(client.model)}</Table.td>
                        <Table.td>{getStringValue(client.approval)} - {getStringValue(client.done)}</Table.td>
                        <Table.td className="flex gap-4">
                          <Button 
                            className="flex items-center justify-center px-0" 
                            onClick={() => {
                              toEditClient(client)
                            }}
                          >
                            <Slot className='w-5 h-5 text-white'><Eye /></Slot>
                          </Button>
                          <Button
                            className="flex items-center justify-center px-0"
                            onClick={() => {
                              toDeleteClient(client.id, client.name, "clients")
                            }}
                          >
                            <Slot className='w-5 h-5 text-white'><Trash /></Slot>
                          </Button>
                        </Table.td>
                      </Table.tr>
                    )
                  })
                } 
              </Table.tbody>
            </Table.content>
            <PaginationDiv allPages={allPages} currentPage={currentPage} setCurrentPage={setCurrentPage}></PaginationDiv>
          </>
      }
    </>
  )
}