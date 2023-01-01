import { IEquipment } from "../interfaces/IEquipment";
import { Button } from "./Button";
import { Table } from "./Table";
import { Eye, Trash } from "phosphor-react"
import { Slot } from "@radix-ui/react-slot";
import { useEffect, useState } from "react";
import { Equipments } from "../functions/equipmentsFunctions";
import { applyPagination, getAvaliablePages } from "../utils/helpers/pagination";
import { PaginationDiv } from "./PaginationDiv";
import { ISearchParametersEquipments } from "../interfaces/ISearchParameters";
import { Loading } from "./Loading";

interface EquipmentsTableProps{
  toEditEquipments: (EquipmentsInfos: IEquipment) => void
  toDeleteEquipments: (id: string, name: string, collection: string) => void
  searchParameters: ISearchParametersEquipments
  refresh: boolean
}

export function EquipmentsTable({toEditEquipments, toDeleteEquipments, searchParameters, refresh}: EquipmentsTableProps) {

  const [allEquipments, setAllEquipments] = useState<IEquipment[]>([])
  const [isLoading, setIsLoading] = useState(true)
 
  const [currentPage, setCurrentPage] = useState(1)

  const filteredEquipments = Equipments.applyFilters(allEquipments, searchParameters)
  const allPages = getAvaliablePages(filteredEquipments)
  const paginatedEquipments = applyPagination(filteredEquipments, currentPage)

  const getAllEquipments = async () => {
    setIsLoading(true)
    
    let newAllEquipments = await Equipments.getAll()

    setAllEquipments(newAllEquipments)
    setIsLoading(false)
  }

  useEffect(() => {
    getAllEquipments()
  }, [refresh])

  return (
    <>
      {isLoading ? <Loading /> :
         <>
            <Table.content className="mt-8">
              <Table.thead>
                <Table.tr>
                  <Table.th>Aplicação</Table.th>
                  <Table.th>Marca</Table.th>
                  <Table.th>Modelo</Table.th>
                  <Table.th>Tipo</Table.th>
                  <Table.th>Qtd</Table.th>
                </Table.tr>
              </Table.thead>
              <Table.tbody>
                {
                  paginatedEquipments.map(Equipments => {
                    return (
                      <Table.tr key={Equipments.id}>
                        <Table.td>{Equipments.application}</Table.td>
                        <Table.td>{Equipments.brand}</Table.td>
                        <Table.td>{Equipments.model}</Table.td>
                        <Table.td>{Equipments.type}</Table.td>
                        <Table.td>{Equipments.qtd}</Table.td>
                        <Table.td className="flex gap-4">
                          <Button 
                            className="flex items-center justify-center px-0" 
                            onClick={() => {
                              toEditEquipments(Equipments)
                            }}
                          >
                            <Slot className='w-5 h-5 text-white'><Eye /></Slot>
                          </Button>
                          <Button
                            className="flex items-center justify-center px-0"
                            onClick={() => {
                              toDeleteEquipments(Equipments.id, Equipments.model, "partsAndEquipments")
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