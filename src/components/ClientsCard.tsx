import { IClient } from "../interfaces/IClient";
import BoxDiv from "./BoxDiv";
import { Button } from "./Button";
import ModelBackground from "./ModelBackground";
import {Text} from "../components/Text";
import {InputText} from "../components/InputText";
import { TextArea } from "./TextArea";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Client } from "../functions/clientsFunctions";
import { GeneralFunctions } from "../functions/generalFunctions";
import logo from "../images/logo.svg"
import cep from 'cep-promise'
import { setFoneMask } from "../utils/helpers/masks";
import { InputSelect } from "./InputSelect";
import { useReactToPrint } from 'react-to-print';
import { CardToPrint } from "./CardToPrint";

interface ClientsCardProps{
    isToAdd: boolean
    client: IClient
    changeClientsCard: () => void
    changeViewAlertCard: (children:ReactNode, hasButton:boolean) => void
    refresh: () => void
}

export function ClientsCard({isToAdd, client, changeClientsCard, changeViewAlertCard, refresh}: ClientsCardProps){

    const [clientName, setClientName] = useState(client.name)
    const [clientFirstDate, setClientFirstDate] = useState(client.firstDate)
    const [clientLastDate, setClientLastDate] = useState(client.lastDate)
    const [clientAccessories, setClientAccessories] = useState(client.accessories)
    const [clientApproval, setClientApproval] = useState(client.approval)
    const [clientDone, setClientDone] = useState(client.done)
    const [clientBrand, setClientBrand] = useState(client.brand)
    const [clientBudgetComponents, setClientBudgetComponents] = useState(client.budgetComponent)
    const [clientBudgetLabel, setClientBudgetLabel] = useState(client.budgetLabel)
    const [clientChangedEquipaments, setClientChangedEquipaments] = useState(client.changedEquipments)
    const [clientCity, setClientCity] = useState(client.city)
    const [clientDefect, setClientDefect] = useState(client.defect)
    const [clientDistrict, setClientDistrict] = useState(client.district)
    const [clientEquipment, setClientEquipment] = useState(client.equipment)
    const [clientFone, setClientFone] = useState(client.fone)
    const [clientLocal, setClientLocal] = useState(client.local)
    const [clientModel, setClientModel] = useState(client.model)
    const [clientPaid, setClientPaid] = useState(client.paid)
    const [clientTechnicalEvaluationt, setClientTechnicalEvaluationt] = useState(client.technicalEvaluationt)

    const [clientCEP, setClientCEP] = useState(99999999)
    const [serviceNumber, setServiceNumber] = useState("1000")

    const budgetTotal = (clientBudgetLabel !== "" ? parseInt(clientBudgetLabel) : 0) + (clientBudgetComponents !== "" ? parseInt(clientBudgetComponents) : 0)

    const componentRef = useRef(null);
    const generatePDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Test"
    });

    const saveChanges = async () => {
        const currentClient = {
            id: (isToAdd ? serviceNumber : client.id),
            firstDate: clientFirstDate,
            lastDate: clientLastDate,
            name: clientName,
            accessories: clientAccessories,
            approval: clientApproval,
            done: clientDone,
            brand: clientBrand,
            budgetComponent: clientBudgetComponents,
            budgetLabel: clientBudgetLabel,
            changedEquipments: clientChangedEquipaments,
            city: clientCity,
            defect: clientDefect,
            district: clientDistrict,
            equipment: clientEquipment,
            fone: clientFone,
            local: clientLocal,
            model: clientModel,
            paid: clientPaid,
            technicalEvaluationt: clientTechnicalEvaluationt
        } as IClient
        
        await Client.saveClient(currentClient)

        refresh()
        changeClientsCard()
        changeViewAlertCard("Cliente " + (isToAdd ? "adicionado" : "alterado") + " com sucesso!", true)
    }

    const searchCEP = async () => {
        try {
            const result = await cep(clientCEP)

            setClientCity(result.city)
            setClientDistrict(result.neighborhood)
            setClientLocal(result.street)
        } catch (error) {
            changeViewAlertCard("CEP no formato incorreto ou CEP não encontrado", true)
        }
    }

    useEffect(() => {
        const getServiceNumber = async () => {
            let serviceNumber = await GeneralFunctions.getNumberNewServiceOrder()
            setServiceNumber(isToAdd ? serviceNumber : client.id)
        }
        getServiceNumber()
    }, [])

    return (
        <>
        <ModelBackground >
            <BoxDiv className="w-[1000px] h-[675px] scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-700">
                <div className="flex items-center justify-between">
                    <img src={logo} alt="" className="w-52"/>
                    <h2 className="text-xl font-bold">{"Ordem de serviço nº" + serviceNumber}</h2>
                </div>
                <div className="flex flex-col gap-4 items-stretch w-full mt-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="firstDate" className="flex flex-col gap-1 w-64">
                            <Text className="font-semibold">Data de entrada</Text>
                            <InputText
                                className="bg-gray-900"
                                type="date"
                                id="firstDate"
                                value={clientFirstDate}
                                onChange={(e) => setClientFirstDate(e.target.value)}
                            />
                        </label>
                        <label htmlFor="lastDate" className="flex flex-col gap-1 w-64">
                            <Text className="font-semibold">Data de saída</Text>
                            <InputText
                                className="bg-gray-900"
                                type="date"
                                id="lastDate"
                                value={clientLastDate}
                                onChange={(e) => setClientLastDate(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="name" className="flex flex-col gap-1 w-64">
                            <Text className="font-semibold">Nome</Text>
                            <InputText
                                className="bg-gray-900"
                                type="text"
                                id="name"
                                placeholder="nome do cliente"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                            />
                        </label>
                        <label htmlFor="tel" className="flex flex-col gap-1 w-64">
                            <Text className="font-semibold">Telefone</Text>
                            <InputText
                                className="bg-gray-900"
                                type="text"
                                id="tel"
                                placeholder="telefone"
                                value={clientFone}
                                maxLength={15}
                                onChange={(e) => setClientFone(setFoneMask(e.target.value))}
                            />
                        </label>
                        <label htmlFor="cep" className="flex flex-col gap-1 w-64">
                            <Text className="font-semibold">CEP</Text>
                            <div className="flex gap-1">
                                <InputText
                                    className="bg-gray-900"
                                    type="number"
                                    id="cep"
                                    placeholder="CEP"
                                    value={clientCEP}
                                    onChange={(e) => setClientCEP(parseInt(e.target.value))}
                                />
                                <Button className="w-16" onClick={searchCEP}>
                                    Buscar
                                </Button>
                            </div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="city" className="flex flex-col gap-1 w-64">
                            <Text className="font-semibold">Cidade</Text>
                            <InputText
                                className="bg-gray-900"
                                type="text"
                                id="city"
                                placeholder="cidade do cliente"
                                value={clientCity}
                                onChange={(e) => setClientCity(e.target.value)}
                            />
                        </label>
                        <label htmlFor="district" className="flex flex-col gap-1 w-64">
                            <Text className="font-semibold">Bairro</Text>
                            <InputText
                                className="bg-gray-900"
                                type="text"
                                id="district"
                                placeholder="bairro do cliente"
                                value={clientDistrict}
                                onChange={(e) => setClientDistrict(e.target.value)}
                            />
                        </label>
                        <label htmlFor="local" className="flex flex-col gap-1 w-64">
                            <Text className="font-semibold">Endereço</Text>
                            <InputText
                                className="bg-gray-900"
                                type="text"
                                id="local"
                                placeholder="endereço do cliente"
                                value={clientLocal}
                                onChange={(e) => setClientLocal(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="equipment" className="flex flex-col gap-1 w-64">
                            <Text className="font-semibold">Equipamento</Text>
                            <InputText
                                className="bg-gray-900"
                                type="text"
                                id="equipment"
                                placeholder="equipamento do cliente"
                                value={clientEquipment}
                                onChange={(e) => setClientEquipment(e.target.value)}
                            />
                        </label>
                        <label htmlFor="defect" className="flex flex-col gap-1 w-[604px]">
                            <Text className="font-semibold">Defeito</Text>
                            <InputText
                                className="bg-gray-900 max-w-none"
                                type="text"
                                id="defect"
                                placeholder="defeito do equipamento"
                                value={clientDefect}
                                onChange={(e) => setClientDefect(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="brand" className="flex flex-col gap-1 w-64">
                            <Text className="font-semibold">Marca</Text>
                            <InputText
                                className="bg-gray-900"
                                type="text"
                                id="brand"
                                placeholder="marca do cliente"
                                value={clientBrand}
                                onChange={(e) => setClientBrand(e.target.value)}
                            />
                        </label>
                        <label htmlFor="model" className="flex flex-col gap-1 w-64">
                            <Text className="font-semibold">Modelo</Text>
                            <InputText
                                className="bg-gray-900"
                                type="text"
                                id="model"
                                placeholder="modelo do cliente"
                                value={clientModel}
                                onChange={(e) => setClientModel(e.target.value)}
                            />
                        </label>
                        <label htmlFor="accessories" className="flex flex-col gap-1 w-64">
                            <Text className="font-semibold">Acessórios</Text>
                            <InputText
                                className="bg-gray-900"
                                type="text"
                                id="accessories"
                                placeholder="acessórios do equipamento"
                                value={clientAccessories}
                                onChange={(e) => setClientAccessories(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="approval" className="flex flex-col gap-1">
                            <Text className="font-semibold">Orçamento aprovado</Text>
                            <InputSelect className="bg-gray-900 w-64" id="approval" value={clientApproval} onChange={(e) => {setClientApproval(e.target.value)}}>
                                <option value="Pendente">Pendente</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </InputSelect>
                        </label>
                        <label htmlFor="done" className="flex flex-col gap-1">
                            <Text className="font-semibold">Serviço entregue</Text>
                            <InputSelect className="bg-gray-900 w-64" id="done" value={clientDone} onChange={(e) => {setClientDone(e.target.value)}}>
                                <option value="Não">Não</option>
                                <option value="Sim">Sim</option>
                            </InputSelect>
                        </label>
                        <label htmlFor="paid" className="flex flex-col gap-1">
                            <Text className="font-semibold">Serviço pago</Text>
                            <InputSelect className="bg-gray-900 w-64" id="paid" value={clientPaid} onChange={(e) => {setClientPaid(e.target.value)}}>
                                <option value="Não">Não</option>
                                <option value="Sim">Sim</option>
                            </InputSelect>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="budgetLabel" className="flex flex-col gap-1 w-64">
                            <Text className="font-semibold">Custo da mão de obra</Text>
                            <InputText
                                className="bg-gray-900"
                                type="number"
                                id="budgetLabel"
                                placeholder="custo da mão de obra"
                                value={clientBudgetLabel}
                                onChange={(e) => setClientBudgetLabel(e.target.value.toString())}
                            />
                        </label>
                        <label htmlFor="budgetComponents" className="flex flex-col gap-1 w-64">
                            <Text className="font-semibold">Custo dos componentes</Text>
                            <InputText
                                className="bg-gray-900"
                                type="number"
                                id="budgetComponents"
                                placeholder="custo dos componentes"
                                value={clientBudgetComponents}
                                onChange={(e) => setClientBudgetComponents(e.target.value.toString())}
                            />
                        </label>
                        <label htmlFor="budgetTotal" className="flex flex-col gap-1 w-64">
                            <Text className="font-semibold">Custo total</Text>
                            <InputText
                                className="bg-gray-900"
                                type="number"
                                id="budgetTotal"
                                placeholder="custo total"
                                value={budgetTotal}
                                disabled
                            />
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="technicalEvaluationt" className="flex flex-col gap-1 w-64 h-40">
                            <Text className="font-semibold">Avaliação técnica</Text>
                            <TextArea
                                className="h-40 bg-gray-900 w-64"
                                id="technicalEvaluationt"
                                placeholder="avaliação técnica"
                                value={clientTechnicalEvaluationt}
                                onChange={(e) => setClientTechnicalEvaluationt(e.target.value)}
                            >
                            </TextArea>
                        </label>
                        <label htmlFor="changedEquipaments" className="flex flex-col gap-1 w-64 h-40">
                            <Text className="font-semibold">Itens trocados</Text>
                            <TextArea
                                className="h-40 bg-gray-900 w-64"
                                id="changedEquipaments"
                                placeholder="peças/equipamentos trocados"
                                value={clientChangedEquipaments}
                                onChange={(e) => setClientChangedEquipaments(e.target.value)}
                            >
                            </TextArea>
                        </label>
                        <div className="flex flex-col gap-2 justify-between items-center mt-6">
                            {isToAdd ? 
                                <Button onClick={saveChanges} className="w-64">
                                    Adicionar
                                </Button>
                                :
                                <>
                                <Button onClick={saveChanges} className="w-64">
                                    Confirmar alterações
                                </Button>
                                <Button onClick={generatePDF}>
                                    Gerar PDF
                                </Button>
                                </>
                            }
                            <Button onClick={changeClientsCard} className="w-64">
                                Fechar
                            </Button>
                        </div>
                    </div>
                </div>
            </BoxDiv>
            </ModelBackground>
            <div style={{ display: "none" }}>
                <div ref={componentRef}>
                    <CardToPrint isToAdd={isToAdd} client={client} />
                </div>
            </div>
        </>
    )
}