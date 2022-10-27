import { IComponent } from "../interfaces/IComponents";
import BoxDiv from "./BoxDiv";
import { Button } from "./Button";
import ModelBackground from "./ModelBackground";
import {Text} from "../components/Text";
import {InputText} from "../components/InputText";
import { TextArea } from "./TextArea";

interface ComponentsCardProps{
    component: IComponent
    changeComponentsCard: () => void
    isAddComponent: boolean
}

export function ComponentsCard({component, changeComponentsCard, isAddComponent}: ComponentsCardProps){

    return(
        <ModelBackground>
            <BoxDiv className="w-96">
                <h2 className="font-bold text-xl max-w-sm mx-auto text-center mb-4">
                    {isAddComponent ? "Novo componente" : "Alterar componente"}
                </h2>
                <div className="flex flex-col gap-6 items-stretch w-full">
                    <label htmlFor="name" className="flex flex-col gap-3">
                        <Text className="font-semibold">Nome</Text>
                        <InputText className="bg-gray-900" type="text" id="name" placeholder="nome do componente" />
                    </label>
                    <label htmlFor="qtd" className="flex flex-col gap-3">
                        <Text className="font-semibold">Quantidade</Text>
                        <InputText className="bg-gray-900" type="number" id="qtd" placeholder="quantidade de unidades do componente" />
                    </label>
                    <label htmlFor="qtdMin" className="flex flex-col gap-3">
                        <Text className="font-semibold">Quantidade mínima</Text>
                        <InputText className="bg-gray-900" type="number" id="qtdMin" placeholder="quantidade mínima para o sistema avisar" />
                    </label>
                    <label htmlFor="local" className="flex flex-col gap-3">
                        <Text className="font-semibold">Local de armazenamento</Text>
                        <InputText className="bg-gray-900" type="text" id="local" placeholder="gaveta onde está o componente" />
                    </label>
                    <label htmlFor="name" className="flex flex-col gap-3">
                        <Text className="font-semibold">Descrição</Text>
                        <TextArea className="bg-gray-900"/>
                    </label>
                    <div className="flex gap-2 w-full justify-between">
                        {isAddComponent ? 
                            <Button onClick={changeComponentsCard}>
                                Adicionar componente
                            </Button>
                            :
                            <Button onClick={changeComponentsCard}>
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