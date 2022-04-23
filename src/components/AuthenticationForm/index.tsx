import React from "react"
import SignInForm from "./components/SignInForm"
import SignUpForm from "./components/SignUpForm"
import { SignInAndSignUpContainer } from "./styles"

export type SignUpData = {
  email: string
  password: string
  name: string
}

type Props = {
  googleSignInStart: () => void
  emailSignInStart: (email: string, password: string) => void
  signUpStart: ({ email, password, name }: SignUpData) => void
}

const AuthenticationForm = ({
  emailSignInStart,
  googleSignInStart,
  signUpStart,
}: Props) => {
  return (
    <SignInAndSignUpContainer>
      <SignInForm
        emailSignInStart={emailSignInStart}
        googleSignInStart={googleSignInStart}
      />
      <SignUpForm signUpStart={signUpStart} />
    </SignInAndSignUpContainer>
  )
}

export default AuthenticationForm
