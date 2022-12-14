import {Text} from "../components/Text"
import { Button } from "../components/Button";
import ContentDiv from "../components/ContentDiv";
import NavBar from "../components/NavBar";
import { PlusCircle, PuzzlePiece, ShoppingBag } from "phosphor-react"
import { Slot } from "@radix-ui/react-slot";
import { InputText } from "../components/InputText";
import { InputSelect } from "../components/InputSelect";
import { ComponentsTable } from "../components/ComponentsTable";
import { ReactNode, useState } from "react";
import { ComponentsCard } from "../components/ComponentsCard";
import { IComponent } from "../interfaces/IComponent";
import { defaultComponent } from "../utils/constants/defaultComponent";
import { DeleteCard } from "../components/DeleteCard";
import { AlertCard } from "../components/AlertCard";
import { componentSorterOptions } from "../interfaces/ISearchParameters";
import logo from "../images/logo.png"

function Components() {

  const [alertCardChildren, setAlertCardChildren] = useState<ReactNode>("")
  const [alertCardHasButton, setAlertCardHasButton] = useState(true)
  const [isAddComponent, setIsAddComponent] = useState(false)

  const [seeAlertCard, setSeeAlertCard] = useState(false)
  const [seeDeleteCard, setSeeDeleteCard] = useState(false)
  const [seeComponentsCard, setSeeComponentsCard] = useState(false)

  const [searchComponent, setSearchComponent] = useState("")
  const [localComponent, setLocalComponent] = useState("")
  const [orderByComponent, setOrderByComponent] = useState<componentSorterOptions>("name")

  const [idComponentToDelete, setIdComponentToDelete] = useState("")
  const [nameComponentToDelete, setNameComponentToDelete] = useState("")
  const [collectionComponentToDelete, setCollectionComponentToDelete] = useState("")

  const [refresh, setRefresh] = useState(true)

  const [componentInfos, setComponentInfos] = useState<IComponent>(defaultComponent)

  const toAddComponentCard = () => {
    setIsAddComponent(true)
    setComponentInfos(defaultComponent)
    setSeeComponentsCard(!seeComponentsCard)
  }

  const toEditComponentCard = (component:IComponent) => {
    setIsAddComponent(false)
    setComponentInfos(component)
    setSeeComponentsCard(!seeComponentsCard)
  }

  const changeViewAlertCard = (children: ReactNode, hasButton:boolean) => {
    setAlertCardChildren(children)
    setAlertCardHasButton(hasButton)
    setSeeAlertCard(!seeAlertCard)
  }

  const changeViewDeleteCard = (id: string, name: string, collection: string) => {
    setIdComponentToDelete(id)
    setNameComponentToDelete(name)
    setCollectionComponentToDelete(collection)
    setSeeDeleteCard(!seeDeleteCard)
  }
  
  return (
    <ContentDiv>
      <NavBar active="Componentes" />

      <div className="w-full px-10">
        <div className="flex items-center justify-center mt-4">
          <img src={logo} alt="" className="w-24"/>
          <h2 className="font-bold text-2xl max-w-sm text-center">Gerenciamento de componentes</h2>
        </div>

        <div className="flex items-center justify-end">
          <Button className="flex items-center gap-4 w-52 mt-4" onClick={toAddComponentCard}>
            <Slot className="w-8 h-8 text-white">
              <PlusCircle/>
            </Slot>
            <p className=" text-xs text-white">Novo componente</p>
          </Button>
        </div>

        <div className="flex items-center gap-8 w-full mt-4">
          <label htmlFor="search" className="flex flex-col gap-3 w-96">
            <Text className="font-semibold">Pesquisa</Text>
            <InputText className="bg-gray-800 w-96" icon={<PuzzlePiece />} type="text" id="search" placeholder="Digite um nome ou descri????o de algum componente" value={searchComponent} onChange={(e) => {setSearchComponent(e.target.value)}}/>
          </label>
          <label htmlFor="local" className="flex flex-col gap-3">
            <Text className="font-semibold">Gaveta</Text>
            <InputText className="bg-gray-800 w-64" icon={<ShoppingBag/>} type="text" id="local" placeholder="Digite G + ???n??mero da gaveta???" value={localComponent} onChange={(e) => {setLocalComponent(e.target.value)}}/>
          </label>
          <label htmlFor="order" className="flex flex-col gap-3">
            <Text className="font-semibold">Ordenar por</Text>
            <InputSelect className="bg-gray-800" id="order" value={orderByComponent} onChange={(e) => {setOrderByComponent(e.target.value as componentSorterOptions)}}>
              <option value="name">Nome</option>
              <option value="lastUpdate">Data de ??ltima altera????o</option>
            </InputSelect>
          </label>
        </div>

        <ComponentsTable
          toEditComponent={toEditComponentCard}
          toDeleteComponent={changeViewDeleteCard}
          searchParameters={{
            search: searchComponent.toLocaleLowerCase(),
            local: localComponent.toLocaleLowerCase(),
            orderBy: orderByComponent
          }}
          refresh={refresh}
        />
      </div>

      {seeAlertCard &&
        <AlertCard hasButton={alertCardHasButton} changeAlertCard={() => { setSeeAlertCard(!seeAlertCard) }}>
          {alertCardChildren}
        </AlertCard>
      }

      {seeComponentsCard &&
        <ComponentsCard 
          isToAdd={isAddComponent}
          component={componentInfos} 
          changeComponentsCard={() => { setSeeComponentsCard(!seeComponentsCard) }}
          changeViewAlertCard={changeViewAlertCard}
          refresh={() => {setRefresh(!refresh)}}
        />
      }

      {seeDeleteCard &&
        <DeleteCard 
          idItem={idComponentToDelete}
          nameItem={nameComponentToDelete}
          collectionItem={collectionComponentToDelete}
          changeDeleteCard={() => {setSeeDeleteCard(!seeDeleteCard)}}
          changeViewAlertCard={changeViewAlertCard}
          refresh={() => {setRefresh(!refresh)}}
        />
      }
    </ContentDiv>
  )
}

export default Components