// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { generateDataSource } from "../../../src/dataSources"
import { PrismaClient } from "@prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any>[]>
) {
  const prisma = new PrismaClient()
  const dataSource = generateDataSource(prisma)
  try {
    const collections = await dataSource.collections.getCollections()
    res.status(200).json(collections)
  } catch (error) {
    res
      .status(500)
      .end((error as Error).message || "Failed to fetch collections")
  }
}
