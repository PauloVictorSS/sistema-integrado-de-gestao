import { Text } from "../components/Text"
import { Button } from "../components/Button";
import ContentDiv from "../components/ContentDiv";
import NavBar from "../components/NavBar";
import { PlusCircle, PuzzlePiece } from "phosphor-react"
import { Slot } from "@radix-ui/react-slot";
import { InputText } from "../components/InputText";
import { BillsTable } from "../components/BillsTable";
import { ReactNode, useState } from "react";
import { BillsCard } from "../components/BillsCard";
import { IBill } from "../interfaces/IBill";
import { defaultBill } from "../utils/constants/defaultBill";
import { DeleteCard } from "../components/DeleteCard";
import { AlertCard } from "../components/AlertCard";
import logo from "../images/logo.png"

function Bills() {

  const [alertCardChildren, setAlertCardChildren] = useState<ReactNode>("")
  const [alertCardHasButton, setAlertCardHasButton] = useState(true)
  const [isAddBill, setIsAddBill] = useState(false)

  const [seeAlertCard, setSeeAlertCard] = useState(false)
  const [seeDeleteCard, setSeeDeleteCard] = useState(false)
  const [seeBillsCard, setSeeBillsCard] = useState(false)

  const [searchBill, setSearchBills] = useState("")
  const [dueDate, setBillDueDate] = useState("")

  const [idToDelete, setIdToDelete] = useState("")
  const [nameToDelete, setNameToDelete] = useState("")
  const [collectionToDelete, setCollectionToDelete] = useState("")

  const [refresh, setRefresh] = useState(true)

  const [BillInfos, setBillsInfos] = useState<IBill>(defaultBill)

  const toAddBillsCard = () => {
    setIsAddBill(true)
    setBillsInfos(defaultBill)
    setSeeBillsCard(!seeBillsCard)
  }

  const toEditBills = (component:IBill) => {
    setIsAddBill(false)
    setBillsInfos(component)
    setSeeBillsCard(!seeBillsCard)
  }

  const changeViewAlertCard = (children: ReactNode, hasButton:boolean) => {
    setAlertCardChildren(children)
    setAlertCardHasButton(hasButton)
    setSeeAlertCard(!seeAlertCard)
  }

  const changeViewDeleteCard = (id: string, name: string, collection: string) => {
    setIdToDelete(id)
    setNameToDelete(name)
    setCollectionToDelete(collection)
    setSeeDeleteCard(!seeDeleteCard)
  }

  return (
    <ContentDiv>
      <NavBar active="Contas" />

      <div className="w-full px-10">
        <div className="flex items-center justify-center mt-4">
          <img src={logo} alt="" className="w-24"/>
          <h2 className="font-bold text-2xl max-w-sm text-center">Gerenciamento de contas a pagar</h2>
        </div>

        <div className="flex items-center justify-end">
          <Button className="flex items-center gap-4 w-40 mt-4" onClick={toAddBillsCard}>
            <Slot className="w-8 h-8 text-white">
              <PlusCircle/>
            </Slot>
            <p className=" text-xs text-white">Nova conta</p>
            </Button>
        </div>

        <div className="flex items-center gap-8 w-full mt-4">
          <label htmlFor="search" className="flex flex-col gap-3 w-60">
            <Text className="font-semibold">Pesquisa</Text>
            <InputText className="bg-gray-800 w-96" icon={<PuzzlePiece />} type="text" id="search" placeholder="Digite o nome da conta" value={searchBill} onChange={(e) => {setSearchBills(e.target.value)}}/>
          </label>
          <label htmlFor="dueDate" className="flex flex-col gap-3 w-64">
                <Text className="font-semibold">Data de vencimento</Text>
                <InputText
                    className="bg-gray-800"
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setBillDueDate(e.target.value)}
                />
            </label>
        </div>

        <BillsTable
          toEditBills={toEditBills}
          toDeleteBills={changeViewDeleteCard}
          searchParameters={{
            search: searchBill.toLocaleLowerCase(),
            dueDate: dueDate
          }}
          refresh={refresh}
        />
      </div>

      {seeAlertCard &&
        <AlertCard hasButton={alertCardHasButton} changeAlertCard={() => { setSeeAlertCard(!seeAlertCard) }}>
          {alertCardChildren}
        </AlertCard>
      }

      {seeBillsCard &&
        <BillsCard 
          isToAdd={isAddBill}
          bill={BillInfos} 
          changeBillsCard={() => { setSeeBillsCard(!seeBillsCard) }}
          changeViewAlertCard={changeViewAlertCard}
          refresh={() => {setRefresh(!refresh)}}
        />
      }

      {seeDeleteCard &&
        <DeleteCard 
          idItem={idToDelete}
          nameItem={nameToDelete}
          collectionItem={collectionToDelete}
          changeDeleteCard={() => {setSeeDeleteCard(!seeDeleteCard)}}
          changeViewAlertCard={changeViewAlertCard}
          refresh={() => {setRefresh(!refresh)}}
        />
      }
    </ContentDiv>
  )
}

export default Bills