import { useEffect, useState } from "react";
import BoxDiv from "../components/BoxDiv";
import ContentDiv from "../components/ContentDiv";
import { Loading } from "../components/Loading";
import { Text } from "../components/Text";
import NavBar from "../components/NavBar";
import NotificationDiv from "../components/NotificationDiv";
import { Bills } from "../functions/billsFunctions";
import { IBill } from "../interfaces/IBill";
import { INotification } from "../interfaces/INotification";
import { makeNotificationsForBills, makeNotificationsForComponents } from "../utils/helpers/notification";
import { Component } from "../functions/componentsFunctions";
import { IComponent } from "../interfaces/IComponent";
import logo from "../images/logo.png"

function Home() {

  const [allBills, setAllBills] = useState<IBill[]>([])
  const [allComponents, setAllComponents] = useState<IComponent[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const allBillsNotifications:Array<INotification> = makeNotificationsForBills(allBills)
  const allComponentsNotifications:Array<INotification> = makeNotificationsForComponents(allComponents)

  const getAllInfos = async () => {
    setIsLoading(true)
    
    let newAllBills = await Bills.getAll()
    let newAllComponents = await Component.getAll()

    setAllBills(newAllBills)
    setAllComponents(newAllComponents)
    setIsLoading(false)
  }

  useEffect(() => {
    getAllInfos()
  }, [])

  return (
    <ContentDiv>
      <NavBar active="Home" />
      <div className="w-full">
        <div className="flex items-center justify-center mt-4">
          <img src={logo} alt="" className="w-24"/>
          <h2 className="font-bold text-2xl max-w-sm text-center">Bem vindo ao sistema de gestão integrado</h2>
        </div>
        <div className="flex flex-wrap mx-auto my-10 w-[900px] gap-[100px]">
          <BoxDiv className="w-[400px] h-[285px] flex flex-col gap-4 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-700">
            {isLoading ? <Loading /> :
              <>
                {(allBillsNotifications.length > 0) ?
            
                  allBillsNotifications.map((notif) => {
                    return (
                      <NotificationDiv key={notif.id} notification={notif} />
                    )
                  })
                  :
                  <Text className="text-center mt-20" size="lg">Nenhuma conta a pagar nos próximos 3 dias</Text>
                }
              </>
            }
          </BoxDiv>
          <BoxDiv className="w-[400px] h-[285px] flex flex-col gap-4 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-700"> 
          {isLoading ? <Loading /> :
              <>
                {(allComponentsNotifications.length > 0) ?
            
                  allComponentsNotifications.map((notif) => {
                    return (
                      <NotificationDiv key={notif.id} notification={notif} />
                    )
                  })
                  :
                  <Text className="text-center mt-20" size="lg">Nenhum componente com em falta</Text>
                }
              </>
            }
          </BoxDiv>
        </div>
      </div>
    </ContentDiv>
  )
}

export default Home