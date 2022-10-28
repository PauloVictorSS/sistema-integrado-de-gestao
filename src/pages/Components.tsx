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
import { IComponent } from "../interfaces/IComponents";
import { DefaultComponent } from "../utils/constants/DefaultComponent";
import { DeleteCard } from "../components/DeleteCard";
import { AlertCard } from "../components/AlertCard";

function Components() {

  const [alertCardChildren, setAlertCardChildren] = useState<ReactNode>("")
  const [alertCardHasButton, setAlertCardHasButton] = useState(true)
  const [isAddComponent, setIsAddComponent] = useState(false)

  const [seeAlertCard, setSeeAlertCard] = useState(false)
  const [seeDeleteCard, setSeeDeleteCard] = useState(false)
  const [seeComponentsCard, setSeeComponentsCard] = useState(false)

  const [idComponentToDelete, setIdComponentToDelete] = useState("")
  const [nameComponentToDelete, setNameComponentToDelete] = useState("")
  const [collectionComponentToDelete, setCollectionComponentToDelete] = useState("")

  const [componentInfos, setComponentInfos] = useState<IComponent>(DefaultComponent)

  const toAddComponentCard = () => {
    setIsAddComponent(true)
    setComponentInfos(DefaultComponent)
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
        <h2 className="font-bold text-2xl max-w-sm mx-auto text-center">Gerenciamento de Componentes</h2>

        <Button className="flex items-center gap-4 w-48 mt-8" onClick={toAddComponentCard}>
          <Slot className="w-8 h-8 text-white">
            <PlusCircle/>
          </Slot>
          <p className=" font-sans text-xs text-white">Novo componente</p>
        </Button>

        <div className="flex items-center gap-8 w-full mt-8">
          <label htmlFor="text" className="flex flex-col gap-3">
            <Text className="font-semibold">Pesquisa</Text>
            <InputText className="w-96" icon={<PuzzlePiece/>} type="text" id="text" placeholder="Digite um nome ou descrição de algum componente" />
          </label>
          <label htmlFor="local" className="flex flex-col gap-3">
            <Text className="font-semibold">Gaveta</Text>
            <InputText className="w-64" icon={<ShoppingBag/>} type="text" id="local" placeholder="Digite G + “número da gaveta”" />
          </label>
          <label htmlFor="local" className="flex flex-col gap-3">
            <Text className="font-semibold">Ordenar por</Text>
            <InputSelect>
              <option value="">Nome</option>
              <option value="">Data de Última alteração</option>
            </InputSelect>
          </label>
        </div>

        <ComponentsTable toEditComponent={toEditComponentCard} toDeleteComponent={changeViewDeleteCard}/>
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
        />
      }

      {seeDeleteCard &&
        <DeleteCard 
          idItem={idComponentToDelete}
          nameItem={nameComponentToDelete}
          collectionItem={collectionComponentToDelete}
          changeDeleteCard={() => {setSeeDeleteCard(!seeDeleteCard)}}
          changeViewAlertCard={changeViewAlertCard}
        />
      }
    </ContentDiv>
  )
}

export default Components