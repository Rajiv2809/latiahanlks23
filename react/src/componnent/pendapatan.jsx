import React, { useEffect } from 'react';
import axiosClient from '../axios';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/contexts';

export default function Pendapatan() {
  const { showToast, pendapatans, currentUser, setPendapatans } = useStateContext();

  useEffect(() => {
    axiosClient.get('/v1/pendapatan')
      .then(({ data }) => {
        setPendapatans(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onDelete = (id) => {
    axiosClient.delete(`/v1/pendapatan/${id}`).then(({data}) => {
      const newPendapatan = pendapatans.filter((pendapatan) => pendapatan.IDpendapatan!== id);
      setPendapatans(newPendapatan);
      showToast(data.message)
    }).catch((err) => {
      showToast(err.response.data.message, 'red')
    })
  }


  if (!pendapatans || !Array.isArray(pendapatans)) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col">
        <Link to='/dashboard/pendapatan/add' className="w-fit bg-green-600 px-3 py-2 m-2 text-white font-bold">Add pendapatan +</Link>
        <div className="stok w-full">
          <table>
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  ID pendapatan
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  ID Tenant
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Total Pendapatan
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Setoran Tenant
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Tanggal
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {pendapatans.map((pendapatan) => (
                <tr key={pendapatan.IDpendapatan}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {pendapatan.IDpendapatan}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    {pendapatan.IDtenant}
                  </td>
                  <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {pendapatan.totalPendapatan}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {pendapatan.setoranTenant}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {pendapatan.tanggal}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex gap-4">
                    <Link className='px-3 py-1.5 bg-sky-600 text-white text-sm font-semibold' to={`/dashboard/pendapatan/detail/${pendapatan.IDpendapatan}`}>Detail </Link>
                    {currentUser.role === 'admin' && (
                      <button className='px-3 py-1.5 bg-red-600 text-white text-sm font-semibold' onClick={() => onDelete(pendapatan.IDpendapatan)}>Remove</button>
                    )}
                    {currentUser.role === 'admin' && (
                      <button>
                        <Link className='px-3 py-1.5 bg-orange-500 text-white text-sm font-semibold' to={`/dashboard/pendapatan/edit/${pendapatan.IDpendapatan}`}>Edit </Link>
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
  );
}
