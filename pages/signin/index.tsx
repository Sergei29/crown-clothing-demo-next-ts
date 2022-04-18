import type { NextPage } from "next"
import Head from "next/head"
import { connect } from "react-redux"
import { RootStateType } from "../../src/types"
import PageContainer from "../../src/containers/PageContainer"
import AuthenticationForm from "../../src/components/AuthenticationForm"

const SigninPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Crown Clothing | Authentication</title>
        <meta name="description" content="Online commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <AuthenticationForm />
      </PageContainer>
    </>
  )
}

export default connect((state: RootStateType) => state)(SigninPage)
