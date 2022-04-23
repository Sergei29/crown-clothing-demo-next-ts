export const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL!
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!
export const JWT_SECRET = process.env.JWT_SECRET!
export const SECRET = process.env.SECRET!
export const ERRORS = {
  SIGNUP_USER_EXISTS: "user already exists. Go to sign in",
  SIGNUP_WRONG_CREDENTIALS:
    "Wrong user credentials, expected: name, email, password",
  SIGNUP_GEN_FAILURE: "Failed to register new user",
}
