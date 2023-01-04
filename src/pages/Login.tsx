import { InputText } from "../components/InputText";
import { Text } from "../components/Text"
import {Envelope, Lock} from "phosphor-react"
import { Button } from "../components/Button";
import logo from "../images/logo-branco.png"
import { ReactNode, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { AlertCard } from "../components/AlertCard";

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mensagePopUp, setMensagePopUp] = useState<ReactNode>("")
  const [seeAlertCard, setSeeAlertCard] = useState(false)

  const navegation = useNavigate()

  const verifyError = (errorCode: string) => {
    if (errorCode === 'auth/invalid-email') 
      return 'Email incorreto'
        
    if (errorCode === 'auth/wrong-password') 
      return 'Senha incorreta'
    
    if (errorCode === 'auth/user-not-found') 
      return 'Usuário não encontrado'

    return errorCode
  }

  const tryLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navegation("/home")
      })
      .catch((error) => {
        setSeeAlertCard(true)
        setMensagePopUp(verifyError(error.code))
      })
  }

  const login = async () => {
    if(email === "" || password === ""){
        setSeeAlertCard(true)
        setMensagePopUp("Os campos email e senha não podem estar vazios")
        return
    }

    tryLogin()
  }

  return (
    <>
      <div className="w-screen h-screen bg-gray-900 flex gap-24 items-center justify-center text-gray-100">
        <div className="flex flex-col gap-6 items-stretch w-full max-w-sm">
          <label htmlFor="email" className="flex flex-col gap-3">
            <Text className="font-semibold">Endereço de e-mail</Text>
            <InputText
              className="bg-gray-800"
              icon={<Envelope />}
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-3">
            <Text className="font-semibold">Senha</Text>
            <InputText
              className="bg-gray-800"
              icon={<Lock />}
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
            />
          </label>
          <Button onClick={login}>Entrar no sistema</Button>
        </div>
        <div className="h-80 border-r-2"></div>
        <div className="flex flex-col items-center justify-center">
          <img src={logo} alt="" className="w-[350px]"/>
          <h2 className="font-bold text-3xl max-w-sm text-center">Sistema Integrado de Gestão</h2>
        </div>
      </div>
      {seeAlertCard &&
        <AlertCard hasButton={true} changeAlertCard={() => { setSeeAlertCard(!seeAlertCard) }}>
          {mensagePopUp}
        </AlertCard>
        }
    </>
  );
}

export default Login;