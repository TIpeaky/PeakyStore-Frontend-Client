import { useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import { ICartPurchase } from "../../interfaces/CartPurchase/ICartPurchase"

const Cart = () => {

    const [purchase, setPurchase] = useState<ICartPurchase>({
        id: "1",
        cartItemList: [{
            id: "1",
            quantity: 2,
            totalPrice: 10.0,
            product: {
                id: "1",
                name: "Camiseta Branca",
                salePrice: 5.0,
                color: "WHITE",
                size: "XL",
                stockQuantity: 15
            }
        },
        {
            id: "2",
            quantity: 1,
            totalPrice: 15.0,
            product: {
                id: "2",
                name: "Camiseta Preta",
                salePrice: 15.00,
                color: "BLACK",
                size: "M",
                stockQuantity: 6
            }
        }],
        totalValue: 25.0
    }
    );

    return (
        <div>
            <h1>Carrinho de compras</h1>
            {purchase.cartItemList.map((cartItem, index) => (
                <CartItem {...cartItem} key={index}/>
            ))}

        </div>
    );
};

export default Cart;