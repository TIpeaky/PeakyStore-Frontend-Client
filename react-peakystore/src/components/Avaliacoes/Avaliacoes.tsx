import React, { useEffect } from 'react'
import { useState } from 'react'
import { Rating, Box } from "@mui/material";
import { Star } from "@mui/icons-material";
import styles from './Avaliacoes.module.scss'
import { IAvaliation } from '../../interfaces/IAvaliation';
import http from "../../http";
import { IProduct } from '../../interfaces/IProduct';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { initialState } from '../../store/customizationReducer';




interface avaliacoesInterface {
    product: IProduct
}


const Avaliacoes = ({ product }: avaliacoesInterface) => {
    const [avaliation, setAvaliation] = useState<IAvaliation[]>([])
    const [starMedia, setStarMedia] = useState<number>(0)

    useEffect(() => {

        http.get("avaliation/" + product?.id)
            .then(response => {
                setAvaliation(response.data)

                calcularMedia(response.data)


            }).catch(error => {
                console.log(error)
            })


    }, [product])

    const calcularMedia = (avaliacoes: IAvaliation[]) => {
        console.log(avaliacoes)
        let starMediaTemp = 0
        avaliacoes.forEach((avaliation: IAvaliation) => {
            starMediaTemp += avaliation.stars
        })
        starMediaTemp /= avaliacoes.length
        setStarMedia(starMediaTemp)

    }

    const labels: { [index: string]: string } = {
        1: 'Muito ruim',
        2: 'Ruim',
        3: 'Razoável',
        4: 'Bom',
        5: 'Muito bom'

    }

    const [value, setValue] = useState<number | null>(2)
    const [hover, setHover] = useState(-1)


    const clientInitial = (name: string) => {
        return {
            sx: {
                bgcolor: "#004563",
            },
            children: initials(name)

        };
    }

    function initials(fullName: string) {



        let arrName = fullName.split(" ");
        let iniName = fullName.charAt(0);
        let iniLname = arrName[arrName.length - 1].charAt(0);


        return iniName + iniLname;

    }



    return (
        <div className={styles.container_avaliations}>

            <h1>
                Avaliações 
                <Rating className={styles.rating}
                    name="hover-feedback"
                    readOnly
                    value={starMedia}
                    precision = {0.1}
                    size="large"
                />

            </h1>

            {avaliation.length !== 0 ? (
                <div>
                    {avaliation.map(avaliation => (
                        <div className={styles.avaliation_container_item}>

                            <div>
                                <Stack direction="row" spacing={2}>
                                    <Avatar {...clientInitial(avaliation.userName)}
                                        sx={{ width: 60, height: 60 }}
                                    />

                                </Stack>
                            </div>
                            <div className={styles.avaliation_info}>
                                <Rating
                                    name="hover-feedback"
                                    readOnly
                                    value={avaliation.stars}
                                    emptyIcon={<Star style={{ opacity: 0.5 }} fontSize="inherit" />}
                                />
                                <p className={styles.avaliation_userName}>{avaliation.userName}</p>
                                <p className={styles.avaliation_comment}>{avaliation.comment}</p>
                            </div>




                        </div>
                    ))}

                </div>

            ) : (

                <div>

                    <h1>Ainda não há avaliações</h1>

                </div>

            )}



        </div>

    )
}
export default Avaliacoes