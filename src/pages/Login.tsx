import { InputText } from "../components/InputText";
import { Text } from "../components/Text"
import {Envelope, Lock} from "phosphor-react"
import { Button } from "../components/Button";
import logo from "../images/logo-branco.png"

function Login() {

  return (
    <div className="w-screen h-screen bg-gray-900 flex gap-24 items-center justify-center text-gray-100">
      <div className="flex flex-col gap-6 items-stretch w-full max-w-sm">
        <label htmlFor="email" className="flex flex-col gap-3">
          <Text className="font-semibold">Endereço de e-mail</Text>
          <InputText className="bg-gray-800" icon={<Envelope/>} type="email" id="email" placeholder="Digite seu e-mail" />
        </label>
        <label htmlFor="password" className="flex flex-col gap-3">
          <Text className="font-semibold">Senha</Text>
          <InputText className="bg-gray-800" icon={<Lock/>} type="password" id="password" placeholder="********" />
        </label>
        <a href="/home"><Button>Entrar no sistema</Button></a>
      </div>
      <div className="h-80 border-r-2"></div>
      <div className="flex flex-col items-center justify-center">
        <img src={logo} alt="" className="w-[350px]"/>
        <h2 className="font-bold text-3xl max-w-sm text-center">Sistema Integrado de Gestão</h2>
      </div>
    </div>
  );
}

export default Login;
