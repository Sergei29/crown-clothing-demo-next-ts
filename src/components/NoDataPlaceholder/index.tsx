import React from "react"
import Image from "next/image"
import styled from "styled-components"
import { convertVhToPx, convertVwToPx } from "../../utils"

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
`

const Heading = styled.h4`
  text-align: center;
`

type Props = {
  customMessage?: string
}

const NoDataPlaceholder = ({ customMessage }: Props) => (
  <Container>
    <Heading>{customMessage || "Sorry, no data available"}</Heading>

    <Image
      src="https://i.imgur.com/FOeYt4E.png"
      height="400"
      width="350"
      alt="not found"
    />
  </Container>
)

export default NoDataPlaceholder
