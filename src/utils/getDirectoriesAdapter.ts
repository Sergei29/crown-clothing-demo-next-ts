import { CollectionSummary, Directory } from "../types"

const order: Record<string, number> = {
  hats: 1,
  jackets: 2,
  sneakers: 3,
  mens: 5,
  womens: 4,
}

const size: Record<string, string> = {
  hats: "medium",
  jackets: "medium",
  sneakers: "medium",
  mens: "large",
  womens: "large",
}

export const getDirectoriesAdapter = (
  collectionIndexes: CollectionSummary[]
): Directory[] =>
  collectionIndexes
    .map((collection) => ({
      ...collection,
      order: order[collection.title],
      size: size[collection.title],
    }))
    .sort((a, b) => a.order - b.order)
