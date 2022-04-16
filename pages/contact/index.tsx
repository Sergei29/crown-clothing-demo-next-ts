import type { NextPage } from "next"
import Head from "next/head"
import { connect } from "react-redux"
import { RootStateType } from "../../src/types"
import PageContainer from "../../src/containers/PageContainer"

const ContactPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Crown Clothing | Contact</title>
        <meta name="description" content="Online commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>contact page</PageContainer>
    </>
  )
}

export default connect((state: RootStateType) => state)(ContactPage)
