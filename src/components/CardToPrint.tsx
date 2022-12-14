import { IClient } from "../interfaces/IClient";
import BoxDiv from "./BoxDiv";
import {Text} from "../components/Text";
import logo from "../images/logo-branco.png"
import { WhatsappLogo } from "phosphor-react"
import { Slot } from "@radix-ui/react-slot";

interface CardToPrintProps{
  isToAdd: boolean
  client: IClient
}

export function CardToPrint({ isToAdd, client }: CardToPrintProps) {

  return(
    <BoxDiv className="bg-white px-8">
      <div className="flex items-center justify-between bg-cyan-700 rounded p-2 mt-10">
        <img src={logo} alt="" className="w-52" />
        <div>
          <h2 className="text-lg font-bold text-white">{"Ordem de serviço nº" + client.id}</h2>
          <Text className="text-[#fff] text-sm">Certificado de garantia de 3 meses</Text>
        </div>
      </div>
      <div className="flex flex-col gap-3 items-stretch w-full mt-1">
        <div className="flex items-center gap-3">
          <Text className="text-black-important"><b>Data de entrada:</b> {client.firstDate}</Text>
          <Text className="text-black-important"><b>Data de saída:</b> {client.lastDate}</Text>
        </div>
        <div className="flex flex-col gap-3">
          <Text className="text-black-important"><b>Endereço para contato:</b> Rua Vitor Hugo José de Souza, 115, Jd das Laranjeiras - Hortolândia, SP</Text>
          <Text className="text-black-important">
            <b>Telefone para contato:</b> <Slot className='w-5 h-5 text-black-important inline-block'><WhatsappLogo /></Slot> (19) 98340-4010
          </Text>
        </div>
      </div>
      <div className="flex items-center justify-between bg-cyan-700 rounded p-4 mt-6">
        <img src={logo} alt="" className="w-52"/>
        <Text className="text-white text-md font-bold text-center">Conserto de aparelos e eletrônicos</Text>
      </div>
      <div className="flex flex-col gap-3 items-stretch w-full mt-1">
        <div className="flex items-center gap-3">
          <Text className="text-black-important"><b>Cliente:</b> {client.name}</Text>
        </div>
        <div className="flex items-center gap-3">
          <Text className="text-black-important"><b>Endereço:</b> {client.local}</Text>
        </div>
        <div className="flex items-center gap-3">
          <Text className="text-black-important"><b>Cidade:</b> {client.city}</Text>
          <Text className="text-black-important"><b>Bairro:</b> {client.district}</Text>
          <Text className="text-black-important"><b>Telefone:</b> {client.fone}</Text>
        </div>
      </div>
      <div className="flex items-center justify-center bg-cyan-700 py-1 mt-6">
        <Text className="text-white text-md font-bold">Sobre o aparelho</Text>
      </div>
      <div className="flex flex-col gap-3 items-stretch w-full mt-1">
        <div className="flex items-center gap-3">
          <Text className="text-black-important"><b>Equipamento:</b> {client.equipment}</Text>
          <Text className="text-black-important"><b>Acessórios:</b> {client.accessories}</Text>
        </div>
        <div className="flex items-center gap-3">
          <Text className="text-black-important"><b>Marca:</b> {client.brand}</Text>
          <Text className="text-black-important"><b>Modelo:</b> {client.model}</Text>
        </div>
      </div>
      <div className="flex items-center justify-center bg-cyan-700 py-1 mt-6">
        <Text className="text-white text-md font-bold">Defeito</Text>
      </div>
      <div className="flex items-center gap-3 mt-1">
        <Text className="text-black-important">{client.defect}</Text>
      </div>
      <div className="mt-8 p-1 rounded border-[#000] border-[1px]">
        <Text className="text-black-important"><b>Obs:</b> Os aparelhos que não forem retirados no prazo de 90 dias, serão vendidos para cobrir as despesas.</Text>
        <Text className="text-black-important">Os aparelhos somente serão entregues mediante a devolução desta via</Text>
        <Text className="text-black-important mt-1"><b>RG ou CPF:</b> ___________________________________</Text>
        <Text className="text-black-important mt-1"><b>Assinatura:</b> ___________________________________</Text>
      </div>
    </BoxDiv>
  )
}