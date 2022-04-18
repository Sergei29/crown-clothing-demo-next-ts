// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { generateDataSource } from "../../../src/dataSources"
import { PrismaClientSingleton } from "../../../prisma/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any>[]>
) {
  try {
    const prisma = PrismaClientSingleton.getInstance()
    const dataSources = generateDataSource(prisma)
    const collections = await dataSources.collections.getCollections()
    res.status(200).json(collections)
    res.end()
  } catch (error) {
    res
      .status(500)
      .end((error as Error).message || "Failed to fetch collections")
  }
}
