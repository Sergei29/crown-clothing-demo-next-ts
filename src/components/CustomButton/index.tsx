import React from "react"
import { CustomButtonContainer } from "./styles"
import { ButtonElemProps } from "../../types"

type Props = {
  isGoogleSignIn?: boolean
  inverted?: boolean
  children: React.ReactNode
} & ButtonElemProps

const CustomButton = ({
  children,
  inverted = false,
  isGoogleSignIn = false,
  ...restButtonProps
}: Props) => {
  return (
    <CustomButtonContainer
      inverted={inverted}
      isGoogleSignIn={isGoogleSignIn}
      {...restButtonProps}
    >
      {children}
    </CustomButtonContainer>
  )
}

export default CustomButton
