import { IComponent } from "../interfaces/IComponents";
import { Button } from "./Button";
import { Table } from "./Table";
import { Eye, Trash } from "phosphor-react"
import { Slot } from "@radix-ui/react-slot";
import { useEffect, useState } from "react";
import { Component } from "../functions/componentsFunctions";
import { getAvaliablePages } from "../utils/helpers/pagination";
import { PaginationDiv } from "./PaginationDiv";
import { ISearchParametersComponent } from "../interfaces/ISearchParameters";
import { Loading } from "./Loading";

interface ComponentsTableProps{
  toEditComponent: (componentInfos: IComponent) => void
  toDeleteComponent: (id: string, name: string, collection: string) => void
  searchParameters: ISearchParametersComponent
  refresh: boolean
}

export function ComponentsTable({toEditComponent, toDeleteComponent, searchParameters, refresh}: ComponentsTableProps) {

  const [allComponents, setAllComponents] = useState<IComponent[]>([])
  const [isLoading, setIsLoading] = useState(true)
 
  const [allPages, setAllPages] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const filteredComponents = Component.applyFilters(allComponents, currentPage, searchParameters)

  const getAllComponents = async () => {
    setIsLoading(true)
    
    let newAllComponents = await Component.getAll()

    setAllPages(getAvaliablePages(newAllComponents))
    setAllComponents(newAllComponents)
    setIsLoading(false)
  }

  useEffect(() => {
    getAllComponents()
  }, [refresh])

  return (
    <>
      {isLoading ? <Loading /> :
         <>
            <Table.content className="mt-8">
              <Table.thead>
                <Table.tr>
                  <Table.th>Nome</Table.th>
                  <Table.th>Qtd</Table.th>
                  <Table.th>Local</Table.th>
                  <Table.th>Descrição</Table.th>
                  <Table.th>Data da última atualização</Table.th>
                  <Table.th>Ações</Table.th>
                </Table.tr>
              </Table.thead>
              <Table.tbody>
                {
                  filteredComponents.map(component => {
                    return (
                      <Table.tr key={component.id}>
                        <Table.td>{component.name}</Table.td>
                        <Table.td>{component.qtd}</Table.td>
                        <Table.td>{component.local}</Table.td>
                        <Table.td>{component.description}</Table.td>
                        <Table.td>{component.lastUpdate.toLocaleString()}</Table.td>
                        <Table.td className="flex gap-4">
                          <Button 
                            className="flex items-center justify-center px-0" 
                            onClick={() => {
                              toEditComponent(component)
                            }}
                          >
                            <Slot className='w-5 h-5 text-white'><Eye /></Slot>
                          </Button>
                          <Button
                            className="flex items-center justify-center px-0"
                            onClick={() => {
                              toDeleteComponent(component.id, component.name, "components")
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