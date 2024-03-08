import React, { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/contexts'
import { useParams, Link } from 'react-router-dom'
import axiosClient from '../axios'

export default function PenjualanAdd() {
const {setPenjualans, showToast} = useStateContext() 
const {id} = useParams()
const [IDproduk, setIDproduk] = useState();
const [tanggal, setTanggal] = useState();
const [hargajual, setHargajual] = useState();
const [dibayar, setDibayar] = useState()
const [qty, setQty] = useState();

useEffect(() => {
    if(id) {
        axiosClient.get(`/v1/penjualan/${id}`).then(({data}) =>{
            setIDproduk(data.IDproduk)
            setTanggal(data.tanggal)
            setQty(data.qty)
            setDibayar(data.dibayar)
            setHargajual(data.hargajual)
        }).catch((err) => {
            console.log(err)
        })
    }
})

const onSubmit = (e) => {
    if(id){
        e.preventDefault()
        axiosClient.post(`/v1/penjualan/${id}`, {
            IDproduk,
            tanggal,
            dibayar,
            qty,
            hargajual
        }).then(({data}) => {
            setPenjualans(data)
            showToast(data.message)
        }).catch((err) => {
           showToast(err.response.data.message, 'red')

        })
    }else{
        e.preventDefault()
        axiosClient.post('/v1/penjualan', {
            IDproduk,
            tanggal,
            dibayar,
            qty,
            hargajual
        }).then(({data}) => {
            setPenjualans(data)
            showToast(data.message)
        }).catch((err) => {
            showToast(err.response.data.message, "red")
        })
    }
}


  return (
    <div>
          <form method='POST' onSubmit={onSubmit} className='grid gap-5 grid-cols-2'>
            <div className="div flex col-span-2 flex-col">
                <label htmlFor="nama">ID produk</label>
                <input className='border-2 p-2  border-sky-400' type="number" value={IDproduk} onInput={e => setIDproduk(e.target.value)}  />
            </div>
            <div className="div flex flex-col">
                <label htmlFor="nama">Tanggal</label>
                <input className='border-2  p-2 border-sky-400' type="date" value={tanggal} onInput={e => setTanggal(e.target.value)} />
            </div>
            <div className="div flex flex-col">
                <label htmlFor="nama">qty</label>
                <input className='border-2 p-2  border-sky-400' type="number" value={qty} onInput={e => setQty(e.target.value)} />
            </div>
            <div className="div flex flex-col">
                <label htmlFor="nama">Harga Jual</label>
                <input className='border-2  p-2 border-sky-400' type="number" value={hargajual} onInput={e => setHargajual(e.target.value)} />
            </div>
            <div className="div flex flex-col">
                <label htmlFor="nama">dibayar</label>
                <input className='border-2  p-2 border-sky-400' type="number" value={dibayar} onInput={e => setDibayar(e.target.value)}  />
            </div>
            <div className="div flex gap-2">
                <button className='bg-green-400 px-4 py-2' type='submit'>
                    submit
                </button>
                <Link className='bg-rose-400 px-4 py-2' to='/dashboard/penjualan'> Back</Link>

            </div>



        </form>
    </div>
  )
}
