import { NextApiHandler } from "next"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
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
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        if (!credentials) return null
        const user = await dataSource.users.getUserByEmail(credentials.email)
        if (!!user && user.password === credentials.password) {
          return user
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("cb/signIn/user", user)
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token, user }) {
      console.log("cb/session/user: ", user)
      console.log("cb/session/session: ", session)

      // add user to db ( if new user )

      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("cb/jwt/user: ", user)
      return token
    },
  },
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default authHandler
