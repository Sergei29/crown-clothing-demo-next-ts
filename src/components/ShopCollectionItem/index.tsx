import React from "react"
import { CollectionItem } from "../../types"
import {
  CollectionItemContainer,
  ImageContainer,
  CollectionFooterContainer,
  NameContainer,
  PriceContainer,
  CustomButtonContainer,
} from "./styles"

type Props = {
  item: CollectionItem
  addItem: (itemId: string) => void
}

const ShopCollectionItem = ({ item, addItem }: Props): JSX.Element => {
  const { name, imageUrl, price } = item
  return (
    <CollectionItemContainer>
      <ImageContainer imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </CollectionFooterContainer>
      <CustomButtonContainer inverted onClick={() => addItem(item.id)}>
        ADD TO CART
      </CustomButtonContainer>
    </CollectionItemContainer>
  )
}

export default ShopCollectionItem
