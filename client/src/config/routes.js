import LayoutAdmin from "../layouts/LayoutAdmin";
// eslint-disable-next-line no-unused-vars
import LayoutBasic from "../layouts/LayoutBasic";

//Admin page
import AdminHome from '../pages/Admin';
import AdminSignIn from '../pages/Admin/SignIn';
import AdminUsers from '../pages/Admin/Users';
import Empleados from '../pages/Admin/empleados';

/*
import Home from "../pages/Home";
import Contact from '../pages/contact';
*/
//pages extras
import Error404 from "../pages/Error404"; 

const routes =[
    {
        path: "/",
        component: LayoutAdmin,
        exact: false,
        routes:[
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSignIn,
                exact: true
            },
            {
                path: "/admin/users",
                component: AdminUsers,
                exact: true
            },
            {
                path: "/admin/empleados",
                component: Empleados,
                exact: true  
            },
            {
                path: "/admin/proveedores",
                component: "",
                exact: true
            },
            {
                path: "/admin/clientes",
                component: "",
                exact: true
            },
            {
                path: "/admin/inventarios",
                component: "",
                exact: true
            },
            {
                component: Error404
            }
        ]
    }/*,
    {
        path:"/",
        component:LayoutBasic,
        exact:false,
        routes:[
            {
                path:"/",
                component: Home,
                exact: true
            },
            {
                path:"/contact",
                component: Contact,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }*/
];

export default routes;