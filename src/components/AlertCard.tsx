import { ReactNode } from "react";
import BoxDiv from "./BoxDiv";
import { Button } from "./Button";
import ModelBackground from "./ModelBackground";

interface AlertCardProps{
  children: ReactNode
  hasButton: boolean
  changeAlertCard: () => void
}

export function AlertCard({ children, hasButton, changeAlertCard }: AlertCardProps) {
  
  return(
    <ModelBackground>
      <BoxDiv className="w-96 text-center">
        {children}
        {hasButton ? <Button className="mt-4" onClick={changeAlertCard}>OK</Button> : <></>}
      </BoxDiv>
    </ModelBackground>
  )
}