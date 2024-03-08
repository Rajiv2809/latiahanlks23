import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../axios";

export default function PendapatanDetail() {
  const { id } = useParams();
  const [pendapatan, setPendapatan] = useState();

  useEffect(() => {
    axiosClient
      .get(`/v1/pendapatan/${id}`)
      .then(({ data }) => {
        setPendapatan(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const kwitansi = () => {
    axiosClient
      .get(`/v1/kwitansi/${id}`, { responseType: "blob" })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "kwitansi.pdf";
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
      {pendapatan ? (
        <div>
          <div className="text flex flex-col">
            <h1 className="text-2xl my-2">
              ID Pendapatan: {pendapatan.IDpendapatan}
            </h1>
            <h1>tanggal: {pendapatan.tanggal}</h1>
            <h1>ID tenant: {pendapatan.IDtenant}</h1>
            <h1>Total Pendapatan: {pendapatan.totalPendapatan}</h1>
            <h1>setoranTenant: {pendapatan.setoranTenant}</h1>
          </div>
          <div className="button my-4">
            <Link className="bg-rose-400  mr-2 px-4 py-2" to="/dashboard/stok">
              Back
            </Link>
            <button className="bg-indigo-400  px-4 py-2" onClick={kwitansi}>
              Struk
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
