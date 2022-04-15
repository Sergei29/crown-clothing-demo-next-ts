import { useEffect } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import { connect } from "react-redux"
import { END } from "redux-saga"
import styled from "styled-components"
import { wrapper } from "../src/redux/store"
import { getCollectionsStart } from "../src/redux/actions/collections"
import { RootStateType, CollectionsState } from "../src/types"

const StyledH1 = styled.h1`
  font-family: ${(props) => props.theme.font.heading};
  color: ${(props) => props.theme.palette.primary.main};
  text-align: center;
`
const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  height: 100vh;
`
const PostsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`

const PostItem = styled.div`
  background-color: #fff;
  padding: 16px;
  width: 250px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  &:hover {
    background-color: #eaeaea;
    transition: all 300ms ease-in-out;
  }
  h4 {
    font-weight: 800;
    text-align: center;
  }
`

type Props = {
  collections: CollectionsState
}

const Home: NextPage<Props> = ({ collections }) => {
  useEffect(() => {
    console.log("collections :>> ", collections)
  }, [collections])

  return (
    <>
      <Head>
        <title>Crown Clothing</title>
        <meta name="description" content="Online commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <StyledH1>Crown clothing</StyledH1>
          <PostsList>
            {collections.collection.map((col) => (
              <PostItem key={col.id}>
                <h4>{col.title}</h4>
              </PostItem>
            ))}
          </PostsList>
        </Container>
      </main>

      <footer></footer>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    await store.dispatch(getCollectionsStart())
    const { collections } = store.getState()

    await store.dispatch(END)
    await store.sagaTask.toPromise()

    return {
      props: { collections },
    }
  }
)

export default connect((state: RootStateType) => state)(Home)
