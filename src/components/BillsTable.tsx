import { IBills } from "../interfaces/IBills";
import { Button } from "./Button";
import { Table } from "./Table";
import { Eye, Trash } from "phosphor-react"
import { Slot } from "@radix-ui/react-slot";
import { useEffect, useState } from "react";
import { Bills } from "../functions/billsFunctions";
import { getAvaliablePages } from "../utils/helpers/pagination";
import { PaginationDiv } from "./PaginationDiv";
import { ISearchParametersBills } from "../interfaces/ISearchParameters";
import { Loading } from "./Loading";

interface BillsTableProps{
  toEditBills: (BillsInfos: IBills) => void
  toDeleteBills: (id: string, name: string, collection: string) => void
  searchParameters: ISearchParametersBills
  refresh: boolean
}

export function BillsTable({toEditBills, toDeleteBills, searchParameters, refresh}: BillsTableProps) {

  const [allBills, setAllBills] = useState<IBills[]>([])
  const [isLoading, setIsLoading] = useState(true)
 
  const [currentPage, setCurrentPage] = useState(1)

  const filteredBills = Bills.applyFilters(allBills, searchParameters)
  const allPages = getAvaliablePages(filteredBills)
  const paginatedBills = Bills.applyPagination(filteredBills, currentPage)

  const getAllBills = async () => {
    setIsLoading(true)
    
    let newAllBills = await Bills.getAll()

    setAllBills(newAllBills)
    setIsLoading(false)
  }

  useEffect(() => {
    getAllBills()
  }, [refresh])

  return (
    <>
      {isLoading ? <Loading /> :
         <>
            <Table.content className="mt-8">
              <Table.thead>
                <Table.tr>
                  <Table.th>Nome</Table.th>
                  <Table.th>Valor (R$)</Table.th>
                  <Table.th>Data de vencimento</Table.th>
                </Table.tr>
              </Table.thead>
              <Table.tbody>
                {
                  paginatedBills.map(Bills => {
                    return (
                      <Table.tr key={Bills.id}>
                        <Table.td>{Bills.name}</Table.td>
                        <Table.td>{Bills.value}</Table.td>
                        <Table.td>{Bills.dueDate.split('-').reverse().join('/')}</Table.td>
                        <Table.td className="flex gap-4">
                          <Button 
                            className="flex items-center justify-center px-0" 
                            onClick={() => {
                              toEditBills(Bills)
                            }}
                          >
                            <Slot className='w-5 h-5 text-white'><Eye /></Slot>
                          </Button>
                          <Button
                            className="flex items-center justify-center px-0"
                            onClick={() => {
                              toDeleteBills(Bills.id, Bills.name, "bills")
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