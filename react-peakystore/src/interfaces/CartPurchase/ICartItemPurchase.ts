import { ICartItemProduct } from "./IProductCartItem"

export interface ICartItemPurchase {
    id : string
    quantity : number
    totalPrice : number
    product : ICartItemProduct
}
