import React from "react"
import Link from "next/link"
import ShopCollectionItem from "../ShopCollectionItem"
import { CollectionItem } from "../../types"
import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer,
} from "./styles"

type Props = { title: string; items: CollectionItem[] }

const ShopCollectionPreview = ({ title, items }: Props): JSX.Element => {
  const addItemToCart = (itemId: string) => {
    // logic to add item to a shopping cart
  }

  return (
    <CollectionPreviewContainer>
      <TitleContainer>
        <Link href={`/shop/${title.toLowerCase()}`}>{title.toUpperCase()}</Link>
      </TitleContainer>
      <PreviewContainer>
        {items
          .filter((item, idx) => idx < 4)
          .map((item) => (
            <ShopCollectionItem
              key={item.id}
              item={item}
              addItem={addItemToCart}
            />
          ))}
      </PreviewContainer>
    </CollectionPreviewContainer>
  )
}

export default ShopCollectionPreview
