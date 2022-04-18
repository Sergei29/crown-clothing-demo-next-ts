import type { NextPage } from "next"
import Head from "next/head"
import { connect } from "react-redux"
import { END } from "redux-saga"
import { wrapper } from "../../src/redux/store"
import { getCollectionsStart } from "../../src/redux/actions/collections"
import { RootStateType, Collection } from "../../src/types"
import PageContainer from "../../src/containers/PageContainer"
import ShopCollectionDetails from "../../src/components/ShopCollectionDetails"

type Props = {
  collection: Collection
}

const ShopPage: NextPage<Props> = ({ collection }) => {
  return (
    <>
      <Head>
        <title>Crown Clothing | {collection.title}</title>
        <meta name="description" content="Online commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <ShopCollectionDetails
          title={collection.title}
          items={collection.items}
        />
      </PageContainer>
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
