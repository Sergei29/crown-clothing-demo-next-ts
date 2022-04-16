// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { generateDataSource } from "../../../src/dataSources"
import { PrismaClient } from "@prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any>[]>
) {
  try {
    const prisma = new PrismaClient()
    const collections = await prisma.collection.findMany()
    res.status(200).json(collections)
    res.end()
  } catch (error) {
    res
      .status(500)
      .end((error as Error).message || "Failed to fetch collections")
  }
}
