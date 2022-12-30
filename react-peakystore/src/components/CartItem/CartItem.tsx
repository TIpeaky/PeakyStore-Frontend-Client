import { ICartItemPurchase } from "../../interfaces/CartPurchase/ICartItemPurchase";
import styles from "./CartItem.module.scss"
import testImage from "./img_teste.png"
import { useState, useEffect } from "react";
import { translateColor, translateSize } from '../../Util/translate';

const CartItem = (cartItem: ICartItemPurchase) => {
    const [translatedColor, setTranslatedColor] = useState("");
    const [translatedSize, setTranslatedSize] = useState("");

    useEffect(() => {
        setTranslatedColor(translateColor(cartItem.product.color))
        setTranslatedSize(translateSize(cartItem.product.size))       
    }, [cartItem.product.color, cartItem.product.size])



    return (
        <div className={styles.container} key={cartItem.product.id}>
            <div className={styles.product_img}>
                <img src={testImage} alt="Imagem do produto" />
            </div>
            <div className={styles.product_info}>
                <h2>{cartItem.product.name}</h2>
                <div><span>Cor: </span>{translatedColor}</div>
                <div><span>Tamanho: </span>{translatedSize}</div>
                <select name="stock-qtt">
                    {/* for(let i = 0; i<4; i++) tentar criar uma variável com valor e adicionar com o map aqui */}
                </select>
            </div>
            <div className={styles.product_price}>
                {cartItem.product.salePrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </div>
        </div>
    );
};

export default CartItem;