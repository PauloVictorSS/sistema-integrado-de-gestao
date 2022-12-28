import {Text} from "../components/Text"
import { Button } from "../components/Button";
import ContentDiv from "../components/ContentDiv";
import NavBar from "../components/NavBar";
import { PlusCircle, PuzzlePiece } from "phosphor-react"
import { Slot } from "@radix-ui/react-slot";
import { InputText } from "../components/InputText";
import { EquipmentsTable } from "../components/EquipmentsTable";
import { ReactNode, useState } from "react";
import { EquipmentsCard } from "../components/EquipmentsCard";
import { IEquipments } from "../interfaces/IEquipments";
import { defaultEquipament } from "../utils/constants/DefaultEquipament";
import { DeleteCard } from "../components/DeleteCard";
import { AlertCard } from "../components/AlertCard";

function Equipments() {

  const [alertCardChildren, setAlertCardChildren] = useState<ReactNode>("")
  const [alertCardHasButton, setAlertCardHasButton] = useState(true)
  const [isAddEquipment, setIsAddEquipment] = useState(false)

  const [seeAlertCard, setSeeAlertCard] = useState(false)
  const [seeDeleteCard, setSeeDeleteCard] = useState(false)
  const [seeEquipmentsCard, setSeeEquipmentsCard] = useState(false)

  const [searchEquipment, setSearchEquipments] = useState("")

  const [idToDelete, setIdToDelete] = useState("")
  const [nameToDelete, setNameToDelete] = useState("")
  const [collectionToDelete, setCollectionToDelete] = useState("")

  const [refresh, setRefresh] = useState(true)

  const [EquipmentInfos, setEquipmentsInfos] = useState<IEquipments>(defaultEquipament)

  const toAddEquipmentsCard = () => {
    setIsAddEquipment(true)
    setEquipmentsInfos(defaultEquipament)
    setSeeEquipmentsCard(!seeEquipmentsCard)
  }

  const toEditEquipments = (component:IEquipments) => {
    setIsAddEquipment(false)
    setEquipmentsInfos(component)
    setSeeEquipmentsCard(!seeEquipmentsCard)
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
      <NavBar active="Peças" />

      <div className="w-full px-10">
        <h2 className="font-bold text-2xl max-w-sm mx-auto text-center">Gerenciamento de Peças e Equipamentos</h2>

        <Button className="flex items-center gap-4 w-56 mt-4" onClick={toAddEquipmentsCard}>
          <Slot className="w-8 h-8 text-white">
            <PlusCircle/>
          </Slot>
          <p className=" font-sans text-xs text-white">Nova peça/equipamento</p>
        </Button>

        <div className="flex items-center gap-8 w-full mt-4">
          <label htmlFor="search" className="flex flex-col gap-3 w-full">
            <Text className="font-semibold">Pesquisa</Text>
            <InputText className="w-96" icon={<PuzzlePiece />} type="text" id="search" placeholder="Digite alguma característica do equipamento ou peça" value={searchEquipment} onChange={(e) => {setSearchEquipments(e.target.value)}}/>
          </label>
        </div>

        <EquipmentsTable
          toEditEquipments={toEditEquipments}
          toDeleteEquipments={changeViewDeleteCard}
          searchParameters={{
            search: searchEquipment.toLocaleLowerCase()
          }}
          refresh={refresh}
        />
      </div>

      {seeAlertCard &&
        <AlertCard hasButton={alertCardHasButton} changeAlertCard={() => { setSeeAlertCard(!seeAlertCard) }}>
          {alertCardChildren}
        </AlertCard>
      }

      {seeEquipmentsCard &&
        <EquipmentsCard 
          isToAdd={isAddEquipment}
          equipament={EquipmentInfos} 
          changeEquipmentsCard={() => { setSeeEquipmentsCard(!seeEquipmentsCard) }}
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

export default Equipments