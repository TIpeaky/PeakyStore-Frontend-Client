import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IProduct } from '../../interfaces/IProduct'
import styles from './DetalhesProduto.module.scss'
import img1 from './img/Rectangle.png'
import img2 from './img/thumb.jpg'
import img3 from './img/img3.png'
import iconPix from './img/pix.png'
import iconCards from './img/cartoes.png'
import InputMask from "react-input-mask"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import http from "../../http"
import { useNavigate } from 'react-router-dom';
import Avaliacoes from '../../components/Avaliacoes/Avaliacoes'



const DetalhesProduto = () => {
    let navigate = useNavigate()

    const [mainProduct, setMainProduct] = useState<IProduct>()
    const [productList, setProductList] = useState<IProduct[]>([])

    //Buscar produto principal
    const { sku } = useParams();
    useEffect(() => {
        let auxList = productList;
        
        http.get('product/sku/' + sku)
            .then(response => {
                if(response.status === 404) {
                    navigate('/produto')
                }
                setMainProduct(response.data);
                console.log('agora o main product não está mais vazio')
                auxList.push(response.data)
                setProductList(auxList)
                addSize();
                addColors();
            })
            .catch(erro => {
                console.log(erro);
                navigate('/produto')
            })
    }, [])

    //Lista de cores disponíveis
    const [colorList, setColorList] = useState<String[]>([])
    const addColors = () => {
        let auxList: String[] = []
        productList.forEach((produto) => {
            switch (produto.color) {
                case "BLUE": if (!auxList.includes("#0d6efd")) { auxList.push("#0d6efd"); } break;
                case "GREEN": if (!auxList.includes("#198754")) { auxList.push("#198754"); } break;
                case "YELLOW": if (!auxList.includes("#ffc107")) { auxList.push("#ffc107"); } break;
                case "PURPLE": if (!auxList.includes("#6f42c1")) { auxList.push("#6f42c1"); } break;
                case "PINK": if (!auxList.includes("#d63384")) { auxList.push("#d63384"); } break;
                case "RED": if (!auxList.includes("#dc3545")) { auxList.push("#dc3545"); } break;
                case "ORANGE": if (!auxList.includes("#fd7e14")) { auxList.push("#fd7e14"); } break;
                case "BROWN": if (!auxList.includes("#4e342e")) { auxList.push("#4e342e"); } break;
                case "GREY": if (!auxList.includes("#adb5bd")) { auxList.push("#adb5bd"); } break;
                case "WHITE": if (!auxList.includes("#ffffff")) { auxList.push("#ffffff"); } break;
                case "BLACK": if (!auxList.includes("#000000")) { auxList.push("#000000"); } break;
            }
        })
        setColorList(auxList)
    }

    //Lista de tamanhos disponíveis
    const [sizeList, setSizeList] = useState<String[]>([])
    const addSize = () => {
        let auxList: String[] = []
        productList.forEach((produto) => {
            switch (produto.size) {
                case "XS": if (!auxList.includes("PP")) { auxList.push("PP"); } break;
                case "S": if (!auxList.includes("P")) { auxList.push("P"); } break;
                case "M": if (!auxList.includes("M")) { auxList.push("M"); } break;
                case "L": if (!auxList.includes("G")) { auxList.push("G"); } break;
                case "XL": if (!auxList.includes("GG")) { auxList.push("GG"); } break;
                case "XXL": if (!auxList.includes("XG")) { auxList.push("XG"); } break;
            }
        })
        setSizeList(auxList)
    }

    // Eventos de mudança nas imagens
    const [mainImage, setMainImage] = useState<string>(img1);
    const changeImage = (target: any) => {
        const imageUrl: string = target.src;
        setMainImage(imageUrl);
    }

    return (
        <div className={styles.container}>
            <div className={styles.carrousel}>
                <img onClick={(ev) => changeImage(ev.target)} className={styles.miniatura} src={img1} alt="miniatura 1" />
                <img onClick={(ev) => changeImage(ev.target)} className={styles.miniatura} src={img2} alt="miniatura 2" />
                <img onClick={(ev) => changeImage(ev.target)} className={styles.miniatura} src={img3} alt="miniatura 3" />
            </div>

            <div className={styles.right_column}>

                <div className={styles.principal}>
                    <div className={styles.imagem_principal}>
                        <img src={mainImage} alt="imagem_do_produto" />
                    </div>

                    <div className={styles.info_produto}>
                        <h1> {mainProduct?.name}</h1>
                        <div> <span className={styles.preco}> {mainProduct?.salePrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} </span>
                            < img className={styles.icon_pix} src={iconPix} alt="icone_pix" />
                            <span className={styles.divisor}> | </span>
                            < img className={styles.icon_cards} src={iconCards} alt="icone_card" />
                        </div>

                        <div className={styles.container_cor}>
                            <h2>Cor</h2>
                            {colorList.map((cor, index) => (
                                <span style={{ backgroundColor: `${cor}` }} className={styles.color} key={index}>  </span>
                            ))}
                        </div>
                        <div className={styles.container_size}>
                            <h2>Tamanho</h2>
                            {sizeList.map((size, index) => (
                                <span className={styles.size} key={index}>{size}</span>
                            ))}
                        </div>
                        <div className={styles.container_shipping}>
                            <h2 className={styles.shipping} >Calcular Frete</h2>
                            <InputMask className={styles.input_shipping} mask="99999-999" />
                            <button className={styles.button_shipping} >OK</button>
                            <a className={styles.link_shipping} rel="noreferrer" href='https://buscacepinter.correios.com.br/app/endereco/index.php' target="_blank" >Não sabe seu cep?</a>
                        </div>
                        <div className={styles.container_finish}>
                            <button className={styles.btn_cart}><ShoppingCartIcon className={styles.icon_cart} /><AddIcon className={styles.icon_cart} /></button>
                            <button className={styles.btn_finish}>Comprar</button>
                        </div>



                    </div>

                </div>
                <div className={styles.container_description} >
                    <h1>Descrição</h1>
                    <p>{mainProduct?.description}</p>

                    <h3>Características</h3>
                    <ul>
                        <li>Marca: {mainProduct?.productBrand}</li>
                        <li>Categoria: {mainProduct?.category}</li>
                    </ul>
                </div>
                <Avaliacoes product={mainProduct!}/>
            </div>
                 
        </div>

    )
}

export default DetalhesProduto