import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../axios";

export default function PenjulanDetail() {
const {id} = useParams();
const [penjualan, setPenjualan] = useState({});

useEffect(() => {
    axiosClient.get(`/v1/penjualan/${id}`)
    .then(({data}) => {
        setPenjualan(data);
    }).catch((err) => {
        console.log(err);
    });
}, [id])

const struk = () =>{
  axiosClient
  .get(`/v1/struk/${id}`, { responseType: "blob" })
  .then((response) => {
    
    const blob = new Blob([response.data], { type: "application/pdf" });

    
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "struk.pdf";

    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  })
  .catch((error) => {
    console.error("Error fetching PDF:", error);
  });
};

  return (
    <div>
      <div className="text flex flex-col">
        <h1 className="text-2xl my-2 ">Nama: {penjualan.nama}</h1>
        <h1>ID Trans: {penjualan.IDTrans}</h1>
        <h1>ID Produk: {penjualan.IDproduk}</h1>
        <h1>Tanggal: {penjualan.tanggal}</h1>
        <h1>Qty: {penjualan.qty}</h1>
        <h1>Hargajual: {penjualan.hargajual}</h1>
        <h1>Total: {penjualan.total}</h1>
        <h1>Dibayar: {penjualan.dibayar}</h1>
        <h1>Kembali: {penjualan.kembali}</h1>
    </div>
     <div className="button  my-4">
        <Link className="bg-rose-400 mx-2 px-4 py-2" to="/dashboard/penjualan">
            Back
        </Link>
        <button  className="bg-indigo-400  px-4 py-2" onClick={struk}>
          Struk
        </button>
      </div>
    </div>
  );
}
