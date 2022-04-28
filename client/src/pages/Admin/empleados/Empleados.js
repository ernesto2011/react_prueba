import React from  'react';
// eslint-disable-next-line no-unused-vars
import {Table, Button} from 'antd';
import './Empleados.scss';

function Empleados(){
    const columns=[
        {
            title:"ID",
            dataIndex:"idcolaborador",
            Key:"idcolaborador",
        },
        {
            title:"Colaborador",
            dataIndex:"nombre",
            Key:"nombre",
        },
        {
            title:"Departamento",
            dataIndex:"depto",
            Key:"depto",
        },
        {
            title:"RFC",
            dataIndex:"rfc",
            Key:"rfc",
        },
        {
            title:"NSS",
            dataIndex:"nss",
            Key:"nss",
        },
        {
            title:"Salario Bruto",
            dataIndex:"sb",
            Key:"sb",
        },
        {
            title:"Dirección",
            dataIndex:"address",
            Key:"address",
        },
        {
            title:"Telefono",
            dataIndex:"phone",
            Key:"phone",
        },
        {
            title:"Acciones",
            dataIndex:"actions",
            Key:"actions",
            render: fila => <> <Button type="primary" >Editar</Button>{" "} <Button type="danger" >Eliminar</Button> </>
        }
             
    ]


const dataSource = [
    {
        Key: '1',
        idcolaborador:'ICA-21-1',
        nombre: "Ernesto Lopez Segundo",
        depto:'Sistemas',
        rfc:'LOEV0022',
        nss:'sdasdsWESFDwsc',
        sb:'8000.00',
        address:'priv Miguel Hidalgo,Col el carmen totoltepec,toluca',
        phone:'1234567899'

    },
    {
        Key: '2',
        idcolaborador:'ICA-21-33',
        nombre: "Areli estrella Garcia",
        depto:'Rec humanos',
        rfc:'LOEV0022',
        nss:'sdsdassdc',
        sb:'12000.00',
        address:'paseo tollocan,Col Lomas Altas,toluca',
        phone:'1234567899'

    }

]

return(
    <div className="table-list">
        <Table
        columns={columns}
        dataSource={dataSource}
        />

    </div>
)

};
export default Empleados;