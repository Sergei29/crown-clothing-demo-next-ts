import { useEffect } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import { connect } from "react-redux"
import { END } from "redux-saga"
import styled from "styled-components"
import { wrapper } from "../../src/redux/store"
import { getCollectionsStart } from "../../src/redux/actions/collections"
import { RootStateType, CollectionsState } from "../../src/types"
import { getDirectoriesAdapter } from "../../src/utils"
import DirectoryItem from "../../src/components/DirectoryItem"
import PageContainer from "../../src/containers/PageContainer"

type Props = {
  collections: CollectionsState
}

const ShopPage: NextPage<Props> = ({ collections }) => {
  useEffect(() => {
    console.log("collections :>> ", collections)
  }, [collections])

  return (
    <>
      <Head>
        <title>Crown Clothing | Shop</title>
        <meta name="description" content="Online commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>shop page</PageContainer>
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

export default connect((state: RootStateType) => state)(ShopPage)