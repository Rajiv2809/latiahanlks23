import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosClient from '../axios'
import { useStateContext } from '../contexts/contexts'

export default function StokAdd() {
const {id} = useParams();
const [stok, setStok] = useState();
const [nama, setNama] = useState();
const [hargabeli, setHargabeli] = useState();
const [hargajual, setHargajual] = useState();
const [kategori, setKategori] = useState();
const {stoks, setStoks, showToast} = useStateContext();
    if(id){
        useEffect(() => {

            axiosClient.get(`/v1/stok/${id}`).then(({data})=>{
                setNama(data.nama)
                setHargabeli(data.hargabeli)
                setHargajual(data.hargajual)
                setKategori(data.kategori)
                setStok(data.stok)
            }).catch((err) => {
                console.log(err)
            })
        },[id])
    }

   const onSubmit = (e) => {
    if(id){
        e.preventDefault();
        axiosClient.post(`v1/stok/${id}`,{
            nama,
            stok,
            hargajual,
            hargabeli,
            kategori
        }).then(({data}) => {
            setStoks(data)
            showToast(data.message)
        }).catch((err) =>{
            showToast(err.response.data.message, 'red')
        })
    }else{
        e.preventDefault();
        axiosClient.post('/v1/stok',{
            nama,
            stok,
            hargajual, 
            hargabeli,
            kategori
        }).then(({data})=> {
            setStoks(data)
            showToast(data.message);
        }).catch((err) => {
            showToast(err.response.data.message, 'red')
        })
    }
   }


  return (
    <div>
        <form method='POST' onSubmit={onSubmit} className='grid gap-5 grid-cols-2'>
            <div className="div flex col-span-2 flex-col">
                <label htmlFor="nama">Nama</label>
                <input className='border-2 p-2  border-sky-400' type="text" value={nama} onInput={e => setNama(e.target.value)}  />
            </div>
            <div className="div flex flex-col">
                <label htmlFor="nama">Stok</label>
                <input className='border-2  p-2 border-sky-400' type="number" value={stok} onInput={e => setStok(e.target.value)} />
            </div>
            <div className="div flex flex-col">
                <label htmlFor="nama">Harga Beli</label>
                <input className='border-2 p-2  border-sky-400' type="number" value={hargabeli} onInput={e => setHargabeli(e.target.value)} />
            </div>
            <div className="div flex flex-col">
                <label htmlFor="nama">Harga Jual</label>
                <input className='border-2  p-2 border-sky-400' type="number" value={hargajual} onInput={e => setHargajual(e.target.value)} />
            </div>
            <div className="div flex flex-col">
                <label htmlFor="nama">Kategori</label>
                <input className='border-2  p-2 border-sky-400' type="text" value={kategori} onInput={e => setKategori(e.target.value)}  />
            </div>
            <div className="div flex gap-2">
                <button className='bg-green-400 px-4 py-2' type='submit'>
                    submit
                </button>
                <Link className='bg-rose-400 px-4 py-2' to='/dashboard/stok'> Back</Link>

            </div>



        </form>


    </div>
  )
}
