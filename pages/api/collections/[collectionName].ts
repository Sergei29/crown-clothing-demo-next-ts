// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { generateDataSource } from "../../../src/dataSources"
import { PrismaClient } from "@prisma/client"
import { CollectionName } from "../../../src/types"

const NAMES = ["mens", "hats", "jackets", "sneakers", "hats", "womens"]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any>>
) {
  const { collectionName } = req.query
  const prisma = new PrismaClient()
  const dataSource = generateDataSource(prisma)
  if (
    Array.isArray(collectionName) ||
    !collectionName ||
    !NAMES.includes(collectionName as string)
  ) {
    res.status(404).end("Wrong collection name")
    return
  }

  const collection = await dataSource.collections.getCollectionByName(
    collectionName as CollectionName
  )

  res.status(200).json(collection!)
}
