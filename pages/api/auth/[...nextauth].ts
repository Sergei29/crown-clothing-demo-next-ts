import { NextApiHandler } from "next"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Adapters from "next-auth/adapters"
import { PrismaClientSingleton } from "../../../prisma/prisma"
import { generateDataSource } from "../../../src/dataSources"

const prisma = PrismaClientSingleton.getInstance()
const dataSource = generateDataSource(prisma)

const options: NextAuthOptions = {
  providers: [
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
        const user = dataSource.users.getUserByEmail(credentials.email)

        return null
      },
    }),
  ],
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler
