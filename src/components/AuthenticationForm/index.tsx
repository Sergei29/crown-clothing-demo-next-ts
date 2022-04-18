import React from "react"
import SignInForm from "./components/SignInForm"
import SignUpForm from "./components/SignUpForm"
import { SignInAndSignUpContainer } from "./styles"

type SignUpData = { email: string; password: string; displayName: string }
const AuthenticationForm = () => {
  const googleSignInStart = () => {
    // auth login with google
  }
  const emailSignInStart = (email: string, password: string) => {
    // auth login with email and pw
  }
  const signUpStart = ({ email, password, displayName }: SignUpData) => {
    // signup with credentials
  }

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
