import { CollectionItem, ShoppingCartItem, ShoppingCart } from "../types"

/**
 * @description converts collection item into cart item
 * @param {object} item  collection item
 * @param {string} cartId shoppping cart ID
 * @returns {object} shopping cart item
 */
export const convertToCartItem = (
  item: CollectionItem,
  cartId: string
): ShoppingCartItem => {
  const { id: collectionItemId, ...restItemData } = item

  return {
    ...restItemData,
    id: collectionItemId,
    collectionItemId,
    cartId,
  }
}

/**
 * @description add shop collection item to a cart
 * @param {object} item collection item to add
 * @param {object} cart user shopping cart
 * @returns {object} updated shopping cart with added item
 */
export const addItemToCart = (
  item: CollectionItem,
  cart: ShoppingCart
): ShoppingCart => {
  let isExistingItem = false
  const newItemsList = cart.items.map((current) => {
    if (current.collectionItemId === item.id) {
      isExistingItem = true
      current.quantity++
    }
    return current
  })

  if (!isExistingItem) {
    const newCartItem = convertToCartItem(item, cart.id)
    newItemsList.push(newCartItem)
  }

  return { ...cart, items: newItemsList }
}

/**
 * @description remove shop collection item from a cart
 * @param {string} itemId collection item ID to remove
 * @param {object} cart user shopping cart
 * @returns {object} updated shopping cart
 */
export const removeItemFromCart = (
  itemId: string,
  cart: ShoppingCart
): ShoppingCart => {
  const newItemsList = cart.items
    .map((current) => {
      if (current.collectionItemId === itemId) {
        current.quantity--
      }
      return current
    })
    .filter((current) => current.quantity > 0)

  return {
    ...cart,
    items: newItemsList,
  }
}
