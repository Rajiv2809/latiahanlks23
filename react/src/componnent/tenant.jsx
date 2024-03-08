import React, { useEffect } from 'react'
import { useStateContext } from '../contexts/contexts'
import axiosClient from '../axios';
import { Link } from 'react-router-dom';


export default function tenant() {
    const {currentUser, setTenants, tenants, showToast} = useStateContext();


    useEffect(() => {
        axiosClient.get('/v1/tenant').then(({data}) => {
            setTenants(data)

        }).catch((err) => {
            showToast(err.response.data.message, 'red')
        })
    }, [])


  return (
    <div className="flex flex-col">
        {currentUser.role === "admin" && (
            <Link to='/dashboard/tenant/add' className=" w-40 bg-green-600 px-3 py-2 m-2 text-white font-bold"  > Add tenant +</Link>
            
        )}

      <table>
          <thead>
            <tr>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                ID Tenant
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Nama Tenant
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                detail
              </th>
             
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.IDproduk}>
                
                <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                  {tenant.IDtenant}
                </th>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                  {tenant.namatenant}
                </td>
                <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {tenant.detail}
                </td>
               
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex gap-4">
                    <Link  className='px-3 py-1.5 bg-sky-600 text-white text-sm font-semibold' to={`/dashboard/tenant/detail/${tenant.IDtenant}`} >Detail </Link>
                    {currentUser.role === 'admin' && (
                  <button className='px-3 py-1.5 bg-red-600 text-white text-sm font-semibold' onClick={() => onDelete(tenant.IDtenant)}>Remove</button>
                )}
                  {currentUser.role == 'admin' && (
                    <button >
                        <Link className='px-3 py-1.5 bg-orange-500 text-white text-sm font-semibold' to={`/dashboard/tenant/edit/${tenant.IDtenant}`} >Edit </Link>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>




    </div>
  )
}
