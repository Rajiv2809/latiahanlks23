import React , { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/contexts'
import Toast from './toast';
import axiosClient from '../axios';



export default function DefaultLayout() {
const {userToken,  currentUser, setCurrentUser, setToken} = useStateContext();

useEffect(()=>{
  axiosClient.get('/v1/me').then(({data}) => {
      setCurrentUser(data)
  }).catch((err)=> {
      console.log(err)
  })
}, [])

const Logout = () => [
  axiosClient.get('v1/auth/logout').then(({data})=> {
      setToken(null)
  }).catch((err)=> {
      console.log(err)
  })
]


if(!userToken){
    return <Navigate to='/login' />
}

  return (
    <div>
      <nav className='flex text-white lg:justify-around justify-between py-2 px-2 bg-gradient-to-r from-cyan-500 to-blue-500 '>
        <div className="left flex gap-5 ">
          <p className='self-center lg:text-2xl'>KANTIN KU</p>
          <button className=''>
          <Link to="/home" className='' >Home</Link>
          </button>
          <button>
          <Link to="/dashboard" >Kelola</Link>
          </button>
        </div>
        <div className="right">
          <button onClick={Logout} className='bg-rose-700 px-4 py-2'>
          Logout
          </button>
        </div>
      </nav>


      <Outlet/>

      <Toast/>
    </div>


  )
}
