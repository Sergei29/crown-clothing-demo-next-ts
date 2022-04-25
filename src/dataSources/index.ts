import { PrismaClient, ShoppingCartItem } from "@prisma/client"
import {
  CollectionName,
  CollectionItem,
  User,
  UserInput,
  ShoppingCart,
} from "../types"

export const generateCollectionsDataSource = (prisma: PrismaClient) => ({
  getCollectionsIndex: async () => await prisma.collection.findMany(),
  getCollections: async () => {
    const collections = await prisma.collection.findMany()
    const newCollections = Promise.all(
      collections.map(async (col) => {
        const items = await prisma.collectionItem.findMany({
          where: {
            collectionId: col?.id,
          },
        })
        return { ...col, items }
      })
    )
    return newCollections
  },

  getCollectionByName: async (name: CollectionName) => {
    const collection = await prisma.collection.findUnique({
      where: { title: name },
    })
    const items = await prisma.collectionItem.findMany({
      where: {
        collectionId: collection?.id,
      },
    })
    return { ...collection, items }
  },
})

export const generateCollectionItemsDataSource = (prisma: PrismaClient) => ({
  getCollectionItems: async () => await prisma.collectionItem.findMany(),

  getCollectionItemById: async (id: string) =>
    await prisma.collectionItem.findUnique({
      where: { id },
    }),
})

export const generateShoppingCartDataSource = (prisma: PrismaClient) => ({
  getShoppingCartByUserId: async (userId: string) => {
    const existingCart = await prisma.shoppingCart.findUnique({
      where: {
        userId,
      },
    })
    // IF EXISTING:
    if (!!existingCart) {
      const items = await prisma.shoppingCartItem.findMany({
        where: {
          cartId: existingCart.id,
        },
      })
      return { ...existingCart, items } as ShoppingCart
    }

    // IF NEW:
    const newCart = await prisma.shoppingCart.create({
      data: {
        userId,
      },
    })

    return { ...newCart, items: [] } as ShoppingCart
  },

  getShoppingCarts: async () => await prisma.shoppingCart.findMany(),

  async addItemToShoppingCart(newItem: CollectionItem, userId: string) {
    const cart = await this.getShoppingCartByUserId(userId)

    const existingItem = await prisma.shoppingCartItem.findUnique({
      where: {
        collectionItemId: newItem.id,
      },
    })

    if (!!existingItem) {
      await prisma.shoppingCartItem.update({
        where: { id: existingItem.id },
        data: {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        },
      })
    } else {
      await prisma.shoppingCartItem.create({
        data: {
          imageUrl: newItem.imageUrl,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          collectionItemId: newItem.id,
          cartId: cart.id,
        },
      })
    }

    return await prisma.shoppingCart.findUnique({ where: { userId } })
  },

  removeItemFromShoppingCart: async (
    cartId: string,
    shoppingItemId: string
  ) => {
    const existingItem = await prisma.shoppingCartItem.findUnique({
      where: {
        id: shoppingItemId,
      },
    })

    if (!!existingItem && existingItem.quantity > 1) {
      await prisma.shoppingCartItem.update({
        where: {
          id: shoppingItemId,
        },
        data: {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        },
      })
    } else if (!!existingItem) {
      await prisma.shoppingCartItem.delete({
        where: {
          id: shoppingItemId,
        },
      })
    }

    return await prisma.shoppingCart.findUnique({ where: { id: cartId } })
  },

  deleteShoppingCart: async (cartId: string) => {
    const cart = await prisma.shoppingCart.findUnique({ where: { id: cartId } })
    if (!cart) return null

    const cartDeleted = await prisma.shoppingCart.delete({
      where: {
        id: cartId,
      },
    })
    await prisma.shoppingCartItem.deleteMany({
      where: {
        cartId,
      },
    })

    return cartDeleted.id
  },

  // create many shopping cart items - rewrite the existing cart items to the new ones
  createManyCartItems: async (
    cartItems: ShoppingCartItem[],
    cartId: string
  ) => {
    await prisma.shoppingCartItem.deleteMany({
      where: {
        cartId,
      },
    })
    const itemsInputData = cartItems.map((item) => {
      const { id, createdAt, updatedAt, ...restCartItem } = item
      return restCartItem
    })

    const newCartItems = await Promise.all(
      itemsInputData.map((inputData) =>
        prisma.shoppingCartItem.create({
          data: inputData,
        })
      )
    )

    return newCartItems
  },

  // update shopping cart (eg. on user logout to save for next time)
  async updateShoppingCart(cart: ShoppingCart) {
    const newCartItems = await this.createManyCartItems(cart.items, cart.id)
    const newCart = { ...cart, items: newCartItems }

    return await prisma.shoppingCart.update({
      where: { id: cart.id },
      data: { ...newCart },
    })
  },
})

export const generateUsersDataSource = (prisma: PrismaClient) => ({
  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } })
  },
  async getUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } })
  },
  async deleteUserById(id: string) {
    return await prisma.user.delete({ where: { id } })
  },
  async addNewUser(userInput: UserInput) {
    return await prisma.user.create({ data: { ...userInput } })
  },
})

export const generateDataSource = (prisma: PrismaClient) => ({
  collections: generateCollectionsDataSource(prisma),
  collectionItem: generateCollectionItemsDataSource(prisma),
  cart: generateShoppingCartDataSource(prisma),
  users: generateUsersDataSource(prisma),
})

// export const dataSource = generateDataSource(prisma)
