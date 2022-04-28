import React from 'react';
import {Link, withRouter} from "react-router-dom";
import { Layout, Menu, Icon} from "antd";

import './MenuSider.scss';


function MenuSider(props){
     const { SubMenu } = Menu;
     const {menuCollapsed, location}=props;
     const {Sider} = Layout;
     return (
         <Sider className="admin-sider" collapsed={menuCollapsed} >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]} >
                <Menu.Item key="/admin">
                    <Link to={"/admin"} >
                        <Icon type="home"/>
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/users">
                    <Link to={"/admin/users"} >
                        <Icon type="user" />
                        <span className="nav-text" >Usuarios</span>

                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/empleados">
                    <Link to={"/admin/empleados"} >
                        <Icon type="team"/>
                        <span className="nav-text">Empleados</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/proveedores">
                    <Link to={"/admin/proveedores"}>
                        <Icon type="solution"/>
                        <span className="nav-text">Proveedores</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/clientes">
                    <Link to={"/admin/clientes"} >
                        <Icon type="solution"/>
                        <span className="nav-text">Clientes</span>
                    </Link>
                </Menu.Item>
                <SubMenu  title={ <span className="nav-text"> <Icon type="profile"/>Inventarios</span>}>
                
                    <Menu.ItemGroup collapsed={menuCollapsed}>
                    
                        <Menu.Item key="/admin/inventarios/ec">
                            <Link to={"/admin/inventarios/ec"} >
                                <Icon type="laptop"/>
                                <span className="nav-text">Equipo de computo</span>
                            </Link>

                        </Menu.Item>
                        <Menu.Item key="/admin/inventarios/Mp">
                            <Link to={"/admin/inventarios/Mp"} >
                                <Icon type="profile"/>
                                <span className="nav-text">Materia prima</span>
                            </Link>

                        </Menu.Item >
                        <Menu.Item key="/admin/inventarios/Productos">
                            <Link to={"/admin/inventarios/Productos"} >
                                <Icon type="profile"/>
                                <span className="nav-text">Productos</span>
                            </Link>

                        </Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
               
            </Menu>
         </Sider>
     );
 }
 export default withRouter(MenuSider);