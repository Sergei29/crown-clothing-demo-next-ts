import styled from "styled-components"

const CollectionPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`

const TitleContainer = styled.h1`
  font-size: 28px;
  margin-bottom: 25px;
  & a {
    color: inherit;
    text-decoration: none;
  }
`

const PreviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export { CollectionPreviewContainer, TitleContainer, PreviewContainer }
