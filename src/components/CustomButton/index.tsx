import React from "react"
import { CustomButtonContainer } from "./styles"

type Props = {
  isGoogleSignIn: boolean
  inverted: boolean
  children: React.ReactNode
}

const CustomButton = (props: Props) => {
  return (
    <CustomButtonContainer {...props}>{props.children}</CustomButtonContainer>
  )
}

export default CustomButton
