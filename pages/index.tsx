import type { NextPage } from "next"
import Head from "next/head"
import styled from "styled-components"

const StyledH1 = styled.h1`
  font-family: ${(props) => props.theme.font.heading};
  color: ${(props) => props.theme.palette.primary.main};
`

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Crown Clothing</title>
        <meta name="description" content="Online commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <StyledH1>Crown clothing</StyledH1>
      </main>

      <footer></footer>
    </>
  )
}

export default Home
