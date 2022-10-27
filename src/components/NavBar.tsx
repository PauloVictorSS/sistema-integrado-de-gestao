import { Slot } from "@radix-ui/react-slot"
import { House, PuzzlePiece, Gear, FolderUser, ChartLineUp, CurrencyCircleDollar, UserGear, SignOut } from "phosphor-react"
import { ReactNode } from "react"
import {Text} from "./Text"

interface NavBarItemProps{
  name: string
  link: string
  icon: ReactNode
  active: boolean
}

function NavBarItem({name, link, icon, active}: NavBarItemProps) {
  return (
    <a href={link}>
      <div className={"flex gap-4 items-center justify-start p-2 py-3 hover:bg-gray-700 " + (active ? "bg-gray-700" : "")}>
        <Slot className='w-8 h-8 text-white'> 
          {icon}
        </Slot>
        <Text size="xs" className="max-w-sm">{name}</Text>
      </div>
    </a>
  )
}

interface NavBarProps{
  active: string
}

function NavBar({ active }: NavBarProps) {
  
  return (
    <div className={"py-2 bg-gray-800 h-screen w-48"}>
      <h2 className="text-gray-100 font-bold text-lg text-center">Administrador</h2>
      <div className="flex gap-4 flex-col mt-7">
        <NavBarItem name="Home" link="/home" icon={<House />} active={active === "Home"}/>
        <NavBarItem name="Componentes" link="/components" icon={<PuzzlePiece />} active={active === "Componentes"}/>
        <NavBarItem name="Peças e equipamentos" link="/parts" icon={<Gear />} active={active === "Peças"}/>
        <NavBarItem name="Clientes" link="/clients" icon={<FolderUser />} active={active === "Clientes"}/>
        <NavBarItem name="Gráficos e dados" link="/data" icon={<ChartLineUp />} active={active === "Dados"}/>
        <NavBarItem name="Contas a pagar/receber" link="/bills" icon={<CurrencyCircleDollar />} active={active === "Contas"}/>
        <NavBarItem name="Usuários" link="/users" icon={<UserGear />} active={active === "Usuários"}/>
        <NavBarItem name="Sair" link="/" icon={<SignOut />} active={false}/>
      </div>
    </div>
  )
}

export default NavBar