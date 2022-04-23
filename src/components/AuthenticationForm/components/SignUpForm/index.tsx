import React, { useState } from "react"
import { useSelector } from "react-redux"
import FormInput from "../FormInput"
import CustomButton from "../../../CustomButton"
import { RootStateType, UserState } from "../../../../types"
import { ERRORS } from "../../../../constants"
import { SignUpContainer, TitleContainer } from "./styles"

type Props = { signUpStart: (...args: any[]) => void }

const SignUpForm = ({ signUpStart }: Props): JSX.Element => {
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const { currentUser, loading, error } = useSelector<RootStateType, UserState>(
    (state) => state.user
  )

  const { name, email, password, confirmPassword } = userCredentials

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      alert("passwords don't match.")
      return
    }

    signUpStart({ email, password, name })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUserCredentials({ ...userCredentials, [name]: value })
  }

  if (error === ERRORS.SIGNUP_USER_EXISTS) {
    return (
      <SignUpContainer>
        <TitleContainer>{ERRORS.SIGNUP_USER_EXISTS}</TitleContainer>
      </SignUpContainer>
    )
  }

  if (!!currentUser) {
    return (
      <SignUpContainer>
        <TitleContainer>User registered. Please, sign in.</TitleContainer>
      </SignUpContainer>
    )
  }

  return (
    <SignUpContainer>
      {loading ? (
        <TitleContainer>Signing up...</TitleContainer>
      ) : (
        <>
          <TitleContainer>I do not have an account</TitleContainer>
          <span>Sign up with your email and password</span>
          <form onSubmit={handleSubmit} className="sign-up-form">
            <FormInput
              type="text"
              name="name"
              value={name}
              required
              handleChange={handleChange}
              label="Display Name"
            />
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
            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              required
              handleChange={handleChange}
              label="Confirm password"
            />
            <CustomButton type="submit">SIGN UP</CustomButton>
          </form>
        </>
      )}
      {error && <span>Sorry, there is an error: {error}.</span>}
    </SignUpContainer>
  )
}

export default SignUpForm
