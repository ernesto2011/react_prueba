import React from 'react';
import { useState } from 'react';
import { signInApi } from '../../../api/user';
import { ACCESS_TOKEN,REFRESH_TOKEN } from '../../../utils/constants';
import { Form, Icon, Input, Button, notification } from 'antd';
import {
    emailValidation,
    minLengthValidation
} from '../../../utils/formValidation';

import './LoginForm.scss';

export default function LoginForm(){
    const [inputs, setInputs] = useState({
        email:"",
        password:""
    });

    const [formValid, setFormValid]=useState({
        email:false,
        password:false,
        repeatPassword:false,
        privacyPolicy:false
    });
    const changeForm = e =>{
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    };
    const inputValidation = e =>{
        const {type, name} = e.target;
        if (type === "email") {
            setFormValid({...formValid, [name]: emailValidation(e.target) });
        } 
        if (type === "password"){
            setFormValid({...formValid, [name]: minLengthValidation(e.target, 6) });
        }
    
    };
    const login =  async e =>{
        e.preventDefault();
        const emailVal = inputs.email;
        const passwordVal = inputs.password;

        if (!emailVal || !passwordVal) {
            notification['error']({
                message: "Todos los campos son obligatorios"
            });
            
        }else{
            const result = await signInApi(inputs);

        if (result.message) {
            notification["error"]({
                message: result.message
            });    
        } else{
            const{accessToken, refreshToken} = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN,refreshToken);
            notification["success"]({
                message:"Acceso correcto."
            });
            window.location.href="/admin";
        }
        }

        
    };
    return (
        <Form className="login-form" onChange={changeForm} onSubmit={login}>
            <Form.Item>
                <Input
                    prefix={<Icon type="user" style={{color:"rgba(0,0,0,.25)"}}/>}
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="login-form__input"
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type="lock" style={{color:"rgba(0,0,0,.25)"}}/>}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="login-form__input"
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="login-form__button">
                    Entrar
                </Button>
            </Form.Item>
        
        </Form>
    )
}