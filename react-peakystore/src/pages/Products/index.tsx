import { useState, useEffect, ChangeEvent } from "react";

// Style
import styles from "./Products.module.scss";

// Components
import ProductCard from "../../components/ProductCard";
import OrdinationSelector from "../../components/OrdinationSelector";
import http from "../../http";
import FilterProduct from "../../components/FilterProduct";

// MUI Material
import Grid from "@mui/material/Grid";
import { Pagination } from "@mui/material";

// Images
import image_1 from "../../images/Products/Produto - 1.png";
import image_2 from "../../images/Products/jaqueta_jeans.jpg";
import image_3 from "../../images/Products/pijama.jpg";
import image_4 from "../../images/Products/calca_jeans.jpg";
import image_5 from "../../images/Products/meias.jpg";
import image_6 from "../../images/Products/camiseta_listrada.jpg";
import image_7 from "../../images/Products/shorts.jpg";
import image_8 from "../../images/Products/vestido.jpg";

interface productApi {
  category: string;
  color: string;
  description: string;
  id: string;
  lastUpdateDate: string;
  name: string;
  productBrand: string;
  purchasePrice: number;
  salePrice: number;
  section: string;
  size: string;
  sku: string;
  stockQuantity: number;
}

interface filter {
  categoryFormList: [];
  sizeFormList: [];
  productBrandFormList: [];
  sectionFormList: [];
  colorFormList: [];
}

interface select {
  title: string;
  value: string;
}

export interface IOpcao {
  id: number;
  name: string;
}

// ?size=(número de elementos por página)&page=(número da página)

const Products = () => {
  const [products, setProducts] = useState<productApi[]>([]);
  const [pageSize, setPageSize] = useState("20");
  const [pageNumber, setPageNumber] = useState(Number);
  const [totalPages, setTotalPages] = useState(Number);
  const [sort, setSort] = useState("");

  const [color, setColor] = useState([]);
  const [productBrand, setProductBrand] = useState([]);
  const [size, setSize] = useState([]);
  const [category, setCategory] = useState([]);
  const [section, setSection] = useState([]);

  const [filtro, setFiltro] = useState<number | null>(null);

  const [ordList, setOrdList] = useState<select[]>([
    { title: "Preço Crescente", value: "salePrice,asc" },
    { title: "Preço Decrescente", value: "salePrice,desc" },
    { title: "A - Z", value: "name,asc" },
    { title: "Z - A", value: "name,desc" },
  ]);

  const [pageList, setPageList] = useState<select[]>([
    { title: "20 por página", value: "20" },
    { title: "40 por página", value: "40" },
    { title: "60 por página", value: "60" },
    { title: "80 por página", value: "80" },
  ]);

  useEffect(() => {
    const fecthData = async () => {
      http
        .get(
          "/product?pageSize=" +
            pageSize +
            "&pageNumber=" +
            pageNumber +
            "&pageSort=" +
            sort +
            "&color=" +
            color.map((option: IOpcao, position) => option.name.toUpperCase()) +
            "&productBrand=" +
            productBrand.map((option: IOpcao, position) =>
              option.name.toUpperCase()
            ) +
            "&size=" +
            size.map((option: IOpcao, position) => option.name.toUpperCase()) +
            "&category=" +
            category.map((option: IOpcao, position) =>
              option.name.toUpperCase()
            ) +
            "&section=" +
            section.map((option: IOpcao, position) => option.name.toUpperCase())
        )
        .then((response) => {
          setProducts(response.data["content"]);
          setTotalPages(response.data["totalPages"]);
        })
        .catch();
    };
    fecthData();
  }, [
    pageNumber,
    pageSize,
    sort,
    color,
    productBrand,
    size,
    category,
    section,
  ]);

  const changePage = (event: ChangeEvent<unknown>, pagina: number) => {
    setPageNumber(pagina - 1);
  };

  const onChangeOrdSelector = (option: string) => {
    setSort(option);
  };

  const onChangePageSelector = (option: string) => {
    setPageSize(option);
  };

  const onChangeFilter = (filter: filter) => {
    setColor(filter["colorFormList"]);
    setProductBrand(filter["productBrandFormList"]);
    setSize(filter["sizeFormList"]);
    setCategory(filter["categoryFormList"]);
    setSection(filter["sectionFormList"]);

    console.log(color);
    console.log(productBrand);
    console.log(size);
    console.log(category);
    console.log(section);

    color.map((option: IOpcao, position) =>
      console.log(option.name.toUpperCase())
    );
  };

  return (
    <div className={styles.page_products}>
      <div className={styles.container_selectors}>
        <div className={styles.selector}>
          <OrdinationSelector
            onAddOption={onChangePageSelector}
            selectorName="Exibir"
            optionList={pageList}
            label="Exibir"
          />
        </div>

        <div className={styles.selector}>
          <OrdinationSelector
            onAddOption={onChangeOrdSelector}
            selectorName="Ordenação"
            optionList={ordList}
            label="Ordenacao"
          />
        </div>
      </div>

      <div className={styles.container_filter_products}>
        <FilterProduct
          filtro={filtro}
          setFiltro={setFiltro}
          onAddFilter={onChangeFilter}
        />

        <div className={styles.container_products}>
          <Grid
            spacing={3}
            container
            width="85%"
            marginRight="5%"
            marginLeft="1%"
            marginTop="1.7%"
          >
            {products.map(
              (
                product,
                position // Tamanho do array = quantidade de produtos
              ) => (
                <Grid item xs={3} key={position} paddingTop="0px">
                  <div className={styles.card_product}>
                    <ProductCard
                      name={product.name}
                      price={product.salePrice}
                      img={image_1}
                      link="#"
                    />
                  </div>
                </Grid>
              )
            )}
          </Grid>
        </div>
      </div>

      <div className={styles.pagination}>
        <Pagination
          count={totalPages}
          onChange={changePage}
          page={pageNumber + 1}
          color="primary"
        />
      </div>
    </div>
  );
};

export default Products;
