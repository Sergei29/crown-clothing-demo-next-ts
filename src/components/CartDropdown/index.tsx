import React from "react"
import { useRouter } from "next/router"
import CartItem from "../CartItem"
import { ShoppingCartItem } from "../../types"
import {
  CartDropdownContainer,
  CartItemsContainer,
  EmptyMessageContainer,
  CheckoutButtonContainer,
} from "./styles"

type Props = {
  cartItems?: ShoppingCartItem[]
}

const CartDropdown = ({ cartItems = [] }: Props) => {
  const { push } = useRouter()
  const toggleCartHidden = () => {
    // run checkout logic...

    push("/checkout")
  }

  return (
    <CartDropdownContainer>
      <CartItemsContainer>
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
        )}
      </CartItemsContainer>
      <CheckoutButtonContainer
        onClick={() => {
          toggleCartHidden()
        }}
      >
        GO TO CHECKOUT
      </CheckoutButtonContainer>
    </CartDropdownContainer>
  )
}

export default CartDropdown
