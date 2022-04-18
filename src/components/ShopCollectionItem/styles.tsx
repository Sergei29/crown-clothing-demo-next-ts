import styled from "styled-components"
import CustomButton from "../CustomButton"

type ImgContainerProps = { imageUrl: string }

const ImageContainer = styled.div<ImgContainerProps>`
  width: 100%;
  height: 95%;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
`

const CollectionFooterContainer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`

const NameContainer = styled.span`
  width: 90%;
  margin-bottom: 15px;
`

const PriceContainer = styled.span`
  width: 10%;
`

const CustomButtonContainer = styled(CustomButton)`
  width: 80%;
  opacity: 0.7;
  position: absolute;
  top: 255px;
  display: none;
`

const CollectionItemContainer = styled.div`
  width: 22vw;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;
  &:hover {
    ${ImageContainer} {
      opacity: 0.8;
    }

    ${CustomButtonContainer} {
      opacity: 0.85;
      display: flex;
    }
  }
`

export {
  CollectionItemContainer,
  ImageContainer,
  CollectionFooterContainer,
  NameContainer,
  PriceContainer,
  CustomButtonContainer,
}
