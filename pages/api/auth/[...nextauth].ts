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
} from "../../../src/constants"

const prisma = PrismaClientSingleton.getInstance()
const dataSource = generateDataSource(prisma)

const options: NextAuthOptions = {
  jwt: {
    secret: JWT_SECRET,
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
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("cb/signIn: ", {
        user,
        account,
        profile,
        email,
        credentials,
      })
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token, user }) {
      console.log("cb/session: ", { session, token, user })

      // add user to db ( if new user )
      if (!!session.user && session.user.email) {
        const userFound = await dataSource.users.getUserByEmail(
          session.user.email
        )

        if (!userFound) {
          const name = session.user.name || "Guest"
          const email = session.user?.email
          await dataSource.users.addNewUser({ name, email })
        }
      }

      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("cb/jwt: ", { token, user, account, profile, isNewUser })
      return token
    },
  },
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default authHandler
