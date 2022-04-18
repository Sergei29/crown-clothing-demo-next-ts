import type { NextPage } from "next"
import Head from "next/head"
import { connect } from "react-redux"
import { END } from "redux-saga"
import styled from "styled-components"
import { wrapper } from "../../src/redux/store"
import { getCollectionsStart } from "../../src/redux/actions/collections"
import { RootStateType, CollectionsState } from "../../src/types"
import PageContainer from "../../src/containers/PageContainer"
import ShopCollectionPreview from "../../src/components/ShopCollectionPreview"

export const CollectionsOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`

type Props = {
  collections: CollectionsState
}

const ShopPage: NextPage<Props> = ({ collections }) => {
  return (
    <>
      <Head>
        <title>Crown Clothing | Shop</title>
        <meta name="description" content="Online commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <CollectionsOverviewContainer>
          {collections.collection.map(({ id, title, items }) => (
            <ShopCollectionPreview key={id} title={title} items={items} />
          ))}
        </CollectionsOverviewContainer>
      </PageContainer>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    await store.dispatch(getCollectionsStart())

    await store.dispatch(END)
    await store.sagaTask.toPromise()
    const { collections } = store.getState()

    return {
      props: { collections },
    }
  }
)

export default connect((state: RootStateType) => state)(ShopPage)
