import { IBill } from "../interfaces/IBill";
import BoxDiv from "./BoxDiv";
import { Button } from "./Button";
import ModelBackground from "./ModelBackground";
import {Text} from "../components/Text";
import {InputText} from "../components/InputText";
import { ReactNode, useState } from "react";
import { Bills } from "../functions/billsFunctions";

interface BillsCardProps{
    isToAdd: boolean
    bill: IBill
    changeBillsCard: () => void
    changeViewAlertCard: (children:ReactNode, hasButton:boolean) => void
    refresh: () => void
}

export function BillsCard({isToAdd, bill, changeBillsCard, changeViewAlertCard, refresh}: BillsCardProps){

    const [name, setBillName] = useState(bill.name)
    const [value, setBillValue] = useState(bill.value)
    const [dueDate, setBillDueDate] = useState(bill.dueDate)

    const saveChanges = async () => {
        const currentbill = {
            id: bill.id,
            name,
            value,
            dueDate,
        } as IBill

        if (isToAdd)
            await Bills.addNewBills(currentbill)
        else
            await Bills.saveBills(currentbill)

        refresh()

        changeBillsCard()
        changeViewAlertCard("Conta " + (isToAdd ? "adicionado" : "alterado") + " com sucesso!", true)
    }

    return(
        <ModelBackground>
            <BoxDiv className="bg-white-important w-96">
                <h2 className="font-bold text-xl max-w-sm mx-auto text-center mb-4 text-black-important">
                    {isToAdd ? "Nova conta" : "Alterar conta"}
                </h2>
                <div className="flex flex-col gap-6 items-stretch w-full">
                    <label htmlFor="name" className="flex flex-col gap-3">
                        <Text className="font-semibold text-black-important">Nome</Text>
                        <InputText
                            className="bg-gray-900"
                            type="text"
                            id="name"
                            placeholder="nome da conta"
                            value={name}
                            onChange={(e) => setBillName(e.target.value)}
                        />
                    </label>
                    <label htmlFor="value" className="flex flex-col gap-3">
                        <Text className="font-semibold text-black-important">Valor (R$)</Text>
                        <InputText
                            className="bg-gray-900"
                            type="number"
                            id="value"
                            placeholder="valor da conta"
                            value={value}
                            onChange={(e) => setBillValue(parseInt(e.target.value))}
                        />
                    </label>
                    <label htmlFor="dueDate" className="flex flex-col gap-1 w-64">
                        <Text className="font-semibold text-black-important">Data de vencimento</Text>
                        <InputText
                            className="bg-gray-900"
                            type="date"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setBillDueDate(e.target.value)}
                        />
                    </label>
                    <div className="flex gap-2 w-full justify-between">
                        {isToAdd ? 
                            <Button onClick={saveChanges}>
                                Adicionar conta
                            </Button>
                            :
                            <Button onClick={saveChanges}>
                                Confirmar alterações
                            </Button>
                        }
                        <Button onClick={changeBillsCard}>
                            Fechar
                        </Button>
                    </div>
                </div>
            </BoxDiv>
        </ModelBackground>
    )
}