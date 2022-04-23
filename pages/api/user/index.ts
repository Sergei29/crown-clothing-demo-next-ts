// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { generateDataSource } from "../../../src/dataSources"
import { PrismaClientSingleton } from "../../../prisma/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any>>
) {
  if (req.method !== "POST") {
    res.status(404).end("Use POST method. Data payload: {name, email}")
  }
  try {
    const { name, email } = req.body
    const prisma = PrismaClientSingleton.getInstance()
    const dataSources = generateDataSource(prisma)
    let userFound = await dataSources.users.getUserByEmail(email as string)
    if (!userFound) {
      userFound = await dataSources.users.addNewUser({ name, email })
    }

    res
      .status(200)
      .json({ id: userFound.id, name: userFound.name, email: userFound.email })
    res.end()
  } catch (error) {
    res
      .status(500)
      .end((error as Error).message || "Failed to fetch collections")
  }
}
