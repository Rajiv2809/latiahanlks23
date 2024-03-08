import React from "react";

import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./componnent/GuestLayout";
import Login from './views/login'
import DefaultLayout from "./componnent/DefaultLayout";
import Home from './views/home'
import Dashboard from "./componnent/Dashboard";
import Stok from "./componnent/Stok";
import StokAdd from "./views/StokAdd";
import StokDetail from './views/stokDetail';
import Penjualan from "./componnent/Penjualan";
import PenjualanAdd from "./views/PenjualanAdd";
import PenjulanDetail from "./views/PenjulanDetail";
import Pendapatan from "./componnent/pendapatan";
import PendapatanAdd from "./views/PendapatanAdd";
import Tenant from './componnent/tenant';
import TenantAdd from "./views/TenantAdd";
import PendapatanDetail from './views/PendapatanDetail';


const  router = createBrowserRouter([

    {
        path:'/',
        element:<GuestLayout/>,
        children:[
            {
                path: '/login',
                element: <Login/>
            }
            

        ]
    },
    {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            {
                path:'/home',
                element:<Home/>
            },
            {
                path:'/dashboard',
                element:<Dashboard/>,
                children:[
                    {
                        path:'stok',
                        element:<Stok/>
                    },
                    {
                        path:'stok/add',
                        element: <StokAdd/>
                    },
                    {
                        path:'stok/edit/:id',
                        element:<StokAdd/>
                    },
                    {
                        path:'stok/detail/:id',
                        element: <StokDetail/>
                    },
                    {
                        path:'penjualan',
                        element: <Penjualan/>
                    },
                    {
                        path:'penjualan/add',
                        element:<PenjualanAdd/>
                    },
                    {
                        path:'penjualan/edit/:id',
                        element:<PenjualanAdd/>
                    },
                    {
                        path:'penjualan/detail/:id',
                        element: <PenjulanDetail/>
                    },
                    {
                        path:'pendapatan',
                        element: <Pendapatan/>
                    },
                    {
                        path:'pendapatan/add',
                        element: <PendapatanAdd/>
                    },
                    {
                        path:'pendapatan/detail/:id',
                        element: <PendapatanDetail/>
                    },
                    {
                        path:'pendapatan/edit/:id',
                        element: <PendapatanAdd/>
                    },
                    {
                        path:'tenant',
                        element:<Tenant/>
                    },
                    {
                        path:'tenant/add',
                        element:<TenantAdd/>
                    },
                    {
                        path:'tenant/edit/:id',
                        element:<TenantAdd/>
                    }
                ]
            }
        ]
    }



])


export default router

