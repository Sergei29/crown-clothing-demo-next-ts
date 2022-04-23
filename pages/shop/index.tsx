import React, { useEffect } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { getCollections } from "../../src/redux/actions/collections"
import { RootStateType, CollectionsState, Store } from "../../src/types"
import ShopCollectionPreview from "../../src/components/ShopCollectionPreview"
import PageContainer from "../../src/containers/PageContainer"
import { wrapper } from "../../src/redux/store"

export const CollectionsOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ShopPage: NextPage = () => {
  const { collection } = useSelector<RootStateType, CollectionsState>(
    (state) => state.collections
  )

  return (
    <>
      <Head>
        <title>Crown Clothing | Shop</title>
        <meta name="description" content="Online commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <CollectionsOverviewContainer>
          {!!collection &&
            collection.map(({ id, title, items }) => (
              <ShopCollectionPreview key={id} title={title} items={items} />
            ))}
        </CollectionsOverviewContainer>
      </PageContainer>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store: Store) => async (ctx) => {
    await store.dispatch(getCollections())
    return {
      props: { initialReduxState: store.getState() },
    }
  }
)

export default ShopPage
