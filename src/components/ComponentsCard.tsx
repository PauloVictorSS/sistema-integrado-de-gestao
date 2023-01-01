import { IComponent } from "../interfaces/IComponent";
import BoxDiv from "./BoxDiv";
import { Button } from "./Button";
import ModelBackground from "./ModelBackground";
import {Text} from "../components/Text";
import {InputText} from "../components/InputText";
import { TextArea } from "./TextArea";
import { ReactNode, useState } from "react";
import { Component } from "../functions/componentsFunctions";

interface ComponentsCardProps{
    isToAdd: boolean
    component: IComponent
    changeComponentsCard: () => void
    changeViewAlertCard: (children:ReactNode, hasButton:boolean) => void
    refresh: () => void
}

export function ComponentsCard({isToAdd, component, changeComponentsCard, changeViewAlertCard, refresh}: ComponentsCardProps){

    const [componentName, setComponentName] = useState(component.name)
    const [componentQtd, setComponentQtd] = useState(component.qtd)
    const [componentQtdMin, setComponentQtdMin] = useState(component.qtdMin)
    const [componentLocal, setComponentLocal] = useState(component.local)
    const [componentDescription, setComponentDescription] = useState(component.description)

    const saveChanges = async () => {
        const currentComponent = {
            id: component.id,
            name: componentName,
            qtd: componentQtd,
            qtdMin: componentQtdMin,
            local: componentLocal,
            description: componentDescription,
            lastUpdate: new Date(),
        } as IComponent

        if (isToAdd)
            await Component.addNewComponent(currentComponent)
        else
            await Component.saveComponent(currentComponent)

        refresh()

        changeComponentsCard()
        changeViewAlertCard("Componente " + (isToAdd ? "adicionado" : "alterado") + " com sucesso!", true)
    }

    return(
        <ModelBackground>
            <BoxDiv className="w-96">
                <h2 className="font-bold text-xl max-w-sm mx-auto text-center mb-4">
                    {isToAdd ? "Novo componente" : "Alterar componente"}
                </h2>
                <div className="flex flex-col gap-6 items-stretch w-full">
                    <label htmlFor="name" className="flex flex-col gap-3">
                        <Text className="font-semibold">Nome</Text>
                        <InputText
                            className="bg-gray-900"
                            type="text"
                            id="name"
                            placeholder="nome do componente"
                            value={componentName}
                            onChange={(e) => setComponentName(e.target.value)}
                        />
                    </label>
                    <label htmlFor="qtd" className="flex flex-col gap-3">
                        <Text className="font-semibold">Quantidade</Text>
                        <InputText
                            className="bg-gray-900"
                            type="number"
                            id="qtd"
                            placeholder="quantidade de unidades do componente"
                            value={componentQtd}
                            onChange={(e) => setComponentQtd(parseInt(e.target.value))}
                        />
                    </label>
                    <label htmlFor="qtdMin" className="flex flex-col gap-3">
                        <Text className="font-semibold">Quantidade mínima</Text>
                        <InputText
                            className="bg-gray-900"
                            type="number"
                            id="qtdMin"
                            placeholder="quantidade mínima para o sistema avisar"
                            value={componentQtdMin}
                            onChange={(e) => setComponentQtdMin(parseInt(e.target.value))}
                        />
                    </label>
                    <label htmlFor="localCard" className="flex flex-col gap-3">
                        <Text className="font-semibold">Local de armazenamento</Text>
                        <InputText
                            className="bg-gray-900"
                            type="text"
                            id="localCard"
                            placeholder="gaveta onde está o componente"
                            value={componentLocal}
                            onChange={(e) => setComponentLocal(e.target.value)}
                        />
                    </label>
                    <label htmlFor="name" className="flex flex-col gap-3">
                        <Text className="font-semibold">Descrição</Text>
                        <TextArea
                            className="bg-gray-900"
                            placeholder="descrição do componente"
                            value={componentDescription}
                            onChange={(e) => setComponentDescription(e.target.value)}
                        />
                    </label>
                    <div className="flex gap-2 w-full justify-between">
                        {isToAdd ? 
                            <Button onClick={saveChanges}>
                                Adicionar componente
                            </Button>
                            :
                            <Button onClick={saveChanges}>
                                Confirmar alterações
                            </Button>
                        }
                        <Button onClick={changeComponentsCard}>
                            Fechar
                        </Button>
                    </div>
                </div>
            </BoxDiv>
        </ModelBackground>
    )
}