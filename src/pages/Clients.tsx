import {Text} from "../components/Text"
import { Button } from "../components/Button";
import ContentDiv from "../components/ContentDiv";
import NavBar from "../components/NavBar";
import { PlusCircle, PuzzlePiece } from "phosphor-react"
import { Slot } from "@radix-ui/react-slot";
import { InputText } from "../components/InputText";
import { InputSelect } from "../components/InputSelect";
import { ClientsTable } from "../components/ClientsTable";
import { ReactNode, useState } from "react";
import { ClientsCard } from "../components/ClientsCard";
import { IClient } from "../interfaces/IClient";
import { defaultClient } from "../utils/constants/defaultClient";
import { DeleteCard } from "../components/DeleteCard";
import { AlertCard } from "../components/AlertCard";
import { clientSorterOptions } from "../interfaces/ISearchParameters";
import logo from "../images/logo.png"

function Clients() {

  const [alertCardChildren, setAlertCardChildren] = useState<ReactNode>("")
  const [alertCardHasButton, setAlertCardHasButton] = useState(true)
  const [isAddClient, setIsAddClient] = useState(false)

  const [seeAlertCard, setSeeAlertCard] = useState(false)
  const [seeDeleteCard, setSeeDeleteCard] = useState(false)
  const [seeClientsCard, setSeeClientsCard] = useState(false)

  const [searchClient, setSearchClient] = useState("")
  const [approvedBudgetClient, setApprovedBudgetClient] = useState("")
  const [orderByClient, setOrderByClient] = useState<clientSorterOptions>("id")

  const [idClientToDelete, setIdClientToDelete] = useState("")
  const [nameClientToDelete, setNameClientToDelete] = useState("")
  const [collectionClientToDelete, setCollectionClientToDelete] = useState("")

  const [refresh, setRefresh] = useState(true)

  const [clientInfos, setClientInfos] = useState<IClient>(defaultClient)

  const toAddClientCard = () => {
    setIsAddClient(true)
    setClientInfos(defaultClient)
    setSeeClientsCard(!seeClientsCard)
  }

  const toEditClientCard = (component:IClient) => {
    setIsAddClient(false)
    setClientInfos(component)
    setSeeClientsCard(!seeClientsCard)
  }

  const changeViewAlertCard = (children: ReactNode, hasButton:boolean) => {
    setAlertCardChildren(children)
    setAlertCardHasButton(hasButton)
    setSeeAlertCard(!seeAlertCard)
  }

  const changeViewDeleteCard = (id: string, name: string, collection: string) => {
    setIdClientToDelete(id)
    setNameClientToDelete(name)
    setCollectionClientToDelete(collection)
    setSeeDeleteCard(!seeDeleteCard)
  }

  return (
    <ContentDiv>
      <NavBar active="Clientes" />

      <div className="w-full px-10">
        <div className="flex items-center justify-center mt-4">
          <img src={logo} alt="" className="w-24"/>
          <h2 className="font-bold text-2xl max-w-sm text-center">Gerenciamento de clientes</h2>
        </div>

        <div className="flex items-center justify-end">
          <Button className="flex items-center gap-4 w-40 mt-4" onClick={toAddClientCard}>
            <Slot className="w-8 h-8 text-white">
              <PlusCircle/>
            </Slot>
            <p className=" text-xs text-white">Novo cliente</p>
          </Button>
        </div>

        <div className="flex items-center gap-8 w-full mt-4">
          <label htmlFor="search" className="flex flex-col gap-3 w-[530px]">
            <Text className="font-semibold">Pesquisa</Text>
            <InputText className="bg-gray-800 w-[530px] max-w-none" icon={<PuzzlePiece />} type="text" id="search" placeholder="Digite o nome do cliente ou alguma caracter??stica de seu equipamento" value={searchClient} onChange={(e) => {setSearchClient(e.target.value)}}/>
          </label>
          <label htmlFor="approval" className="flex flex-col gap-3">
            <Text className="font-semibold">Or??amento aprovado</Text>
            <InputSelect className="bg-gray-800" id="approval" value={approvedBudgetClient} onChange={(e) => {setApprovedBudgetClient(e.target.value)}}>
              <option value=""></option>
              <option value="Pendente">Pendente</option>
              <option value="Sim">Sim</option>
              <option value="N??o">N??o</option>
            </InputSelect>
          </label>
          <label htmlFor="order" className="flex flex-col gap-3">
            <Text className="font-semibold">Ordenar por</Text>
            <InputSelect className="bg-gray-800" id="order" value={orderByClient} onChange={(e) => {setOrderByClient(e.target.value as clientSorterOptions)}}>
              <option value="name">Nome</option>
              <option value="id">Identificador</option>
            </InputSelect>
          </label>
        </div>

        <ClientsTable
          toEditClient={toEditClientCard}
          toDeleteClient={changeViewDeleteCard}
          searchParameters={{
            search: searchClient.toLocaleLowerCase(),
            approval: approvedBudgetClient.toLocaleLowerCase(),
            orderBy: orderByClient
          }}
          refresh={refresh}
        />
      </div>

      {seeAlertCard &&
        <AlertCard hasButton={alertCardHasButton} changeAlertCard={() => { setSeeAlertCard(!seeAlertCard) }}>
          {alertCardChildren}
        </AlertCard>
      }

      {seeClientsCard &&
        <ClientsCard 
          isToAdd={isAddClient}
          client={clientInfos} 
          changeClientsCard={() => { setSeeClientsCard(!seeClientsCard) }}
          changeViewAlertCard={changeViewAlertCard}
          refresh={() => {setRefresh(!refresh)}}
        />
      }

      {seeDeleteCard &&
        <DeleteCard 
          idItem={idClientToDelete}
          nameItem={nameClientToDelete}
          collectionItem={collectionClientToDelete}
          changeDeleteCard={() => {setSeeDeleteCard(!seeDeleteCard)}}
          changeViewAlertCard={changeViewAlertCard}
          refresh={() => {setRefresh(!refresh)}}
        />
      }
    </ContentDiv>
  )
}

export default Clients