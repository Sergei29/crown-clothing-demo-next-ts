import React from "react"
import {
  CartIconContainer,
  ShoppingIconContainer,
  ItemCountContainer,
} from "./styles"

const CartIcon = (): JSX.Element => {
  const itemCount = 0
  const toggleCartHidden = () => {}
  return (
    <CartIconContainer onClick={toggleCartHidden}>
      <ShoppingIconContainer />
      <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartIconContainer>
  )
}

export default CartIcon
