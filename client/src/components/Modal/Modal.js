import React from "react";
import {Modal as Matd} from "antd";

export default function Modal(props){
    const {children, title, isVisible, setIsVisible} = props;
    return(
        <Matd
            title={title}
            centered
            visible = {isVisible}
            onCancel= {() => setIsVisible(false)}
            footer={false}
        >
            {children}

        </Matd>
    );
}