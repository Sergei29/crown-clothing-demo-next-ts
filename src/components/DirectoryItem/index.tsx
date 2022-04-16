import React from "react"
import { useRouter } from "next/router"
import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  TitleContainer,
  SubTitleContainer,
} from "./styles"

type Props = {
  title: string
  imageUrl: string
  size: string
  linkUrl: string
}
const DirectoryItem = ({ title, imageUrl, size, linkUrl }: Props) => {
  const { push, pathname } = useRouter()

  return (
    <MenuItemContainer
      size={size}
      onClick={() => push(`${pathname}${linkUrl}`)}
    >
      <BackgroundImageContainer imageUrl={imageUrl} />

      <ContentContainer>
        <TitleContainer>{title.toUpperCase()}</TitleContainer>
        <SubTitleContainer>SHOP NOW</SubTitleContainer>
      </ContentContainer>
    </MenuItemContainer>
  )
}

export default DirectoryItem
