import { useEffect } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import { connect } from "react-redux"
import { END } from "redux-saga"
import styled from "styled-components"
import { wrapper } from "../src/redux/store"
import { getCollectionsStart } from "../src/redux/actions/collections"
import { RootStateType, CollectionsState } from "../src/types"
import { getDirectoriesAdapter } from "../src/utils"
import DirectoryItem from "../src/components/DirectoryItem"
import PageContainer from "../src/containers/PageContainer"
import { NEXT_PUBLIC_APP_URL } from "../src/constants"

export const HomePageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 80px;
`
export const DirectoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

type Props = {
  collections: CollectionsState
}

const Home: NextPage<Props> = ({ collections }) => {
  useEffect(() => {
    console.log("collections :>> ", collections)
  }, [collections])

  console.log("NEXT_PUBLIC_APP_URL :>> ", NEXT_PUBLIC_APP_URL)

  return (
    <>
      <Head>
        <title>Crown Clothing</title>
        <meta name="description" content="Online commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <HomePageContainer>
          <DirectoryContainer>
            {getDirectoriesAdapter(collections.collection).map(
              ({ id, imageUrl, title, size, linkUrl }) => (
                <DirectoryItem
                  key={id}
                  imageUrl={imageUrl}
                  title={title}
                  size={size}
                  linkUrl={linkUrl}
                />
              )
            )}
          </DirectoryContainer>
        </HomePageContainer>
      </PageContainer>
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
