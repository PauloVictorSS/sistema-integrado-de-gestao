import {Text} from "../components/Text"
import { Button } from "../components/Button";
import ContentDiv from "../components/ContentDiv";
import NavBar from "../components/NavBar";
import { PlusCircle, PuzzlePiece, ShoppingBag } from "phosphor-react"
import { Slot } from "@radix-ui/react-slot";
import { InputText } from "../components/InputText";
import { PartsAndEquipamentsTable } from "../components/PartsAndEquipamentsTable";
import { ReactNode, useState } from "react";
import { ComponentsCard } from "../components/ComponentsCard";
import { IPartsAndEquipaments } from "../interfaces/IPartsAndEquipaments";
import { defaultPartAndComponent } from "../utils/constants/DefaultPartAndComponent";
import { DeleteCard } from "../components/DeleteCard";
import { AlertCard } from "../components/AlertCard";

function PartsAndEquipaments() {

  const [alertCardChildren, setAlertCardChildren] = useState<ReactNode>("")
  const [alertCardHasButton, setAlertCardHasButton] = useState(true)
  const [isAddPartAndEquipament, setIsAddPartAndEquipament] = useState(false)

  const [seeAlertCard, setSeeAlertCard] = useState(false)
  const [seeDeleteCard, setSeeDeleteCard] = useState(false)
  const [seePartsAndEquipamentsCard, setSeePartsAndEquipamentsCard] = useState(false)

  const [searchPartAndEquipament, setSearchPartsAndEquipaments] = useState("")

  const [idToDelete, setIdToDelete] = useState("")
  const [nameToDelete, setNameToDelete] = useState("")
  const [collectionToDelete, setCollectionToDelete] = useState("")

  const [refresh, setRefresh] = useState(true)

  const [PartAndEquipamentInfos, setPartsAndEquipamentsInfos] = useState<IPartsAndEquipaments>(defaultPartAndComponent)

  const toAddPartsAndEquipamentsCard = () => {
    setIsAddPartAndEquipament(true)
    setPartsAndEquipamentsInfos(defaultPartAndComponent)
    setSeePartsAndEquipamentsCard(!seePartsAndEquipamentsCard)
  }

  const toEditPartsAndEquipaments = (component:IPartsAndEquipaments) => {
    setIsAddPartAndEquipament(false)
    setPartsAndEquipamentsInfos(component)
    setSeePartsAndEquipamentsCard(!seePartsAndEquipamentsCard)
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
      <NavBar active="Componentes" />

      <div className="w-full px-10">
        <h2 className="font-bold text-2xl max-w-sm mx-auto text-center">Gerenciamento de Componentes</h2>

        <Button className="flex items-center gap-4 w-48 mt-4" onClick={toAddPartsAndEquipamentsCard}>
          <Slot className="w-8 h-8 text-white">
            <PlusCircle/>
          </Slot>
          <p className=" font-sans text-xs text-white">Novo componente</p>
        </Button>

        <div className="flex items-center gap-8 w-full mt-4">
          <label htmlFor="search" className="flex flex-col gap-3">
            <Text className="font-semibold">Pesquisa</Text>
            <InputText className="w-96" icon={<PuzzlePiece />} type="text" id="search" placeholder="Digite um nome ou descrição de algum componente" value={searchPartAndEquipament} onChange={(e) => {setSearchPartsAndEquipaments(e.target.value)}}/>
          </label>
        </div>

        <PartsAndEquipamentsTable
          toEditPartsAndEquipaments={toEditPartsAndEquipaments}
          toDeletePartsAndEquipaments={changeViewDeleteCard}
          searchParameters={{
            search: searchPartAndEquipament.toLocaleLowerCase()
          }}
          refresh={refresh}
        />
      </div>

      {seeAlertCard &&
        <AlertCard hasButton={alertCardHasButton} changeAlertCard={() => { setSeeAlertCard(!seeAlertCard) }}>
          {alertCardChildren}
        </AlertCard>
      }

      {seePartsAndEquipamentsCard &&
        <ComponentsCard 
          isToAdd={isAddPartAndEquipament}
          partsAndEquipaments={PartAndEquipamentInfos} 
          changeComponentsCard={() => { setSeePartsAndEquipamentsCard(!seePartsAndEquipamentsCard) }}
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

export default PartsAndEquipaments