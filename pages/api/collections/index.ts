// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { dataSource } from "../../../src/dataSources"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any>[]>
) {
  const { format } = req.query
  if (!!format && format.includes("summary")) {
    const collectionsIndexes =
      await dataSource.collections.getCollectionsIndex()
    res.status(200).json(collectionsIndexes)
    return
  }
  const collections = await dataSource.collections.getCollections()
  res.status(200).json(collections)
}
