import { NextApiHandler } from "next"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"
import { PrismaClientSingleton } from "../../../prisma/prisma"
import { generateDataSource } from "../../../src/dataSources"
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_SECRET,
  SECRET,
} from "../../../src/constants"

const prisma = PrismaClientSingleton.getInstance()
const dataSource = generateDataSource(prisma)
const getUserOrCreateNew = async (name: string, email: string) => {
  let userFound: Record<string, any> | null = null
  userFound = await dataSource.users.getUserByEmail(email)

  if (!userFound) {
    userFound = await dataSource.users.addNewUser({ name, email })
  }
  return userFound
}

const options: NextAuthOptions = {
  secret: SECRET,
  jwt: {
    secret: JWT_SECRET,
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials: email and password",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "enter email address",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null

        try {
          const user = await dataSource.users.getUserByEmail(credentials.email)

          if (!user || !user.password) {
            throw new Error(
              "User not registered to login with credentials email/password. Try other sign in method ( Google, etc. )"
            )
          }

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (isMatch) {
            return user
          } else {
            throw new Error("Wrong credentials")
          }
        } catch (error) {
          const errorMessage =
            (error as Error).message ||
            `Failed to authorize user ${credentials.email}`
          throw new Error(errorMessage)
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/404",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async jwt({ token }) {
      // get user / add user to db ( if new user )
      let userFound: Record<string, any> | null = null
      if (!!token.name && !!token.email) {
        userFound = await getUserOrCreateNew(token.name, token.email)
      }

      const newToken = { ...token, sub: userFound?.id || token.sub }
      return newToken
    },

    async session({ session, token, user }) {
      let userFound: Record<string, any> | null = null

      // get user / add user to db ( if new user )
      if (!!session.user && session.user.email) {
        userFound = await getUserOrCreateNew(
          session.user.name || "Guest",
          session.user.email
        )
      }
      const newSession = {
        ...session,
        user: { ...session.user, id: userFound?.id || null },
      }

      return newSession
    },
  },
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default authHandler
