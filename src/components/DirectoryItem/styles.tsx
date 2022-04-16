import styled, { StyledFunction } from "styled-components"

type ImageContainerProps = { imageUrl: string }

const BackgroundImageContainer = styled.div<ImageContainerProps>`
  width: 100%;
  height: 100%;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-position: center;
  background-size: cover;
`

const ContentContainer = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: #fff;
  opacity: 0.7;
  position: absolute;
`

const TitleContainer = styled.h1`
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 22px;
  color: #4a4a4a;
`

const SubTitleContainer = styled.span`
  font-weight: lighter;
  font-size: 16px;
`

type ItemContainerProps = { size: string }

const MenuItemContainer = styled.div<ItemContainerProps>`
  min-width: 30%;
  height: ${({ size }) => (size === "large" ? "380px" : "240px")};
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  overflow: hidden;

  &:first-child {
    margin-right: 7.5px;
  }

  &:last-child {
    margin-left: 7.5px;
  }

  &:hover {
    cursor: pointer;

    ${BackgroundImageContainer} {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

    ${ContentContainer} {
      opacity: 0.9;
    }
  }
`

export {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  TitleContainer,
  SubTitleContainer,
}
