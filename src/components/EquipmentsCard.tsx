import { IEquipment } from "../interfaces/IEquipment";
import BoxDiv from "./BoxDiv";
import { Button } from "./Button";
import ModelBackground from "./ModelBackground";
import {Text} from "../components/Text";
import {InputText} from "../components/InputText";
import { TextArea } from "./TextArea";
import { ReactNode, useState } from "react";
import { Equipments } from "../functions/equipmentsFunctions";

interface EquipmentsCardProps{
    isToAdd: boolean
    equipament: IEquipment
    changeEquipmentsCard: () => void
    changeViewAlertCard: (children:ReactNode, hasButton:boolean) => void
    refresh: () => void
}

export function EquipmentsCard({isToAdd, equipament, changeEquipmentsCard, changeViewAlertCard, refresh}: EquipmentsCardProps){

    const [application, setEquipmentsApplication] = useState(equipament.application)
    const [model, setEquipmentsModel] = useState(equipament.model)
    const [qtd, setEquipmentsQtd] = useState(equipament.qtd)
    const [brand, setEquipmentsBrand] = useState(equipament.brand)
    const [type, setEquipmentsType] = useState(equipament.type)

    const saveChanges = async () => {
        const currentEquipament = {
            id: equipament.id,
            application,
            qtd,
            model,
            brand,
            type
        } as IEquipment

        if (isToAdd)
            await Equipments.addNewEquipments(currentEquipament)
        else
            await Equipments.saveEquipments(currentEquipament)

        refresh()

        changeEquipmentsCard()
        changeViewAlertCard("Equipamento " + (isToAdd ? "adicionado" : "alterado") + " com sucesso!", true)
    }

    return(
        <ModelBackground>
            <BoxDiv className="w-96">
                <h2 className="font-bold text-xl max-w-sm mx-auto text-center mb-4">
                    {isToAdd ? "Nova peça/equipamento" : "Alterar peça/equipamento"}
                </h2>
                <div className="flex flex-col gap-6 items-stretch w-full">
                    <label htmlFor="type" className="flex flex-col gap-3">
                        <Text className="font-semibold">Tipo</Text>
                        <InputText
                            className="bg-gray-900"
                            type="text"
                            id="type"
                            placeholder="tipo do equipamento"
                            value={type}
                            onChange={(e) => setEquipmentsType(e.target.value)}
                        />
                    </label>
                    <label htmlFor="qtd" className="flex flex-col gap-3">
                        <Text className="font-semibold">Quantidade</Text>
                        <InputText
                            className="bg-gray-900"
                            type="number"
                            id="qtd"
                            placeholder="quantidade de unidades do equipamento"
                            value={qtd}
                            onChange={(e) => setEquipmentsQtd(parseInt(e.target.value))}
                        />
                    </label>
                    <label htmlFor="model" className="flex flex-col gap-3">
                        <Text className="font-semibold">Modelo</Text>
                        <InputText
                            className="bg-gray-900"
                            type="text"
                            id="model"
                            placeholder="modelo do equipamento"
                            value={model}
                            onChange={(e) => setEquipmentsModel(e.target.value)}
                        />
                    </label>
                    <label htmlFor="brand" className="flex flex-col gap-3">
                        <Text className="font-semibold">Marca</Text>
                        <InputText
                            className="bg-gray-900"
                            type="text"
                            id="brand"
                            placeholder="marca do equipamento"
                            value={brand}
                            onChange={(e) => setEquipmentsBrand(e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col gap-3">
                        <Text className="font-semibold">Aplicação</Text>
                        <TextArea
                            className="bg-gray-900"
                            placeholder="aplicação do equipamento"
                            value={application}
                            onChange={(e) => setEquipmentsApplication(e.target.value)}
                        />
                    </label>
                    <div className="flex gap-2 w-full justify-between">
                        {isToAdd ? 
                            <Button onClick={saveChanges}>
                                Adicionar peça/equipamento
                            </Button>
                            :
                            <Button onClick={saveChanges}>
                                Confirmar alterações
                            </Button>
                        }
                        <Button onClick={changeEquipmentsCard}>
                            Fechar
                        </Button>
                    </div>
                </div>
            </BoxDiv>
        </ModelBackground>
    )
}