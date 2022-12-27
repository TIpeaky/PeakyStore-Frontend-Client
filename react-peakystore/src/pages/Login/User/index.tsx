import React, { useState, useEffect } from 'react';
import { AbBotao } from '../../../components/AbBotao';
import http from "../../../http"
import Logo from "./../../../images/PeakyStore.png"
import { AbCampoTexto } from '../../../components/AbCampoTexto';
import styled from './Login.module.scss';
import { useNavigate } from 'react-router-dom';

const LoginUsuario = () => {
    let navigate = useNavigate()


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //verificar se o usuário já está logado
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            navigate(-1)
        }
    }, [navigate])

    const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        const usuario = {
            username,
            password,
        }

        http.post('auth', usuario)
            .then(resposta => {
                sessionStorage.setItem('token', resposta.data.token)
                sessionStorage.setItem('name', resposta.data.name)
                setUsername('')
                setPassword('')
                navigate(-2)
            })
            .catch(erro => {
                if (erro?.response?.data?.message) {
                    alert(erro.response.data.message)
                } else {
                    alert('Aconteceu um erro inesperado ao afetuar o seu login! Entre em contato com o suporte!')
                }

            })
    }

    return (
        <div className={styled.login__background}>
            <section className={styled.login} >
                <figure>
                    <img className={styled.login__img} src={Logo} alt="Logo da empresa e seu nome" />
                </figure>
                <div className={styled.login__block}></div>
                <form onSubmit={aoSubmeterFormular}>
                    <h2>
                        Já sou Cliente
                    </h2>
                    <AbCampoTexto
                        label="E-mail"
                        value={username}
                        placeholder="Entre com o seu E-mail aqui"
                        onChange={setUsername}
                        type="email"
                    />
                    <AbCampoTexto
                        label="Senha"
                        value={password}
                        onChange={setPassword}
                        placeholder="Entre com o sua senha aqui"
                        type="password"
                    />
                    <div className={styled.login__singIn__forgotPassword}>
                        <a href=''>Esqueceu sua senha?</a>
                    </div>

                    <AbBotao texto="Entrar" />

                    <div className={styled.login__singIn__register} >
                        Ainda não tem conta? <a href=''> Cadastrar</a>
                    </div>
                </form>
            </section>
        </div>)
}

export default LoginUsuario;