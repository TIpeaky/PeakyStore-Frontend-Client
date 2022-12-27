import React, { useState } from 'react';
import { AbBotao } from '../../components/AbBotao';
import http from "../../http"
import Logo from "./../../images/PeakyStore.png"
import { AbCampoTexto } from '../../components/AbCampoTexto';
import styled from './NewPassword.module.scss';
import { useNavigate } from 'react-router-dom';

const NewPassword = () => {
    let navigate = useNavigate()


    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')    
    const [confirmPassword, setConfirmPassword] = useState('')    

    const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        const usuario = {
            password,
            newPassword,
        }

        if (confirmPassword === newPassword) {
            http.post('user/newPassword', usuario, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
                .then(resposta => {
                    setPassword('')
                    setNewPassword('')
                    alert("Senha alterada com sucesso!")
                    sessionStorage.clear()
                    navigate(-1)
                })
                .catch(erro => {
                    if (erro?.response?.data?.message) {
                        alert(erro.response.data.message)
                    } else {
                        alert('Aconteceu um erro inesperado ao alterar a sua senha! Entre em contato com o suporte!')
                    }
    
                })
        } else {
            alert("Novas senhas precisam ser iguais")
        }
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
                        Alterar senha
                    </h2>
                    <span className={styled.label} id="senha">Senha</span>
                    <AbCampoTexto
                        value={password}
                        placeholder="Digite a senha anterior"
                        onChange={setPassword}
                        type="password"
                    />
                    <span className={styled.label}>Nova Senha</span>
                    <AbCampoTexto
                        value={newPassword}
                        onChange={setNewPassword}
                        placeholder="Digite a nova senha aqui"
                        type="password"
                    />

                    <span className={styled.label}>Confirmar Nova Senha</span>
                    <AbCampoTexto
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        placeholder="Confirme a nova senha aqui"
                        type="password"
                    />

                    <AbBotao texto="Alterar"/>
                </form>
            </section>
        </div>)
}

export default NewPassword;