import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/contexts";
import axiosClient from "../axios";

export default function TenantAdd() {
  const { id } = useParams();
  const { tenants, setTenants, showToast, currentUser } = useStateContext();

  const [namatenant, setnamatenant] = useState();
  const [detail, setDetail] = useState();


    useEffect(() => {
        if(id){
            axiosClient.get(`/v1/tenant/${id}`).then(({data}) => {
                setnamatenant(data.namatenant)
                setDetail(data.detail)
            }).catch((err) => {
                console.log(err)
            })
        }
    })

const onSubmit = (e) =>{
    if(id){
        e.preventDefault()
        axiosClient.post(`/v1/penjualan/${id}`,{
            namatenant,
            detail
        }).then(({data}) => {
            setTenants(data)
            showToast(data.message)
        }).catch((err) => {
            showToast(err.response.data.message, 'red')
        })
    }else{
        e.preventDefault()
        axiosClient.post('v1/tenant/',{
            namatenant,
            detail
        }).then(({data}) => {
            setTenants(data)
        }).catch((err) =>{
            showToast(err.response.data.message)
        })
    }
}



  return (
    <div>
      <form
        method="POST"
        onSubmit={onSubmit}
        className="grid gap-5 grid-cols-1"
      >
        <div className="div flex  flex-col">
          <label htmlFor="nama">Nama Tenant </label>
          <input
            className="border-2 p-2  border-sky-400"
            type="text"
            value={namatenant}
            onInput={(e) => setnamatenant(e.target.value)}
          />
        </div>
        <div className="div flex flex-col">
          <label htmlFor="nama">Detail</label>
          <input
            className="border-2  p-2 border-sky-400"
            type="text"
            value={detail}
            onInput={(e) => setDetail(e.target.value)}
          />
        </div>
       

        <div className="div flex gap-2">
          <button className="bg-green-400 px-4 py-2" type="submit">
            submit
          </button>
          <Link className="bg-rose-400 px-4 py-2" to="/dashboard/tenant">
           
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
