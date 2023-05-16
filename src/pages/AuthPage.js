import React, {useState} from 'react';
import Header from "../components/Header";
import {useCookies} from "react-cookie";
import axios from "axios";
import {auth} from "../utils/beClient";
import {useNavigate} from "react-router-dom";

const AuthPage = () => {
    let [cookies, setCookie] = useCookies(['username', 'access'])
    let nav = useNavigate();

    let [mode, setMode] = useState('log')
    let [err, setErr] = useState('')

    let [name, setName] = useState('')
    let [passwd, setPasswd] = useState('')
    let [passwd2, setPasswd2] = useState('')

    let next = () => {
        if (name === '' || passwd === '') return setErr('Введите данные!')
        if (mode === 'reg' && passwd !== passwd2) return setErr('Пароли не совпадают!')

        auth(name, passwd, mode === 'reg' ? 'signup' : 'login')
            .then(r => {
                let token = r?.data?.accessToken;
                setCookie('username', name, {
                    maxAge: 3600 * 24 * 31
                })
                setCookie('access', token, {
                    maxAge: 3600 * 24 * 31
                })
                nav('/')
            })
    }

    return (
        <>
            <Header selected='auth'/>

            <div className="page">
                <div className="page_content auth_page_content">
                    <div className={err === '' ? "error_block" : "error_block error_block_show"}>
                        <div className="error_block_item">
                            {err}
                        </div>
                    </div>


                    <h1 className="auth_page_title">{mode === 'log' ? 'Авторизация' : 'Регистрация'}</h1>

                    <input type="text" className="auth_page_input" placeholder="Имя пользователя" value={name} onChange={e => setName(e.target.value)}/>

                    <input type="password" className="auth_page_input" placeholder="Пароль" value={passwd} onChange={e => setPasswd(e.target.value)}/>

                    {
                        mode === 'reg' &&
                        <input type="password" className="auth_page_input auth_page_input_new" placeholder="Повторите пароль" value={passwd2} onChange={e => setPasswd2(e.target.value)}/>

                    }

                    <div className="auth_buttons">
                        <button className="auth_page_button" onClick={next}>Далее</button>
                        <button className="auth_page_button auth_page_button2" onClick={() => setMode(mode === 'log' ? 'reg' : 'log')}>{mode === 'log' ? 'Нет аккаунта?' : 'Есть аккаунт?'}</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthPage;