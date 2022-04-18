import React from "react"
import { CollectionItem } from "../../types"
import ShopCollectionItem from "../ShopCollectionItem"
import {
  CollectionPageContainer,
  CollectionItemsContainer,
  CollectionTitle,
} from "./styles"

type Props = {
  title: string
  items: CollectionItem[]
}

const ShopCollectionDetails = ({ title, items }: Props): JSX.Element => {
  const addItemToCart = (itemId: string) => {
    // logic to add item to a shopping cart
  }

  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items.map((item) => (
          <ShopCollectionItem
            key={item.id}
            item={item}
            addItem={addItemToCart}
          />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  )
}

export default ShopCollectionDetails
