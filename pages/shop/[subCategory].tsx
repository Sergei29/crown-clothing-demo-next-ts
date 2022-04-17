import { useEffect } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import { connect } from "react-redux"
import { END } from "redux-saga"
import { wrapper } from "../../src/redux/store"
import { getCollectionsStart } from "../../src/redux/actions/collections"
import { RootStateType, Collection } from "../../src/types"
import PageContainer from "../../src/containers/PageContainer"

type Props = {
  collection: Collection | null
}

const ShopPage: NextPage<Props> = ({ collection }) => {
  useEffect(() => {
    console.log("collection :>> ", collection)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>Crown Clothing | {collection?.title || ""}</title>
        <meta name="description" content="Online commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>{collection?.title || "not found"}</PageContainer>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    let collection: Collection | null = null

    const {
      query: { subCategory },
    } = ctx

    if (!subCategory || Array.isArray(subCategory)) {
      return {
        notFound: true,
      }
    }

    await store.dispatch(getCollectionsStart())
    await store.dispatch(END)
    await store.sagaTask.toPromise()

    const state = store.getState()

    collection =
      state.collections.collection.find((col) => col.title === subCategory) ||
      null

    if (!collection) {
      return {
        notFound: true,
      }
    }

    return {
      props: { collection },
    }
  }
)

export default connect((state: RootStateType) => state)(ShopPage)
