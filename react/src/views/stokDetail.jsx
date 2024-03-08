import React, { useEffect, useState } from 'react';
import axiosClient from '../axios';
import { useParams, Link } from 'react-router-dom';

export default function StokDetail() {
  const { id } = useParams();
  const [stok, setStok] = useState({});

  useEffect(() => {
    axiosClient.get(`/v1/stok/${id}`)
      .then(({ data }) => {
        setStok(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div>
      <div className="text flex flex-col">

        <h1 className='text-2xl my-2 '>Nama: {stok.nama}</h1>
        <h1>Stok: {stok.stok}</h1>
        <h1>Hargabeli: {stok.hargabeli}</h1>
        <h1>Hargajual: {stok.hargajual}</h1>
        <h1>kategori: {stok.kategori}</h1>
      </div>
    <div className="button my-4">

        <Link className='bg-rose-400 px-4 py-2' to='/dashboard/stok'> Back </Link>
    </div>
    </div>
    
  );
}
