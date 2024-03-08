import React, {useEffect} from "react";
import { Link, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contexts";
import axiosClient from "../axios";





export default function Dashboard() {
const {setCurrentUser, currentUser} = useStateContext()
    useEffect(()=>{
        axiosClient.get('/v1/me').then(({data}) => {
            setCurrentUser(data)
        }).catch((err)=> {
            console.log(err)
        })
      }, [])


  return (
    <div className="display flex">
      <div className="sidebar  gap-3 h-screen flex flex-col py-2  w-64 bg-gray-400">
       
          <Link className=" bg-gray-300 px-10 py-2 text-center" to="/dashboard/stok">
            
            stok
          </Link>
        
       
          <Link className=" bg-gray-300 px-10 py-2 text-center" to="/dashboard/penjualan">
            
            penjualan
          </Link>
        
       
          <Link className=" bg-gray-300 px-10 py-2 text-center" to="/dashboard/pendapatan">
            
            Pendapatan
          </Link>
        
       
          <Link className=" bg-gray-300 px-10 py-2 text-center" to="/dashboard/tenant">
            
            Tenant
          </Link>
        
      </div>

      <div className="div w-full px-40 my-36">
        <Outlet user={setCurrentUser} />
      </div>
    </div>
  );
}
