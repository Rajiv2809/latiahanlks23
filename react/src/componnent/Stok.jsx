import React, { useEffect } from 'react'
import { useStateContext } from '../contexts/contexts'
import axiosClient from '../axios';
import { Link } from 'react-router-dom';


export default function Stok() {
  const {showToast, stoks, setStoks, currentUser} =useStateContext();

  useEffect(()=> {
    axiosClient.get('/v1/stok').then(({data})=> {
      setStoks(data)

    }).catch((err) => {
      console.log(err)
    })
  }, [])
  const onDelete = (id) => {
    axiosClient.delete(`/v1/stok/${id}`).then(({data}) => {
      const newStok = stoks.filter((stok) => stok.IDproduk !== id);
      setStoks(newStok);
      showToast(data.message)
  
    }).catch((err) => {
      console.log(err)
    })
  }
  
  



  return (
    <div>
      <div className="flex flex-col">
        <Link to='/dashboard/stok/add' className=" w-40 bg-green-600 px-3 py-2 m-2 text-white font-bold"  > Add produk +</Link>
      <div className="stok w-full">
        <table>
          <thead>
            <tr>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                ID Produk
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Nama
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Harga Beli
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Harga Jual
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                stok
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                kategori
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {stoks.map((stok) => (
              <tr key={stok.IDproduk}>
                
                <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                  {stok.IDproduk}
                </th>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                  {stok.nama}
                </td>
                <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {stok.hargabeli}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {stok.hargajual}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {stok.stok}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {stok.kategori}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex gap-4">
                    <Link  className='px-3 py-1.5 bg-sky-600 text-white text-sm font-semibold' to={`/dashboard/stok/detail/${stok.IDproduk}`} >Detail </Link>
                    {currentUser.role === 'admin' && (
                  <button className='px-3 py-1.5 bg-red-600 text-white text-sm font-semibold' onClick={() => onDelete(stok.IDproduk)}>Remove</button>
                )}
                  {currentUser.role == 'admin' && (
                    <button >
                        <Link className='px-3 py-1.5 bg-orange-500 text-white text-sm font-semibold' to={`/dashboard/stok/edit/${stok.IDproduk}`} >Edit </Link>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>



    </div>
  )
}
