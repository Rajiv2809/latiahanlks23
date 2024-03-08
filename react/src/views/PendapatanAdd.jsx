import React, { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/contexts'
import { useParams, Link } from 'react-router-dom'
import axiosClient from '../axios'

export default function PendapatanAdd() {
const {showToast, pendapatans , setPendapatans } = useStateContext()
const [IDtenant , setIDtenant] = useState()
const [tanggal, setTanggal] = useState()
const [totalPendapatan, setTotalPendapatan] =useState()
const {id} = useParams()
  useEffect(() => {
    if(id){
      axiosClient.get(`/v1/pendapatan/${id}`).then(({data}) => {
        setIDtenant(data.IDtenant)
        setTanggal(data.tanggal)
        setTotalPendapatan(data.totalPendapatan)
      }).catch((err) => {
        console.log(err)
      })

    }
  }, [id])


  const onSubmit = (e) => {
    if(id){
      e.preventDefault()
      axiosClient.post(`/v1/pendapatan/${id}`,{
        IDtenant,
        tanggal,
        totalPendapatan
      }).then(({data}) => {
        setPendapatans(data)
        showToast(data.message)
      }).catch((err) => {
        showToast(err.response.data.message, 'red')
      })
    }else{
      e.preventDefault()
      axiosClient.post('/v1/pendapatan',{
        IDtenant,
        tanggal,
        totalPendapatan
      }).then(({data}) => {
        setPendapatans(data)
        showToast(data.message)
      }).catch((err) => {
        showToast(err.response.data.message, 'red')
      })
    }
  }


  return (
    <div>
         <form method='POST' onSubmit={onSubmit} className='grid gap-5 grid-cols-1'>
            <div className="div flex  flex-col">
                <label htmlFor="nama">ID Tenant</label>
                <input className='border-2 p-2  border-sky-400' type="number" value={IDtenant} onInput={e => setIDtenant(e.target.value)}  />
            </div>
            <div className="div flex flex-col">
                <label htmlFor="nama">Tanggal</label>
                <input className='border-2  p-2 border-sky-400' type="date" value={tanggal} onInput={e => setTanggal(e.target.value)} />
            </div>
            <div className="div flex flex-col">
                <label htmlFor="nama">Total Pendapatan</label>
                <input className='border-2 p-2  border-sky-400' type="number" value={totalPendapatan} onInput={e => setTotalPendapatan(e.target.value)} />
            </div>
        
            <div className="div flex gap-2">
                <button className='bg-green-400 px-4 py-2' type='submit'>
                    submit
                </button>
                <Link className='bg-rose-400 px-4 py-2' to='/dashboard/pendapatan'> Back</Link>

            </div>



        </form>
    </div>
  )
}
