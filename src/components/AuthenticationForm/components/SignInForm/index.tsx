import React, { useState } from "react"
import FormInput from "../FormInput"
import CustomButton from "../../../CustomButton"

// styled components:
import { SignInContainer, TitleContainer, ButtonsContainer } from "./styles"

type Props = {
  googleSignInStart: (...args: any[]) => void
  emailSignInStart: (email: string, password: string) => void
}

const SignInForm = ({
  googleSignInStart,
  emailSignInStart,
}: Props): JSX.Element => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  const { email, password } = userCredentials

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    emailSignInStart(email, password)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCredentials({ ...userCredentials, [name]: value })
  }

  return (
    <SignInContainer>
      <TitleContainer>I already have an account</TitleContainer>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          required
          handleChange={handleChange}
          label="Email"
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          required
          handleChange={handleChange}
          label="Password"
        />
        <ButtonsContainer>
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Google sign in
          </CustomButton>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
}

export default SignInForm
