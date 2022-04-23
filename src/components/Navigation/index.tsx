import React from "react"
import { useSession, signOut } from "next-auth/react"
import Logo from "../Icons/Logo"
import CartIcon from "../CartIcon"
import CartDropdown from "../CartDropdown"
import {
  NavContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
  OptionStyled,
} from "./styles"

const Navigation = () => {
  const { data: session } = useSession()
  const hidden = true // get global state for shopping card show/hidden status

  const signOutStart = () => {
    // proceed href signOut
    signOut()
  }

  return (
    <NavContainer>
      <LogoContainer href="/" as={`/`}>
        <Logo className="logo" />
      </LogoContainer>

      <OptionsContainer>
        <OptionLink href="/shop" as={`/shop`}>
          SHOP
        </OptionLink>

        <OptionLink href="/contact" as={`/contact`}>
          CONTACT
        </OptionLink>

        {session ? (
          <OptionStyled onClick={signOutStart}>SIGN OUT</OptionStyled>
        ) : (
          <OptionLink href="/signin" as={`/signin`}>
            SIGN IN
          </OptionLink>
        )}

        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropdown />}
    </NavContainer>
  )
}

export default Navigation
