import ProductCard from "../../components/ProductCard";
import image_1 from "../../images/Products/Produto - 1.png";
import image_2 from "../../images/Products/jaqueta_jeans.jpg";
import image_3 from "../../images/Products/pijama.jpg";
import image_4 from "../../images/Products/calca_jeans.jpg";
import image_5 from "../../images/Products/meias.jpg";
import image_6 from "../../images/Products/camiseta_listrada.jpg";
import image_7 from "../../images/Products/shorts.jpg";
import image_8 from "../../images/Products/vestido.jpg";
import styles from "./Products.module.scss";

const Products = () => {
  return (
    <div className={styles.page}>
      <section className={styles.container_products}>

        <ProductCard name="Camiseta Peak" price="49,90" img={image_1} link="#" />
        <ProductCard name="Pijama Peak" price="49,90" img={image_3} link="#" />
        <ProductCard name="Calça Peak" price="49,90" img={image_4} link="#" />
        <ProductCard name="Jaqueta Peak" price="49,90" img={image_2} link="#" />
        <ProductCard name="Meias Peak" price="49,90" img={image_5} link="#" />
        <ProductCard name="Camiseta Listrada Peak" price="49,90" img={image_6} link="#" />
        <ProductCard name="Shorts" price="49,90" img={image_7} link="#" />
        <ProductCard name="Vestido" price="49,90" img={image_8} link="#" />
      </section>
    </div>
  );
};

export default Products;
