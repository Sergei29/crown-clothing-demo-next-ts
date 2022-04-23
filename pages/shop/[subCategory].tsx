import type { NextPage } from "next"
import Head from "next/head"
import { getSession } from "next-auth/react"
import { wrapper } from "../../src/redux/store"
import { Collection, Store } from "../../src/types"
import { getCollections } from "../../src/redux/actions/collections"
import { signInSuccess } from "../../src/redux/actions/user"
import PageContainer from "../../src/containers/PageContainer"
import ShopCollectionDetails from "../../src/components/ShopCollectionDetails"

type Props = {
  collection: Collection
}

const ShopCategoryPage: NextPage<Props> = ({ collection }) => {
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
  (store: Store) => async (ctx) => {
    let collection: Collection | null = null

    const {
      query: { subCategory },
    } = ctx

    if (!subCategory || Array.isArray(subCategory)) {
      return {
        notFound: true,
      }
    }
    const session = await getSession(ctx)
    const {
      id = null,
      email,
      name,
    } = (session?.user as Record<string, any>) || {}
    if (!!id && !!email && !!name) {
      await store.dispatch(signInSuccess({ id, name, email }))
    }

    await store.dispatch(getCollections())
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
      props: { collection, initialReduxState: state },
    }
  }
)

export default ShopCategoryPage
