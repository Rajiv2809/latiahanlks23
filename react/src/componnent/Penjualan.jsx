import React, { useEffect } from 'react'
import { useStateContext } from '../contexts/contexts'
import { Link } from 'react-router-dom'
import axiosClient from '../axios'
import toast from './toast'
export default function Penjualan() {
    const {penjualans , showToast , setPenjualans, currentUser} = useStateContext()

    useEffect(() => {
        axiosClient.get('/v1/penjualan').then(({data}) =>{
            setPenjualans(data)
        }).catch((err)=>{
            console.log(err)
        })
    }, [])

const onDelete = (id) => {
  axiosClient.delete(`/v1/penjualan/${id}`).then(({data}) => {
    const newPenjualan = penjualans.filter((stok) => stok.IDTrans !== id);
    setPenjualans(newPenjualan);
    showToast(data.message)
  }).catch((err) => {
    showToast(err.response.data.message)
  })
}


if (!penjualans || !Array.isArray(penjualans)) {
  return <div>Loading...</div>;
}




  return (
    <div>
          <div className="flex flex-col">
        <Link to='/dashboard/penjualan/add' className=" w-fit bg-green-600 px-3 py-2 m-2 text-white font-bold"  > Add Penjualan +</Link>
      <div className="stok w-full">
        <table>
          <thead>
            <tr>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                IDTrans
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                ID Produk
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Tanggal
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                qty
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Harga Jual
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                total
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
               dibayar
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                kembali
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {penjualans.map((penjualan) => (
              <tr key={penjualan.IDTrans}>
                
                <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                  {penjualan.IDTrans}
                </th>
                <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                  {penjualan.IDproduk}
                </th>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                  {penjualan.tanggal}
                </td>
                <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {penjualan.qty}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {penjualan.hargajual}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {penjualan.total}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {penjualan.dibayar}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {penjualan.kembali}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex gap-4">
                    <Link  className='px-3 py-1.5 bg-sky-600 text-white text-sm font-semibold' to={`/dashboard/penjualan/detail/${penjualan.IDTrans}`} >Detail </Link>
                    {currentUser.role === 'admin' && (
                  <button className='px-3 py-1.5 bg-red-600 text-white text-sm font-semibold' onClick={() => onDelete(penjualan.IDTrans)}>Remove</button>
                )}
                    {currentUser.role == 'admin' && (
                    <button >
                        <Link className='px-3 py-1.5 bg-orange-500 text-white text-sm font-semibold' to={`/dashboard/penjualan/edit/${penjualan.IDTrans}`} >Edit </Link>
                    </button>
                  ) }
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
