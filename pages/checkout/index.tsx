import type { NextPage } from "next"
import Head from "next/head"
import PageContainer from "../../src/containers/PageContainer"

const CheckoutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Crown Clothing | Checkout</title>
        <meta name="description" content="Online commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>checkout page</PageContainer>
    </>
  )
}

export default CheckoutPage
