import { ReactNode } from "react";
import { GeneralFunctions } from "../functions/generalFunctions";
import BoxDiv from "./BoxDiv";
import { Button } from "./Button";
import ModelBackground from "./ModelBackground";
import {Text} from "./Text"

interface DeleteCardProps{
    idItem: string
    nameItem: string
    collectionItem: string
    refresh: () => void
    changeDeleteCard: () => void
    changeViewAlertCard: (children:ReactNode, hasButton:boolean) => void
}

export function DeleteCard({ idItem, nameItem, collectionItem, changeDeleteCard, changeViewAlertCard, refresh }: DeleteCardProps) {
  
  const deleteItem = async () => {

    await GeneralFunctions.deleteItem(collectionItem, idItem);

    refresh()
    changeDeleteCard()
    changeViewAlertCard("Item deletado com sucesso!", true)
  }

  return(
    <ModelBackground>
      <BoxDiv className="w-96">
        <h2 className="font-bold text-xl mx-auto text-center mb-4">AVISO</h2>
        <Text className="text-center">Você realmente deseja deletar "{nameItem}"?</Text>
        <div className="flex gap-2 w-full justify-between mt-4">
            <Button onClick={deleteItem}>
                Sim
            </Button>
            <Button onClick={changeDeleteCard}>
                Não
            </Button>
        </div>
      </BoxDiv>
    </ModelBackground>
  )
}