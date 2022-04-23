import React, { useEffect } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import { useSelector } from "react-redux"
import { getSession } from "next-auth/react"
import styled from "styled-components"
import { wrapper } from "../src/redux/store"
import { getCollections } from "../src/redux/actions/collections"
import { RootStateType, CollectionsState, Store } from "../src/types"
import { getDirectoriesAdapter } from "../src/utils"
import DirectoryItem from "../src/components/DirectoryItem"
import PageContainer from "../src/containers/PageContainer"

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

const Home: NextPage = () => {
  const { collection } = useSelector<RootStateType, CollectionsState>(
    (state) => state.collections
  )

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
            {!!collection &&
              getDirectoriesAdapter(collection).map(
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
  (store: Store) => async (ctx) => {
    const session = await getSession(ctx)
    console.log("Home/getServerSideProps/session :>> ", session)
    await store.dispatch(getCollections())
    return {
      props: { initialReduxState: store.getState() },
    }
  }
)

export default Home
