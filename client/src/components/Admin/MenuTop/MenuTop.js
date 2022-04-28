// eslint-disable-next-line
import React from "react";
import {Button, Icon} from "antd";
import Logo from '../../../assets/img/png/grupo_icaro.png'
import {logout} from '../../../api/auth';

import "./MenuTop.scss";

export default function MenuTop(props){
    const {menuCollapsed, setMenuCollapsed } = props;

    const logoutUser = () =>{
        logout();
        window.location.reload();
    };

    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img className="menu-top__left-logo"
                src={Logo}
                alt="Grupo Icaro"
                />
                <Button type="link" onClick={()=> setMenuCollapsed(!menuCollapsed)} >
                <Icon  type={menuCollapsed?"menu-unfold" : "menu-fold"} />
                </Button>
                
            </div>
            <div className="menu-top__right">
            <Button type="link" onClick={logoutUser} >
                <Icon type="poweroff"/>
                </Button>

            </div>

        </div>
    );
}