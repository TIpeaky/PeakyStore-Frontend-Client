import { ICartItemPurchase } from "./ICartItemPurchase"

export interface ICartPurchase {
    id : string
    cartItemList : ICartItemPurchase[]
    totalValue : number
}