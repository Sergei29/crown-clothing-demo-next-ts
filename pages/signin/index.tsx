import { useEffect } from "react"
import type { NextPage, GetServerSideProps } from "next"
import Head from "next/head"
import { connect } from "react-redux"
import {
  signIn,
  getSession,
  getProviders,
  getCsrfToken,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers"
import { Session } from "next-auth"
import { RootStateType } from "../../src/types"
import PageContainer from "../../src/containers/PageContainer"
import AuthenticationForm, {
  SignUpData,
} from "../../src/components/AuthenticationForm"

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null
  session: Session | null
  csrfToken?: string
}
const SigninPage: NextPage<Props> = ({ providers, session, csrfToken }) => {
  const googleSignInStart = async () => {
    // auth login with google
    if (!providers?.google) return
    await signIn(providers.google.id)
  }
  const emailSignInStart = async (email: string, password: string) => {
    // auth login with email and pw
    if (!providers?.credentials) return
    await signIn("credentials", { email, password })
  }
  const signUpStart = ({ email, password, displayName }: SignUpData) => {
    // signup with credentials
  }

  useEffect(() => {
    console.log("session :>> ", session)
  }, [session])

  useEffect(() => {
    console.log("csrfToken :>> ", csrfToken)
  }, [csrfToken])

  return (
    <>
      <Head>
        <title>Crown Clothing | Authentication</title>
        <meta name="description" content="Online commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <AuthenticationForm
          emailSignInStart={emailSignInStart}
          googleSignInStart={googleSignInStart}
          signUpStart={signUpStart}
        />
      </PageContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const providers = await getProviders()
  const session = await getSession(ctx)
  const csrfToken = await getCsrfToken(ctx)
  return {
    props: { providers, session, csrfToken },
  }
}

export default connect((state: RootStateType) => state)(SigninPage)
