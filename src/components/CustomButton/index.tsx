import React, { ButtonHTMLAttributes } from "react"
import { CustomButtonContainer } from "./styles"

type Props = {
  isGoogleSignIn?: boolean
  inverted?: boolean
  children: React.ReactNode
} & ButtonHTMLAttributes<any>

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
