import React from "react"
import { ShoppingCartItem } from "../../types"
import {
  CartItemContainer,
  ImageContainer,
  ItemDetailsContainer,
  NameContainer,
} from "./styles"

type Props = ShoppingCartItem

const CartItem = ({ imageUrl, price, name, quantity }: Props) => {
  return (
    <CartItemContainer>
      <ImageContainer src={imageUrl} alt="item" />
      <ItemDetailsContainer>
        <NameContainer>{name}</NameContainer>
        <span className="price">{`${quantity} x ${price}`}</span>
      </ItemDetailsContainer>
    </CartItemContainer>
  )
}

export default CartItem
