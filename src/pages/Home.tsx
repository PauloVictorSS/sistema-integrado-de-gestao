import BoxDiv from "../components/BoxDiv";
import ContentDiv from "../components/ContentDiv";
import NavBar from "../components/NavBar";
import NotificationDiv from "../components/NotificationDiv";
import { INotification } from "../interfaces/INotification";

function Home() {

  const allNotifications: Array<INotification> =[
    {
      id: "123",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: "123",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: "123",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: "123",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: "123",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    }
  ]

  return (
    <ContentDiv>
      <NavBar active="Home" />
      <div className="w-full">
        <h2 className="font-bold text-2xl max-w-sm mx-auto text-center">Bem vindo ao Sistema Integrado de Gestão</h2>
        <div className="flex flex-wrap mx-auto my-10 w-[900px] gap-[100px]">
          <BoxDiv className="w-[400px] h-[285px] flex flex-col gap-4 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-700">
            {
              allNotifications.map((notif) => {
                return (
                  <NotificationDiv notification={notif} />
                )
              })
            }
          </BoxDiv>
          <BoxDiv className="w-[400px] h-[285px] flex flex-col gap-4 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-700"> 
            {
              allNotifications.map((notif) => {
                return (
                  <NotificationDiv notification={notif} />
                )
              })
            }
          </BoxDiv>
        </div>
      </div>
    </ContentDiv>
  )
}

export default Home