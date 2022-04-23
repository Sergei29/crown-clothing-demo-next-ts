// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"
import { generateDataSource } from "../../../src/dataSources"
import { PrismaClientSingleton } from "../../../prisma/prisma"
import { ERRORS } from "../../../src/constants"

type UserInput = { name?: string; email?: string; password?: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any>>
) {
  const { name, email, password } = req.body as UserInput

  if (!name || !email || !password) {
    res.status(404).end({
      message: ERRORS.SIGNUP_WRONG_CREDENTIALS,
    })
    return
  }

  try {
    const prisma = PrismaClientSingleton.getInstance()
    const dataSources = generateDataSource(prisma)
    const user = await dataSources.users.getUserByEmail(email)
    if (!!user) {
      res.status(204).end()
      return
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const newUser = await dataSources.users.addNewUser({
      name,
      email,
      password: hashPassword,
    })

    res.status(200).json(newUser)
    res.end()
  } catch (error) {
    res.status(500).end((error as Error).message || ERRORS.SIGNUP_GEN_FAILURE)
  }
}
