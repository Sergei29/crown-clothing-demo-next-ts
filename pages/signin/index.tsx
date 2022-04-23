import { useEffect } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import { connect, useDispatch, useSelector } from "react-redux"
import {
  signIn,
  getSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers"
import { wrapper } from "../../src/redux/store"
import { registerUser } from "../../src/redux/actions/user"
import { RootStateType, UserState, Store } from "../../src/types"
import PageContainer from "../../src/containers/PageContainer"
import AuthenticationForm, {
  SignUpData,
} from "../../src/components/AuthenticationForm"

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null
}

const SigninPage: NextPage<Props> = ({ providers }) => {
  const { currentUser } = useSelector<RootStateType, UserState>(
    (state) => state.user
  )
  const dispatch = useDispatch()

  const googleSignInStart = async () => {
    if (!providers?.google) return
    await signIn(providers.google.id)
  }
  const emailSignInStart = async (email: string, password: string) => {
    if (!providers?.credentials) return
    await signIn("credentials", { email, password })
  }
  const signUpStart = ({ email, password, name }: SignUpData) => {
    dispatch(registerUser({ email, password, name }))
  }

  useEffect(() => {
    console.log("currentUser :", currentUser)
  }, [currentUser])

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store: Store) => async (ctx) => {
    const providers = await getProviders()
    const session = await getSession(ctx)
    console.log("signin/getServerSideProps/session :>> ", session)

    if (session) {
      return {
        redirect: {
          destination: "/", // Redirect to the home page
          permanent: false,
        },
      }
    }

    return {
      props: { providers, initialReduxState: store.getState() },
    }
  }
)

export default connect((state: RootStateType) => state)(SigninPage)
