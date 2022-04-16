import type { NextPage } from "next"
import Head from "next/head"
import { connect } from "react-redux"
import { RootStateType } from "../../src/types"
import PageContainer from "../../src/containers/PageContainer"

const SigninPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Crown Clothing | Authentication</title>
        <meta name="description" content="Online commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>signin page</PageContainer>
    </>
  )
}

export default connect((state: RootStateType) => state)(SigninPage)
