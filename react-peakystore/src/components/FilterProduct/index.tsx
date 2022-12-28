import { Collapse } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import http from "../../http";
import { maskPrice } from '../../Util/Mask';
import styles from "./FilterProduct.module.scss";

export interface IOpcao {
  id: number;
  name: string;
}

export interface ISelect {
  name: string;
}

export interface Props {
  filtro: number | null;
  setFiltro: React.Dispatch<React.SetStateAction<number | null>>;
}

function FilterProduct({onAddFilter}: any, { filtro, setFiltro }: Props) {
  const [checkedCategory, setCheckedCategory] = useState(false);
  const [checkedSize, setCheckedSize] = useState(false);
  const [checkedProductBrand, setCheckedProductBrand] = useState(false);
  const [checkedColor, setCheckedColor] = useState(false);

  const [collapseCategory, setCollapseCategory] = useState<string>("+ ver mais");
  const [collapseSize, setCollapseSize] = useState("+ ver mais");
  const [collapseProductBrand, setCollapseProductBrand] = useState("+ ver mais");
  const [collapseColor, setCollapseColor] = useState("+ ver mais");

  const [categorys, setCategorys] = useState<IOpcao[]>([]);
  const [sizes, setSizes] = useState<IOpcao[]>([]);
  const [productBrands, setProductBrands] = useState<IOpcao[]>([]);
  const [sections, setSections] = useState<IOpcao[]>([]);
  const [colors, setColors] = useState<IOpcao[]>([]);

  const [categoryFormList, setCategoryFormList] = useState<ISelect[]>([]);
  const [sizeFormList, setSizeFormList] = useState<ISelect[]>([]);
  const [productBrandFormList, setProductBrandFormList] = useState<ISelect[]>([]);
  const [sectionFormList, setSectionFormList] = useState<ISelect[]>([]);
  const [colorFormList, setColorFormList] = useState<ISelect[]>([]);


  const [MaxPrice, setMaxPrice] = useState("");
  const [MinPrice, setMinPrice] = useState("");

  useEffect(() => {
    http
      .get<{ 
        category: IOpcao[], 
        size: IOpcao[], 
        productBrand: IOpcao[],
        section: IOpcao[],
        color: IOpcao[],
      }>("product/teste")
      .then((resposta) => {
        setCategorys(resposta.data.category);
        setSizes(resposta.data.size);
        setProductBrands(resposta.data.productBrand);
        setSections(resposta.data.section);
        setColors(resposta.data.color);
      })
      .catch((erro) => {
        if (erro?.response?.data?.message) {
          alert(erro.response.data.message);
        } else {
          alert(
            "Aconteceu um erro inesperado! Entre em contato com o suporte!"
          );
        }
      });
  }, []);

  const filter = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const filter = {
        categoryFormList,
        sizeFormList,
        productBrandFormList,
        sectionFormList,
        colorFormList,
    };

    onAddFilter(filter);
  };

  function handleClick(opcao: IOpcao) {
    if (filtro === opcao.id) return setFiltro(null);
    return setFiltro(opcao.id);
  }

  function handleChangeCollapse(
    checked: boolean,
    setchecked: React.Dispatch<React.SetStateAction<boolean>>,
    setcollapse: any
  ) {
    setchecked((prev) => !prev);
    if (checked) {
      setcollapse("+ ver mais");
    } else {
      setcollapse("- ver menos");
    }
  }

  function handleChangeMaskMaxPrice (event: any) {
    const { value } = event.target

    setMaxPrice(maskPrice(value))
  }

  function handleChangeMaskMinPrice (event: any) {
    const { value } = event.target

    setMinPrice(maskPrice(value))
  }

  const handleChange = (
    evento: ChangeEvent<HTMLInputElement>,
    setInput: Dispatch<SetStateAction<ISelect[]>>,
    ) => {
      setInput((prevState: ISelect[]) => {
        let exist: boolean = false;
  
        prevState.forEach(function (value: { name: any; }) {
          if(value.name == evento.target.value) {
            exist = true;
          }
        })
  
        if(exist) {
          const newArray = [...prevState];
          newArray.splice(prevState.indexOf({name: evento.target.value}), 1);
          return newArray;
        } else {
          return [...prevState, {name: evento.target.value}];
        }
      });
    
  }

  return (
    <section>
        <form onSubmit={filter}>
            <button type="submit" className={styles.filter_product__button__submit}>
                Filtrar
            </button>
            <div className={styles.filter_product}>
                <h5 className={styles.filter_product__title}>Categorias</h5>
                <Collapse
                orientation="vertical"
                in={checkedCategory}
                collapsedSize={142}
                >
                {categorys.map((opcao) => (
                    <div className={styles.filter_product__item}>
                    <input
                        key={opcao.id}
                        type="checkbox"
                        className={styles.filter_product__input}
                        name={opcao.name}
                        value={opcao.name}
                        onClick={() => handleClick(opcao)}
                        onChange={(evento) => handleChange(evento, setCategoryFormList)}
                    />
                    <label
                        htmlFor={opcao.name}
                        className={styles.filter_product__label}
                    >
                        {opcao.name}
                    </label>
                    </div>
                ))}
                </Collapse>
                <button
                onClick={() =>
                    handleChangeCollapse(
                    checkedCategory,
                    setCheckedCategory,
                    setCollapseCategory
                    )
                }
                className={styles.filter_product__button}
                >
                {collapseCategory}
                </button>

                <h5 className={styles.filter_product__title}>Tamanhos</h5>
                <Collapse orientation="vertical" in={checkedSize} collapsedSize={142}>
                {sizes.map((opcao) => (
                    <div className={styles.filter_product__item}>
                    <input
                        key={opcao.id}
                        type="checkbox"
                        className={styles.filter_product__input}
                        name={opcao.name}
                        value={opcao.name}
                        onClick={() => handleClick(opcao)}
                        onChange={(evento) => handleChange(evento, setSizeFormList)}
                    />
                    <label
                        htmlFor={opcao.name}
                        className={styles.filter_product__label}
                    >
                        {opcao.name}
                    </label>
                    </div>
                ))}
                </Collapse>
                <button
                onClick={() =>
                    handleChangeCollapse(checkedSize, setCheckedSize, setCollapseSize)
                }
                className={styles.filter_product__button}
                >
                {collapseSize}
                </button>

                
                <h5 className={styles.filter_product__title}>Cores</h5>
                <Collapse orientation="vertical" in={checkedColor} collapsedSize={142}>
                    {colors.map((opcao) => (
                        <div className={styles.filter_product__item}>
                        <input
                            key={opcao.id}
                            type="checkbox"
                            className={styles.filter_product__input}
                            name={opcao.name}
                            value={opcao.name}
                            onClick={() => handleClick(opcao)}
                            onChange={(evento) => handleChange(evento, setColorFormList)}
                        />
                        <label
                            htmlFor={opcao.name}
                            className={styles.filter_product__label}
                        >
                            {opcao.name}
                        </label>
                        </div>
                    ))}
                </Collapse>
                <button
                    onClick={() =>
                        handleChangeCollapse(
                            checkedColor, 
                            setCheckedColor, 
                            setCollapseColor
                        )
                    }
                    className={styles.filter_product__button}
                    >
                    {collapseColor}
                </button>

                <section className={styles.filter_product__preco}>
                <h5 className={styles.filter_product__title}>Preços</h5>
                <div className={styles.filter_product__item}>
                    <label className={styles.filter_product__preco__label}>Max: R$</label>
                    <input 
                    placeholder="0,00"
                    value={MaxPrice}
                    onChange={handleChangeMaskMaxPrice}
                    className={styles.filter_product__preco__input}></input>
                </div>
                <div className={styles.filter_product__item}>
                    <label className={styles.filter_product__preco__label}>Min: R$</label>
                    <input 
                    placeholder="0,00" 
                    value={MinPrice}
                    onChange={handleChangeMaskMinPrice}
                    className={styles.filter_product__preco__input}></input>
                </div>
                </section>

                <section className={styles.filter_product__preco}>
                <h5 className={styles.filter_product__title}>Gêneros</h5>
                {sections.map((opcao) => (
                    <div className={styles.filter_product__item}>
                    <input
                        key={opcao.id}
                        type="checkbox"
                        className={styles.filter_product__input}
                        name={opcao.name}
                        value={opcao.name}
                        onClick={() => handleClick(opcao)}
                        onChange={(evento) => handleChange(evento, setSectionFormList)}
                    />
                    <label
                        htmlFor={opcao.name}
                        className={styles.filter_product__label}
                    >
                        {opcao.name}
                    </label>
                    </div>
                ))}
                </section>

                
                <h5 className={styles.filter_product__title}>Marcas</h5>
                <Collapse orientation="vertical" in={checkedProductBrand} collapsedSize={142}>
                    {productBrands.map((opcao) => (
                        <div className={styles.filter_product__item}>
                        <input
                            key={opcao.id}
                            type="checkbox"
                            className={styles.filter_product__input}
                            name={opcao.name}
                            value={opcao.name}
                            onClick={() => handleClick(opcao)}
                            onChange={(evento) => handleChange(evento, setProductBrandFormList)}
                        />
                        <label
                            htmlFor={opcao.name}
                            className={styles.filter_product__label}
                        >
                            {opcao.name}
                        </label>
                        </div>
                    ))}
                </Collapse>
                <button
                onClick={() =>
                    handleChangeCollapse(checkedProductBrand, setCheckedProductBrand, setCollapseProductBrand)
                }
                className={styles.filter_product__button}
                >
                {collapseProductBrand}
                </button>
            </div>
        </form>
    </section>
  );
}

export default FilterProduct;
