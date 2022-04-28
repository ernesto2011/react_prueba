/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react";
import {Switch, List, Avatar, Button, Icon, notification, Modal as Md } from "antd";
import NoAvatar  from "../../../assets/img/png/no-avatar.png";
import Modal from "../../Modal/Modal";
import EditUserForm from "./EditUser/editFormUser";
import { getAvatarApi, activateUserApi, deleteUserApi } from "../../../api/user";
import { getAccessTokenApi } from "../../../api/auth";
import ModalUser from "../Users/AddUser/AddUmodal";

import "./ListUser.scss";

const {confirm}= Md;

export default function ListUsers(props){
    const { usersActive, usersInactive, setReloadUsers} = props;
    const [viewUsersActives, setViewUsersActives]= useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModaltitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const addNewUserModal = ()=>{
        setIsVisibleModal(true);
        setModaltitle("Agregar nuevo usuario");
        setModalContent(
            <diV> 
               <ModalUser setIsVisibleModal ={setIsVisibleModal} setReloadUsers={setReloadUsers}></ModalUser>
            </diV>
        )
    }
    return(
        <div className="list-users">
            <div className="list-users__header">
                <div className="list-users__header-switch">
                    <Switch
                        defaultChecked
                        onChange={() => setViewUsersActives(!viewUsersActives)}
                    />
                    <span>
                        {viewUsersActives ? "Usuarios activos" : "Usuarios Inactivos"}
                    </span>
                </div>
                <Button type="primary" icon="plus" onClick={addNewUserModal} >
                    Nuevo usuario
                </Button>
           </div>
            {viewUsersActives ? (
            <UsersActive 
                usersActive={usersActive} 
                setIsVisibleModal={setIsVisibleModal}
                setModaltitle ={ setModaltitle}
                setModalContent ={setModalContent}
                setReloadUsers={setReloadUsers}
            />
            ) : (
            <UsersInactive usersInactive={usersInactive} setReloadUsers={setReloadUsers} />
            )}
            <Modal
                title= {modalTitle}
                isVisible={isVisibleModal}
                setIsVisible= {setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
        
    );
}
function UsersActive(props){
    const {
        usersActive,
        setIsVisibleModal, 
        setModaltitle, 
        setModalContent,
        setReloadUsers
    }=props;
    const editUser = user => {
        setIsVisibleModal(true);
        setModaltitle(`Editar ${user.name ? user.name : "..."} 
                                ${user.lastname ? user.lastname : "..."}`);
        setModalContent(
        <EditUserForm user={user} 
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers = {setReloadUsers} 
        />);
    };
    return(
        <List
        className="users-active"
        itemLayout="horizontal"
        dataSource={usersActive}
        renderItem={user=> <UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers}/>}
        />
    );
}

function UserActive(props){
    const {user, editUser, setReloadUsers}= props;
    const [avatar , setAvatar]= useState(null);

    useEffect(()=>{
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response=>{
                setAvatar(response);
            })
        }else{
            setAvatar(null);
        }
    },[user]);

    const desactivateUser = ()=>{
        const accessToken = getAccessTokenApi();
        activateUserApi(accessToken, user._id, false)
        .then(response=>{
            notification["success"]({
                message: response
            });
            setReloadUsers(true);
        })
        .catch(err =>{
            notification["error"]({
                message: err
            });
        });
    };

    const showDeleteConfirm = ()=>{
        const accessToken= getAccessTokenApi();

        confirm({
            title: "Eliminar usuario",
            content:`¿Estas seguro de eliminar a ${user.email}?`,
            okText: "Confirmar",
            okType: "danger",
            cancelText:"Cancelar",
            onOk(){
                deleteUserApi(accessToken, user._id)
                .then(response =>{
                    notification["success"]({
                        message: response
                    });
                    setReloadUsers(true);
                })
                .catch(err=>{
                    notification["error"]({
                        message: err
                    });
                });
            }
        })
    }

    return(
        <List.Item
        actions={[
            <Button type="primary" onClick={() => editUser(user)}>
                <Icon type="edit"/>
            </Button>,

            <Button type= "danger" onClick={desactivateUser}>
                <Icon type="stop"/>
            </Button>,

            <Button type= "danger" onClick={showDeleteConfirm} >
                <Icon type="delete"/>
            </Button>

        ]}
    >
        <List.Item.Meta
            avatar={<Avatar src={avatar ? avatar : NoAvatar}/>}
            title={`
                ${user.name ? user.name : '...'}
                ${user.lastname ? user.lastname : '...'}
            `}
            description={user.email}
        />
        </List.Item>
    );
}

function UsersInactive(props){
    const {usersInactive, setReloadUsers}= props;
    return(
        <List
        className="users-active"
        itemLayout="horizontal"
        dataSource={usersInactive}
        renderItem={user=> <UserInactive user={user}  setReloadUsers={setReloadUsers}/> }
        />
    );
}

function UserInactive(props){
    const {user, setReloadUsers}= props;
    const [avatar , setAvatar]= useState(null);

    useEffect(()=>{
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response=>{
                setAvatar(response);
            })
        }else{
            setAvatar(null);
        }
    },[user]);
    const showDeleteConfirm = ()=>{
        const accessToken= getAccessTokenApi();

        confirm({
            title: "Eliminar usuario",
            content:`¿Estas seguro de eliminar a ${user.email}?`,
            okText: "Confirmar",
            okType: "danger",
            cancelText:"Cancelar",
            onOk(){
                deleteUserApi(accessToken, user._id)
                .then(response =>{
                    notification["success"]({
                        message: response
                    });
                    setReloadUsers(true);
                })
                .catch(err=>{
                    notification["error"]({
                        message: err
                    });
                });
            }
        })
    }

    const activateUser = ()=>{
        const accessToken = getAccessTokenApi();
        activateUserApi(accessToken, user._id, true)
        .then(response=>{
            notification["success"]({
                message: response
            });
            setReloadUsers(true);
        })
        .catch(err =>{
            notification["error"]({
                message: err
            });
        });
    }

    return(
        <List.Item
                actions={[
                    <Button
                      type="primary"
                      onClick={activateUser}  
                    >
                        <Icon type="check"/>
                    </Button>,
                    
                     <Button 
                     type= "danger"
                     onClick={showDeleteConfirm}
                 >
                     <Icon type="delete"/>

                 </Button>

                ]}
            >
                <List.Item.Meta
                    avatar={<Avatar src={ avatar ? avatar : NoAvatar}/>}
                    title={`
                        ${user.name ? user.name : '...'}
                        ${user.lastname ? user.lastname : '...'}
                    `}
                    description={user.email}
                />
        </List.Item>
    );
}