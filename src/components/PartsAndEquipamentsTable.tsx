import { IPartsAndEquipaments } from "../interfaces/IPartsAndEquipaments";
import { Button } from "./Button";
import { Table } from "./Table";
import { Eye, Trash } from "phosphor-react"
import { Slot } from "@radix-ui/react-slot";
import { useEffect, useState } from "react";
import { PartsAndEquipaments } from "../functions/partsAndEquipamentsFunctions";
import { getAvaliablePages } from "../utils/helpers/pagination";
import { PaginationDiv } from "./PaginationDiv";
import { ISearchParametersPartsAndEquipaments } from "../interfaces/ISearchParameters";
import { Loading } from "./Loading";

interface PartsAndEquipamentsTableProps{
  toEditPartsAndEquipaments: (PartsAndEquipamentsInfos: IPartsAndEquipaments) => void
  toDeletePartsAndEquipaments: (id: string, name: string, collection: string) => void
  searchParameters: ISearchParametersPartsAndEquipaments
  refresh: boolean
}

export function PartsAndEquipamentsTable({toEditPartsAndEquipaments, toDeletePartsAndEquipaments, searchParameters, refresh}: PartsAndEquipamentsTableProps) {

  const [allPartsAndEquipaments, setAllPartsAndEquipaments] = useState<IPartsAndEquipaments[]>([])
  const [isLoading, setIsLoading] = useState(true)
 
  const [allPages, setAllPages] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPartsAndEquipaments = PartsAndEquipaments.applyFilters(allPartsAndEquipaments, currentPage, searchParameters)

  const getAllPartsAndEquipaments = async () => {
    setIsLoading(true)
    
    let newAllPartsAndEquipaments = await PartsAndEquipaments.getAll()

    setAllPages(getAvaliablePages(newAllPartsAndEquipaments))
    setAllPartsAndEquipaments(newAllPartsAndEquipaments)
    setIsLoading(false)
  }

  useEffect(() => {
    getAllPartsAndEquipaments()
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
                  filteredPartsAndEquipaments.map(partsAndEquipaments => {
                    return (
                      <Table.tr key={partsAndEquipaments.id}>
                        <Table.td>{partsAndEquipaments.qtd}</Table.td>
                        <Table.td>{partsAndEquipaments.application}</Table.td>
                        <Table.td>{partsAndEquipaments.brand}</Table.td>
                        <Table.td>{partsAndEquipaments.model}</Table.td>
                        <Table.td>{partsAndEquipaments.type}</Table.td>
                        <Table.td className="flex gap-4">
                          <Button 
                            className="flex items-center justify-center px-0" 
                            onClick={() => {
                              toEditPartsAndEquipaments(partsAndEquipaments)
                            }}
                          >
                            <Slot className='w-5 h-5 text-white'><Eye /></Slot>
                          </Button>
                          <Button
                            className="flex items-center justify-center px-0"
                            onClick={() => {
                              toDeletePartsAndEquipaments(partsAndEquipaments.id, partsAndEquipaments.model, "partsAndEquipaments")
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