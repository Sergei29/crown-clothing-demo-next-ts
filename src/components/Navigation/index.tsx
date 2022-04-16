import React from "react"
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
  const currentUser = null // get current user from auth
  const hidden = true // get global state for shopping card show/hidden status

  const signOutStart = () => {
    // proceed href signOut
  }

  return (
    <NavContainer>
      <LogoContainer href="/">
        <Logo className="logo" />
      </LogoContainer>

      <OptionsContainer>
        <OptionLink href="/shop">SHOP</OptionLink>

        <OptionLink href="/contact">CONTACT</OptionLink>

        {currentUser ? (
          <OptionStyled onClick={signOutStart}>SIGN OUT</OptionStyled>
        ) : (
          <OptionLink href="/signin">SIGN IN</OptionLink>
        )}

        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropdown />}
    </NavContainer>
  )
}

export default Navigation
