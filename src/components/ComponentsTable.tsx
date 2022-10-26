import { IComponent } from "../interfaces/IComponents";
import { Button } from "./Button";
import { Table } from "./Table";
import { Eye, Trash } from "phosphor-react"
import { Slot } from "@radix-ui/react-slot";

interface IComponentsTable{
  changeComponentsCard: (componentInfos:IComponent) => void
}


export function ComponentsTable({changeComponentsCard}: IComponentsTable) {

  const allComponents: Array<IComponent> = [
    {
      id: "1",
      name: "Amplificador Operacional",
      qtd: 5,
      qtdMin: 2,
      local: "G2",
      description: "LM358SN",
      lastUpdate: "29/01/2022 12:42:33"
    },
    {
      id: "2",
      name: "Amplificador Operacional",
      qtd: 5,
      qtdMin: 2,
      local: "G2",
      description: "LM358SN",
      lastUpdate: "29/01/2022 12:42:33"
    },
    {
      id: "3",
      name: "Amplificador Operacional",
      qtd: 5,
      qtdMin: 2,
      local: "G2",
      description: "LM358SN",
      lastUpdate: "29/01/2022 12:42:33"
    },
    {
      id: "4",
      name: "Amplificador Operacional",
      qtd: 5,
      qtdMin: 2,
      local: "G2",
      description: "LM358SN",
      lastUpdate: "29/01/2022 12:42:33"
    },
    {
      id: "5",
      name: "Amplificador Operacional",
      qtd: 5,
      qtdMin: 2,
      local: "G2",
      description: "LM358SN",
      lastUpdate: "29/01/2022 12:42:33"
    },
  ]

  return (
    <Table.content className="mt-10">
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
          allComponents.map(component => {
            return (
              <Table.tr key={component.id}>
                <Table.td>{component.name}</Table.td>
                <Table.td>{component.qtd}</Table.td>
                <Table.td>{component.local}</Table.td>
                <Table.td>{component.description}</Table.td>
                <Table.td>{component.lastUpdate}</Table.td>
                <Table.td className="flex gap-4">
                  <Button 
                    className="flex items-center justify-center px-0" 
                    onClick={() => {
                      changeComponentsCard(component)
                    }}
                  >
                    <Slot className='w-5 h-5 text-white'><Eye /></Slot>
                  </Button>
                  <Button className="flex items-center justify-center px-0">
                    <Slot className='w-5 h-5 text-white'><Trash /></Slot>
                  </Button>
                </Table.td>
              </Table.tr>
            )
          })
        } 
      </Table.tbody>
    </Table.content>
  )
}